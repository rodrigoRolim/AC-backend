<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-if="!aprobation()"
      v-for="(score, index) in this.$store.getters.getBoard"
      v-bind:key="index"
      :rotate="360"
      :size="130"
      :width="15"
      :value="score.percent"
      :color="getColor(index)"
    >
      {{ score.raw }} <small>pontos</small> <strong>{{score.group}}</strong>
    </v-progress-circular>
 
    <v-progress-circular
      v-if="aprobation()"
      :rotate="360"
      :size="130"
      :width="15"
      :value="total*100/70"
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
      scoreboard: [],
      total: 0,
      value: 0,
      groups: null,
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
      .catch((err) => console.log(err))
   /*
      .then((aproved) => this.aproved = aproved) */
  },
  methods: {
    getColor (count) {
      return this.colors[count%3]
    },
    setScoreboard () {

      const scores = this.groups.map((group) => {
        const scores_valides = this.documents.filter(doc => {
            return (doc.evaluation !== 'reproved') && doc.group == group.name
          })

        const score = scores_valides.reduce((acc, doc_ap) => {
            return acc + doc_ap.score
          }, 0)
  
        return { group: group.name, percent: score*100/group.scoreMin, raw: score, min: group.scoreMin }
      })
 
      this.scoreboard = scores
      console.log(scores)
      this.$store.dispatch('set', scores)
    },
    aprobation () {
      this.scoreboard = this.$store.getters.getBoard
      const total = this.scoreboard.reduce((acc, groupScore) => {
        return acc + groupScore.raw
      }, 0)
      console.log(total)
      console.log(this.scoreboard)
      const aproveds_groups = this.scoreboard.filter((item) => item.raw >= item.min)
      console.log(aproveds_groups.length)
      if (total >= 70 && aproveds_groups.length == this.groups.length) {
        this.total = total
        return true
      }
      return false
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