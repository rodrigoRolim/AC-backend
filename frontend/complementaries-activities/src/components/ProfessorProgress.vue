<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
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
      scoreboard: [],
      aproved: false,
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
      .catch((err) => console.log(err))
   /*.then(() => this.aprobation())
      .then((aproved) => this.aproved = aproved) */
  },
  methods: {
    getColor (count) {
      return this.colors[count%3]
    },
    setScoreboard () {

      const scores = this.groups.map((group) => {
        const doc_aproveds = this.documents.filter(doc => {
            return doc.evaluation == 'aproved' && doc.group == group.name
          })
        const score = doc_aproveds.reduce((acc, doc_ap) => {
            return acc + doc_app.score
          }, 0)
        return { group: group.name, percent: score*group.scoreMin, raw: score, min: group.scoreMin }
      })
 
      this.scoreboard = scores
      this.$store.dispatch('set', scores)
    }
   /*  aprobation () {

      const aproveds = this.scoreboard.filter((score) => score.aproved && score.evaluation == 'aproved')
      console.log(aproveds)
      return aproveds.length == this.groups.length && this.scoreboard.aproved
    } */
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