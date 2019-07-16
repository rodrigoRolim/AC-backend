<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-if="!(approved && situation !== 'debting')"
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
      v-if="approved || situation == 'approved'"
      :rotate="360"
      :size="130"
      :width="15"
      :value="total*100/70"
      color="#00C853"
    >
      <v-icon large color="#FDD835" class="fa4">fa-trophy</v-icon>
      <span v-if="!situation !== 'debting'" class="text-approved">aprovado!</span>
    </v-progress-circular>
    <v-flex v-if="approved">
      <small v-if="situation !== 'approved'">Ainda não foi completamente avaliado pelo(a) professor(a)</small>
    </v-flex>
  </v-card>
</template>

<script>
import GroupService from '@/services/Group'

export default {
  name: 'StudentProgress',
  props: ['documents', 'situation'],
  data () {
    return {
      interval: {},
      scoreboard: [],
      approved: false,
      total: 0,
      value: 0,
      groups: null,
      pointed_color: 0,
      colors: ['teal', 'primary', 'red']
    }
  },
  created () {

    const student = JSON.parse(localStorage.getItem('user'))
    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return
      })
      .then(() => this.setScoreboard())
      .catch((err) => console.log(err))
      //.then(() => this.Pusher())
      //.then((aproved) => this.aproved = aproved) 
  },
  updated() {
    this.aprobation(this.$store.getters.getBoard)
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
      this.$store.dispatch('set', scores)
      //return scores
    },
    aprobation (scoreboard) {
      this.scoreboard = scoreboard
      const total = this.scoreboard.reduce((acc, groupScore) => {
        return acc + groupScore.raw
      }, 0)

      const aproveds_groups = this.scoreboard.filter((item) => item.raw >= item.min)

      if (total >= 70 && aproveds_groups.length == this.groups.length) {
        this.total = total
        this.approved = true
      } else {
        this.total = total
        this.approved = false
      }
     
    },
   /*  Pusher (documents) {
      
      Pusher.logToConsole = true;

      let pusher = new Pusher('9dc5a8662a93a62e45bb', {
        cluster: 'us2',
        forceTLS: true
      });
      const changeDocument = this.changeDocument
      let channel = pusher.subscribe(JSON.parse(localStorage.getItem('user'))._id);
      var setScoreBoard = this.setScoreboard
      console.log(setScoreBoard)
      channel.bind('my-event', function(data) {
        setScoreBoard()
      });
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
.text-approved {
  color: #004D40
}
</style>