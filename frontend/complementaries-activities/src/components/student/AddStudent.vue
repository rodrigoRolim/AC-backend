<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin">admin</v-btn>
        <v-btn flat to="/professor">professor</v-btn>
        <v-btn flat to="/aluno">aluno</v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <v-layout justify-center class="container">
    <v-flex xs12 sm10 md8 lg6>
      <v-card ref="form">
        <v-card-text>
          <v-text-field
            ref="name"
            v-model="student.name"
            :rules="[() => !!student.name || 'This field is required']"
            :error-messages="errorMessages"
            label="Nome completo"
            placeholder="John Doe"
            required
          ></v-text-field>
          <v-text-field
            ref="email"
            v-model="student.email"
            :rules="[rules.required, rules.email]"
            label="Email*"
            placeholder="nome@email.com"
            required
          ></v-text-field>
          <v-text-field
            ref="Registro acadêmico (RA)*"
            v-model="student.ra"
            :rules="[() => !!student.ra || 'This field is required']"
            label="Registro acadêmico (RA)*"
            placeholder="a122345"
            required
          ></v-text-field>    
          <v-autocomplete
            ref="Graduações"
            v-model="student.graduation"
            :rules="[() => !!student.graduation || 'This field is required']"
            :items="graduations"
            label="Graduação"
            placeholder="Select..."
            required
          ></v-autocomplete>
           <v-text-field
            :append-icon="show ? 'visibility' : 'visibility_off'"
            :rules="[rules.required, rules.min]"
            :type="show ? 'text' : 'password'"
            name="input-10-2"
            label="Crie uma senha"
            hint="deve ter pelo menos 8 caracteres"
            v-model="student.password"
            class="input-group--focused"
            @click:append="show = !show"
          ></v-text-field>
        </v-card-text>
        <v-divider class="mt-5"></v-divider>
        <v-card-actions class="justify-end">
          <v-btn color="success" dark depressed to="/aluno">voltar</v-btn>
          <v-spacer></v-spacer>
          <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
          <v-btn color="primary" dark depressed @click="createStudent">Submit</v-btn>
        </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Student from '@/services/Student.js'
import AdminService from '@/services/Admin.js'

export default {
  name: 'AddStudent',
  components: { AcNavbar },
  data () {
    return {
      show: false,
      errorMessages: '',
      student: {
        ra: null,
        name: null,
        email: null,
        graduation: null,
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
      graduations: []
    }
  },
  created () {
    AdminService.readAllDegrees()
      .then((resp) => {
        resp.data.map(graduation => {
          this.graduations.push(graduation.name)
        })
      })
  },
  computed: {
    form () {
      return this.student
    }
  },
  methods: {
    createStudent () {
     
      Student.create(this.student).then(response => {
        if (response.status == 201) {
          alert("cadastrado com sucesso")
          this.reset()
        }
      })
      .catch((err) => {
        alert(`Error: ${err.message}`)
      })
    },
    reset () {
      this.student.ra = null
      this.student.name = null
      this.student.email = null
      this.student.password = ''
      this.student.graduation = ''
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
