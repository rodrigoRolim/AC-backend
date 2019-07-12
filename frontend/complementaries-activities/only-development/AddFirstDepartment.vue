<template>
  <v-app>
    <v-layout justify-center class="container">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="department.name"
            v-model="professor.name"
            :rules="[() => !!professor.name || 'This field is required']"
            :error-messages="errorMessages"
            label="Nome completo"
            placeholder="John Doe"
            required
          ></v-text-field>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions class="justify-end">
        
          <v-spacer></v-spacer>
          <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
          <v-btn color="primary" dark depressed @click="save">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
import ProfessorService from '../src/services/Professor.js'
export default {
  name: 'AddFirstProfessor',
  data () {
    return {
      show: false,
      errorMessages: '',
      department: {
        name: ''
      }
    }
  },
  created () {

  },
  computed: {
    form () {
      return this.professor
    }
  },
  methods: {
    save () {
      ProfessorService.save(this.professor)
        .then((res) => {
          console.log(res)
        })
    },
    reset () {

      this.professor.siape = null
      this.professor.name = null
      this.professor.email = null
      this.professor.password = ''
      this.errorMessages = ''
    }
  }
}
</script>

<style scoped>
.container {
  padding: calc(18vh/2) 0;
}
</style>
