<template>
  <div>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="blue-grey" small dark v-on="on">Professor</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-select
                  :items="professorNames"
                  label="Professor responsável*"
                  v-model="selectedName"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
  
  </div>
</template>

<script>
import AdminService from '@/services/Admin.js'
export default {
  name: 'AddProfessor',
  props: ['degree'],
  data () {
    return {
      dialog: false,
      professorNames: [],
      professors: [],
      selectedName: ''
    }
  }, // this.degree.graduation === professor._id || typeof professor.graduation === 'undefined'
  created () {
   this.initialize()
  },
  methods: {
    initialize () {
       AdminService.readAllProfessors()
      .then(professors => {
        this.professors = professors.data
        professors.data.map(item => {
          console.log(item)
          //if (this.degree.professor === item._id || typeof item.graduation === 'undefined') {
            this.professorNames.push(item.name)
          //}
        })
        this.initSetProfessor()
      })
    },
    initSetProfessor () {
      this.professors.map(professor => {
        if (professor._id === this.degree.professor){
         this.selectedName = professor.name
        } 
      }) 
    },
    save () {
      let professor = this.professors.filter((prof) => prof.name === this.selectedName)
      this.degree.professor = professor[0]._id
      AdminService.updatingDegree(this.degree._id, this.degree)
        .then((res) => {
          alert('salvo com sucesso')
          this.updatingProfessor(professor[0], this.degree._id, professor[0]._id)
          this.dialog = false
          this.initialize()
        })
      
    },
    updatingProfessor (professor, degId, profId) {
      professor.graduation = degId
      AdminService.updatingProfessorResponsible(profId, professor)
        .then((res) => {
          console.log(res)
        })
    }
  }
}
</script>

<style scoped>

</style>