<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin">admin</v-btn>
        <v-btn flat to="/professor">professor</v-btn>
        <v-btn flat to="/aluno">aluno</v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <div class="container">
      <v-layout justify-center class="container">
      <v-flex xs12 sm10 md8 lg6>

        <v-card ref="form"> 
          <v-toolbar
            card
            color="accent"
            dark
            >
            <v-toolbar-title>Login de Estudante</v-toolbar-title>
          <v-spacer></v-spacer>
          </v-toolbar>
          <v-spacer></v-spacer>
          <v-card-text>
            <v-text-field
              ref="Registro acadêmico (RA)*"
              v-model="student.ra"
              :rules="[() => !!student.ra || 'This field is required']"
              label="Registro acadêmico (RA)*"
              placeholder="a122345"
              required
            ></v-text-field>    
            <v-text-field
              :append-icon="show ? 'visibility' : 'visibility_off'"
              :rules="[rules.required, rules.min]"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Senha"
              hint="deve ter pelo menos 8 caracteres"
              v-model="student.password"
              class="input-group--focused"
              @click:append="show = !show"
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="success" to="/aluno/registrar">Registrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
            <v-btn color="primary" dark depressed @click="loginStudent">Submit</v-btn>
          </v-card-actions>
      </v-card>
    </v-flex>
  </v-layout>
    </div>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Student from '@/services/Student.js'

export default {
  name: 'StudentLogin',
  components: { AcNavbar },
  data () {
    return {
      show: false,
      errorMessages: '',
      student: {
        ra: null,
        password: ''
      },
      rules: {
        required: value => !!value || 'Required',
        min: v => v.length >= 8 || 'Min 8 characters'
      },
    }
  },
  computed: {
    form () {
      return this.student
    }
  },
  methods: {
    loginStudent () {
     
      Student.login(this.student).then(response => {
        console.log(response)
        this.setUser(response.data.user)
        this.setToken(response.data.acess)
        if (response.status == 201) {
          this.$router.replace('/aluno/home')
        }
      })
      .catch((err) => {
        alert(`Error: ${err.message}`)
      })
    },
    setUser(user) {
      localStorage.setItem('user', JSON.stringify(user))
    },
    setToken(token) {
      localStorage.setItem('token', JSON.stringify(token))
    },
    reset () {
      this.student.ra = null
      this.student.password = ''
    }
  }
}
</script>


<style scoped>
.container {
  padding: calc(18vh/2) 0;
}
.title {
  margin: 0 auto;
  width: 40%;
}
</style>
