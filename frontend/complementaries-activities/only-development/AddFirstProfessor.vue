<template>
  <v-app>
    <v-layout justify-center class="container">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="professor.name"
            v-model="professor.name"
            :rules="[() => !!professor.name || 'This field is required']"
            :error-messages="errorMessages"
            label="Nome completo"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="professor.email"
            v-model="professor.email"
            :rules="[rules.required, rules.email]"
            label="Email*"
            placeholder="nome@email.com"
            required
          ></v-text-field>
          <v-text-field
            ref="professor.siape"
            v-model="professor.siape"
            :rules="[() => !!professor.siape || 'This field is required']"
            label="Registro acadêmico (SIAPE)*"
            placeholder="a122345"
            required
          ></v-text-field>    
           <v-text-field
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Crie uma senha"
            hint="deve ter pelo menos 8 caracteres"
            v-model="professor.password"
            class="input-group--focused"
            @click:append="show = !show"
          ></v-text-field>
        </v-card-text>
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
      professor: {
        siape: null,
        name: null,
        email: null,
        password: ''
      },
      rules: {
        required: value => !!value || 'Required',
        email: value => {
          const pattern = /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
          return pattern.test(value) || 'Invalid e-mail.'
        },
        min: v => v.length >= 8 || 'Min 8 characters'
      },
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
