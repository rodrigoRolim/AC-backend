<template>
  <v-card class="text-xs-center progress" v-if="groups">
  <!--<v-icon>fa-trophy</v-icon>-->
   <v-toolbar-title class="grey--text text--darken-2">Progresso</v-toolbar-title>
    <v-progress-circular
      v-for="(group, index) in groups"
      v-bind:key="group._id"
      :rotate="360"
      :size="120"
      :width="15"
      :value="getProgress(group)[0]"
      :color="getColor(index)"
    >
      {{ getProgress(group)[1] }} <small>pontos</small> <strong>{{group.name}}</strong>
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
      .then(() => this.aprobation())
  },
  methods: {
    getProgress (group) {
      let score = 0

      if (this.documents.length > 0) {
        for (let i = 0; i < this.documents.length; i++) {
          if (group.name == this.documents[i].group) {
            score += this.documents[i].score
          }
        }
      }
      return [score*100/group.scoreMax, score]
    },
    getColor (count) {
      return this.colors[count%3]
    },
    aprobation () {
      let totals = []
      for (let i = 0; i < this.groups.length; i++) {
        totals[i] = 0
        for (let j = 0; j < this.documents.length; j++) {
          if (this.documents[j].group == this.groups[i].name) {
            
            totals[i] += this.documents[j].score
            console.log(this.documents[j].score)
          }
        }
      }
      console.log(totals)
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
</style>