<template>
  <v-card class="text-xs-center progress" >
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-if="!approved"
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
      <span class="text-approved">aprovado!</span>
    </v-progress-circular>
  <v-flex v-if="approved">
    <v-btn color="#004D40" @click="approve" dark depressed>aprovar aluno</v-btn>
  </v-flex>
  </v-card>
</template>

<script>
import GroupService from '@/services/Group'
import StudentService from '@/services/Student'
export default {
  name: 'StudentProgress',
  props: ['documents'],
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

    GroupService.readAll()
      .then((res) => res.data)
      .then((groups) => {
        this.groups = groups
        return
      })
      .then(() => this.setScoreboard())
      .then(() => this.aprobation())
      .then((approved) => this.approved = approved)
      .catch((err) => console.log(err))
   /*
      .then((aproved) => this.aproved = aproved) */
  },
  methods: {
    approve () {
      const idStudent = this.$route.params.id
      const newSituation = 'approved'
      StudentService.setSituation(idStudent, newSituation)
        .then((res) => {
          console.log(res.status)
        })
        .catch((err) => console.log(err.message))
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
    aprobation () {
      this.scoreboard = this.$store.getters.getBoard
      const total = this.scoreboard.reduce((acc, groupScore) => {
        return acc + groupScore.raw
      }, 0)

      const aproveds_groups = this.scoreboard.filter((item) => item.raw >= item.min)
      console.log(aproveds_groups)
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
.text-approved {
  color: #004D40
}
</style>