<template>
  <v-app>
   <mask-load v-if="showMask"></mask-load>
   <ac-navbar>
      <v-toolbar-items>
        <v-btn depressed color="secondary" dark to="/aluno/home">Documentos <v-icon dark right>fa-file</v-icon></v-btn>
        <v-menu
        transition="slide-y-transition"
        bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="purple"
              color="primary"
              depressed
              dark
              v-on="on"
            >
              menu <v-icon dark right>menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/aluno/perfil">
              <v-list-tile-title>perfil</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn depressed  dark color="blue-grey" to="/aluno/documento/add">
        upload <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error"  @click="logout()">sair<v-icon dark right>exit_to_app</v-icon></v-btn>
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
                :error-messages="errorMessages"
                :type="show ? 'text' : 'password'"
                name="input-10-2"
                label="Altere sua senha"
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
              <v-btn color="primary" dark depressed @click="updateStudent">Salvar</v-btn>
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
import GraduationService from '@/services/Graduation.js'
import StudentService from '@/services/Student'
import MaskLoad from '../MaskLoad'
export default {
  name: 'AddStudent',
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      show: false,
      showMask: false,
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
      idStudent: JSON.parse(localStorage.getItem('user'))._id,
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
    this.showMask = true
    GraduationService.readAll()
      .then((resp) => {
        this.graduations = resp.data
        resp.data.map(graduation => {
          this.graduationsNames.push(graduation.name)
        })
        return
      })
      .then(() => this.getStudent())
      .then(() => setTimeout(() => {this.showMask = false}, 500))
      .catch((err) => this.getConfirmation('error', 'Ocorreu um erro, receio que você não poderá efetuar uma atualização'))
  },
  computed: {
    form () {
      return this.student
    }
  },
  methods: {
    getStudent () {
      StudentService.getById(this.idStudent)
        .then((res) => res.data[0])
        .then((student) => this.student = student)
        .catch((err) => console.log(err))
    },
    updateStudent () {
      this.student.department = this.catchIdDepartment()
      StudentService.update(this.idStudent, this.student).then(response => {
        if (response.status == 200) {
          this.getConfirmation('success','atualizado com sucesso!')
        }
        return
      })
      .then(() => this.getStudent())
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

      const graduation = this.graduations.filter(grad => 
            grad.name == this.student.graduation)
      const id = graduation[0].deps[0]._id
      return id
    },
    reset () {
     this.$refs.form.reset()
    },
     logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    }
  }
}
</script>

<style scoped>
.container {
  padding: calc(18vh/2) 0;
}
</style>