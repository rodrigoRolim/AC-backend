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
       <v-alert
        :value="showAlert"
        :type="alert"
        >
        {{ messageAlert }}
       </v-alert>
        <v-form ref="form">
          <v-card >
          
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
                :error-messages="errorMessages"
                :rules="[rules.required, rules.email]"
                label="Email*"
                placeholder="nome@email.com"
                required
              ></v-text-field>
              <v-text-field
                ref="Registro acadêmico (RA)*"
                v-model="student.ra"
                :error-messages="errorMessages"
                :rules="[() => !!student.ra || 'This field is required']"
                label="Registro acadêmico (RA)*"
                placeholder="a122345"
                required
              ></v-text-field>    
              <v-autocomplete
                ref="Graduações"
                v-model="student.graduation"
                :error-messages="errorMessages"
                :rules="[() => !!student.graduation || 'This field is required']"
                :items="graduationsNames"
                label="Graduação"
                placeholder="Select..."
                required
              ></v-autocomplete>
              <v-text-field
                :append-icon="show ? 'visibility' : 'visibility_off'"
                :rules="[rules.required]"
                :error-messages="errorMessages"
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
        </v-form>
      </v-flex>
    </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Student from '@/services/Student.js'
import GraduationService from '@/services/Graduation.js'

export default {
  name: 'AddStudent',
  components: { AcNavbar },
  data () {
    return {
      show: false,
      errorMessages: '',
      alert: null,
      showAlert: false,
      messageAlert: '',
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
        min: value => value.length >= 8 || 'Min 8 characters'
      },
      graduationsNames: [],
      graduations: []
    }
  },
  created () {
    GraduationService.readAll()
      .then((resp) => {
        this.graduations = resp.data
        resp.data.map(graduation => {
          this.graduationsNames.push(graduation.name)
        })
      })
      .catch((err) => {
        // implemente mensagens de erro para o usuário com o vuetify
      })
  },
  computed: {
    form () {
      return this.student
    }
  },
  methods: {
    createStudent () {
      this.student.department = this.catchIdDepartment()
      Student.create(this.student).then(response => {
        if (response.status == 201) {
          this.getConfirmation('success','cadastrados com sucesso!')
        }
      })
      .catch((err) => {
        this.getConfirmation('error', 'Não foi possível efetuar o cadastro')
      })
    },
    getConfirmation (type, message) {
      this.messageAlert = message
      this.alert = type
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
        this.alert = null
      }, 3000)
      this.reset()
    },
    catchIdDepartment () {
      console.log(this.graduations)
      const graduation = this.graduations.filter(grad => 
            grad.name == this.student.graduation)
      const id = graduation[0].deps[0]._id
      return id
    },
    reset () {
     this.$refs.form.reset()
    }
  }
}
</script>

<style scoped>
.container {
  padding: calc(18vh/2) 0;
}
</style>
