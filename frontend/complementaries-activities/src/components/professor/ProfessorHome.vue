<template>
  <v-app>
    <mask-load v-if="showMask"></mask-load>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn color="secondary" 
        dark 
        depressed 
        to="/professor/home">
          alunos<v-icon right>fa-graduation-cap</v-icon>
        </v-btn>
       <v-menu
        transition="slide-y-transition"
        bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="purple"
              color="blue-grey"
              depressed
              dark
              v-on="on"
            >
              menu <v-icon dark right>menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/admin/cursos">
              <v-list-tile-title>cursos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/departamentos">
              <v-list-tile-title>departamentos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/professores">
              <v-list-tile-title>professores</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/grupos">
              <v-list-tile-title>grupos</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn color="error" depressed  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <v-layout class="table">
     <v-alert
     class="alert"
      :value="showAlert"
      :type="alertType"
      >
        {{ message }}
      </v-alert>
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de documentos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-btn 
          color="secondary" 
          depressed 
          :disabled="selected.length == 0"
          :loading="loadBtn"
          @click="launchAll"
          class="mb-1">lançar <v-icon right >fa-rocket</v-icon></v-btn>
      </v-toolbar>
       <v-card>
        <v-card-title>
          Alunos
           <v-spacer></v-spacer>
            <v-checkbox
              class="ma-0 pa-0"
              v-model="search"
              label="aprovados"
              color="indigo"
              value="approved"
            ></v-checkbox>
            <v-checkbox
              class="ma-0 pa-0"
              v-model="search"
              label="lançados"
              color="indigo"
              value="launched"
            ></v-checkbox>
            <v-checkbox
              class="ma-0 pa-0"
              v-model="search"
              label="devendo"
              color="indigo"
              value="debting"
            ></v-checkbox>
          <v-spacer></v-spacer>
          <v-text-field
            v-model="search"
            append-icon="search"
            label="Search"
            single-line
            hide-details
          ></v-text-field>
        </v-card-title>

        <v-data-table
          v-model="selected"
          :headers="headers"
          :items="students"
          :search="search"
          item-key="ra"
        >
          <template v-slot:items="props">
           <td>
            <v-checkbox
              :disabled="props.item.situation == 'debting' || props.item.situation == 'launched'"
              v-model="props.selected"
              primary
              hide-details
            ></v-checkbox>
           </td>
            <td>{{ props.item.name }}</td>
            <td class="text-md-left">{{ props.item.ra }}</td>
            <td class="text-md-left">{{ props.item.graduation }}</td>
            <td class="text-md-left">{{ props.item.email }}</td>
            <td class="text-md-left">
            <v-icon large v-bind:class="props.item.situation">
              {{ getIcon(props.item.situation) }}
            </v-icon>
            </td>
            <td class="text-md-left"> 
            <v-btn
              color="#00796B"
              class="mr-2"
              small
              :to="`/professor/aluno/documentos/${props.item._id}`"
            >
              <v-icon color="white">folder_open</v-icon>
            </v-btn>
          </td>
          </template>
          <template v-slot:no-results>
            <v-alert :value="true" color="error" icon="warning">
              Your search for "{{ search }}" found no results.
            </v-alert>
          </template>
          <template v-slot:no-data>
            <v-alert :value="true" color="#78909C" icon="warning">
              nenhum aluno enviou documento até o momento
            </v-alert>
          </template>
         
        </v-data-table>
       </v-card>
    </v-layout>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import StudentService from '@/services/Student'

export default {
  name: 'ProfessorHome',
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      showMask: false,
      alertType: 'success',
      showAlert: false,
      loadBtn: false,
      message: '',
      search: '',
      selected: [],
      professor: JSON.parse(localStorage.getItem('user')),
      headers: [
        {text: 'Lançados', align: 'left', value: 'released'},
        {
          text: 'Aluno',
          align: 'left',
          value: 'name'
        },
        { text: 'Registro Acadêmico (RA)', value: 'ra' },
        { text: 'Curso', value: 'graduation' },
        { text: 'Email', value: 'email' },
        { text: 'Situação', value: 'situation' },
        { text: 'documentos', value: 'action'}
      ],
      students: []
    }
  },
  created () {
    // this.testPusher()
    this.showMask = true
    if (typeof this.professor.department !== 'undefined') {

       StudentService.readAll(this.professor.department)
        .then((res) => res.data)
        .then(students => this.students = students)
        .then(() => setTimeout(() => { this.showMask = false }, 200))
        .catch((err) => {
          if (!err.response.data.auth) {
            this.logout()
            this.showMask = false
          }
        })
    } else {
      this.showMask = false
    }
   
  },
  methods: {
 
    launchAll () {

      const approvedStudents = this.selected.filter((student) => student.situation == 'approved')
      const ras = approvedStudents.map((approvedStud) => approvedStud.ra)
      if (ras.length > 0) {
        StudentService.launchAll(ras)
        .then((res) => res.data)
        .then((status) => this.loadBtn = true)
        .then(() => this.turnAllLaunched(approvedStudents))
        .then(() => this.getAlert('success', 'lançados com sucesso!'))
        .then(() => this.selected = [])
        .catch((err) => this.getAlert('error', 'ocorreu um erro, tente mais uma vez'))
      } else {
        this.getAlert('info', 'não há novos alunos aprovados para lançar')
      }
    },
    turnAllLaunched (approveds) {
      const launcheds = approveds.map((app) => {
        app.situation = 'launched'
        return app
      })

    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/professor')
    },
    getIcon(situation) {
      switch(situation) {
        case 'debting':
          return 'fa-exclamation-triangle'
        case 'approved':
          return 'fa-check-square'
        case 'launched':
          return 'fa-rocket'
      }
    },
    getAlert (type, message) {
      this.alertType = type
      this.message = message
      this.showAlert = true
      this.loadBtn = false
      setTimeout(() => {
        this.showAlert = false
      }, 5000)
    }
  }
}
</script>

<style scoped>
.table {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 90%;
  margin: 0px auto;
  margin-bottom: 20px;
}
.table  .v-btn {
  min-width: 15%;
}
.debting {
  color: orange;
}
.approved {
  color: #66BB6A
}
.launched {
  color: blue
}
.alert {
  width: 100%;
}
</style>