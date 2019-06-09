<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-if="situation == 'debting' && newsituation == 'debting'"
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
      v-if="approved"
      :rotate="360"
      :size="130"
      :width="15"
      :value="total*100/70"
      color="#00C853"
    >
      <v-icon large color="#FDD835" class="fa4">fa-trophy</v-icon>
      <span v-if="situation !== 'debting' && approved" class="text-approved">aprovado!</span>
    </v-progress-circular>
  <v-flex v-if="situation == 'debting' && approved">
    <v-btn color="#004D40" @click="approve" dark depressed>aprovar aluno</v-btn>
  </v-flex>
  </v-card>
</template>

<script>
import GroupService from '@/services/Group'
import StudentService from '@/services/Student'
export default {
  name: 'StudentProgress',
  props: ['documents', 'situation'],
  data () {
    return {
      interval: {},
      scoreboard: [],
      hiddenProgress: false,
      approved: false,
      newsituation: 'debting',
      total: 0,
      value: 0,
      groups: null,
      pointed_color: 0,
      colors: ['teal', 'primary', 'red']
    }
  },
  created () {
    this.newsituation = this.situation
    this.initialize()
  },
  updated() {

    this.aprobation(this.$store.getters.getBoard)
  },  
  methods: {
    // criar um store para aprovação de aluno
    initialize () {
      GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return
      })
      .then(() => this.setScoreboard())
      .then(() => this.aprobation(this.$store.getters.getBoard))
      .catch((err) => console.log(err))
    },
    approve () {
      const idStudent = this.$route.params.id
      const newSituation = 'approved'
      
      if (this.situation == 'debting') {
        StudentService.setSituation(idStudent, newSituation)
        .then((res) => console.log(res.status))
        .then(() => this.newsituation = 'approved')
        .then(() => this.approved = true)
        .catch((err) => this.getAlert('erro', 'ocorreu um erro, tente mais uma vez'))
      } else {
        this.getAlert('info', 'aluno já está aprovado')
      }
      
    },
    getAlert (type, message) {
      this.$emit('alert', { type: type, message: message})
    },
    getColor (count) {
      return this.colors[count%3]
    },
    setScoreboard () {

      const scores = this.groups.map((group) => {
        const doc_aproveds = this.documents.filter(doc => {
            return doc.evaluation == 'aproved' && doc.group == group.name
          })
        const score = doc_aproveds.reduce((acc, doc_ap) => {
            return acc + doc_ap.score
          }, 0)
        
        return { group: group.name, percent: score*100/group.scoreMin, raw: score, min: group.scoreMin }
      })
 
      this.scoreboard = scores
      this.$store.dispatch('set', scores)
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
.text-approved {
  color: #004D40
}
</style>