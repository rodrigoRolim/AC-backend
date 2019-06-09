<template>
  <v-app>
    <mask-load v-if="showMask"></mask-load>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn color="secondary" dark depressed to="/professor/home">alunos<v-icon class="ml-2">fa-graduation-cap</v-icon></v-btn>
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
              recursos <v-icon dark class="ml-2">build</v-icon>
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
          select-all
        >
          <template v-slot:items="props">
           <td>
            <v-checkbox
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
import Pusher from 'pusher-js'
export default {
  name: 'ProfessorHome',
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      showMask: false,
      search: '',
      selected: [],
      professor: JSON.parse(localStorage.getItem('user')),
      headers: [
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
    console.log(this.professor.department)
    this.showMask = true
    if (typeof this.professor.department !== 'undefined') {
      console.log('entrou')
       StudentService.readAll(this.professor.department)
      .then((res) => res.data)
      .then(students => this.students = students)
      .then(() => setTimeout(() => { this.showMask = false }, 200))
      .catch((err) => console.log(err))
    } else {
      this.showMask = false
    }
   
  },
  methods: {
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
      }
    }
  },
  // pusher going to here
 /*  getNewSenderStudents () {
    Pusher.logToConsole = true;

    let pusher = new Pusher('9dc5a8662a93a62e45bb', {
      cluster: 'us2',
      forceTLS: true
    });

    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
  } */
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
</style>