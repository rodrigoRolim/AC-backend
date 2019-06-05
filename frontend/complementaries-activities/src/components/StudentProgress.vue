<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-if="scoreboard && !aproved"
      v-for="(group, index) in groups"
      v-bind:key="group._id"
      :rotate="360"
      :size="130"
      :width="15"
      :value="scoreboard[index].score*100/group.scoreMax"
      :color="getColor(index)"
    >
      {{ scoreboard[index].score }} <small>pontos</small> <strong>{{group.name}}</strong>
    </v-progress-circular>
    </v-progress-circular>
    <v-progress-circular
      v-if="aproved"
      :rotate="360"
      :size="130"
      :width="15"
      :value="scoreboard.total"
      color="#00C853"
    >
      <v-icon large color="#FDD835" class="fa4">fa-trophy</v-icon>
      <span>aprovado!</span>
    </v-progress-circular>
  </v-card>
</template>

<script>
import GroupService from '@/services/Group'
export default {
  name: 'StudentProgress',
  props: ['documents'],
  data () {
    return {
      interval: {},
      aproved: false,
      value: 0,
      groups: null,
      scoreboard: null,
      pointed_color: 0,
      colors: ['teal', 'primary', 'red']
    }
  },
  created () {

    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return
      })
      .then(() => this.setScoreboard())
      .then(() => this.aprobation())
      .then((aproved) => this.aproved = aproved)
  },
  methods: {
    getColor (count) {
      return this.colors[count%3]
    },
    setScoreboard () {
      
      let totals_groups = []
      let total = 0

      for (let i = 0; i < this.groups.length; i++) {
        totals_groups[i] = 0
        for (let j = 0; j < this.documents.length; j++) {
          if (this.documents[j].group == this.groups[i].name) {
            totals_groups[i] += this.documents[j].score
            total += this.documents[j].score
          }
        }
      }

     const scores = totals_groups.map((item,i) => {
        return { 
          group: this.groups[i].name, 
          score: item, 
          aproved: item >= this.groups[i].scoreMin,
          evaluation: this.documents[i].evaluation    
        }
      })
     const score_validates = scores.filter((item) => item.evaluation !== "reproved")
     console.log(score_validates)
     this.scoreboard = Object.assign([], score_validates, { total: total, aproved: total >= 70 })
 
    },
    aprobation () {

      const aproveds = this.scoreboard.filter((score) => score.aproved && score.evaluation !== 'reproved')
      console.log(aproveds)
      return aproveds.length == this.groups.length && this.scoreboard.aproved
    }
  }
}
</script>

<style scoped>
.v-progress-circular {
    margin: 1rem
}
.progress {
  margin: 5px auto;
  width: 90%;
}
strong {
  font-size: 1.15rem
}
#trophy {
  font-size: 20px;
}
</style>