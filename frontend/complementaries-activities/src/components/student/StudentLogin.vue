<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/professor">professor</v-btn>
        <v-btn flat to="/aluno">aluno</v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <div class="container">
    
      <v-layout justify-center class="container">
      <v-flex xs12 sm10 md8 lg6>
        <v-alert
        :value="validatedUser"
        type="error"
        >
        Usuário inválido.
        </v-alert>
        <v-card ref="form"> 
          <v-toolbar
            card
            color="secondary"
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
              :rules="[rules.required]"
              :type="show ? 'text' : 'password'"
              name="input-10-2"
              label="Senha"
              hint="deve ter pelo menos 8 caracteres"
              v-model="student.password"
              class="input-group--focused"
              @click:append="show = !show"
              required
            ></v-text-field>
          </v-card-text>
          <v-divider class="mt-5"></v-divider>
          <v-card-actions class="justify-end">
            <v-btn color="success" to="/aluno/registrar">Registrar</v-btn>
            <v-spacer></v-spacer>
            <v-btn color="secondary" dark depressed @click="reset">Resetar</v-btn>
            <v-btn color="primary" depressed @click="loginStudent" :disabled="validated">Submit</v-btn>
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
      validatedUser: false,
      errorMessages: '',
      student: {
        ra: '',
        password: ''
      },
      rules: {
        required: value => !!value || 'Required',
      },
    }
  },
  computed: {
    form () {
      return this.student
    },
    validated () {
      return this.student.ra === '' || this.student.password == ''
    }
  },
  methods: {
    loginStudent () {
     
      Student.login(this.student).then(response => {
        this.removeSession()
        if (response.status == 201) {
          console.log(response.data.user.user_type)
          this.createSession(response.data)
          this.$router.replace('/aluno/home')
        }
      })
      .catch((err) => {
        this.validatedUser = true
        setTimeout(() => {
          this.validatedUser = false
        }, 10000)
      })
    },
    createSession (response) {
      this.setUser(response.user)
      this.setToken(response.token)
    },
    removeSession () {
      localStorage.removeItem('user')
      localStorage.removeItem('token')
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
