<template>
  <v-app>
    <mask-load v-if="showMask"></mask-load>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin/cursos">cursos</v-btn>
        <v-btn flat to="/admin/departamentos">departamentos</v-btn>
        <v-btn flat to="/admin/professores">professores</v-btn>
        <v-btn flat to="/admin/grupos">grupos</v-btn>
        <v-btn flat to="/professor/home">alunos</v-btn>
        <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <v-layout class="table">
       <v-card>
        <v-card-title>
          Nutrition
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
          :headers="headers"
          :items="students"
          :search="search"
        >
          <template v-slot:items="props">
            <td>{{ props.item.name }}</td>
            <td class="text-md-left">{{ props.item.ra }}</td>
            <td class="text-md-left">{{ props.item.graduation }}</td>
            <td class="text-md-left">{{ props.item.email }}</td>
            <td class="text-md-left"> 
            <v-btn
              color="#00796B"
              class="mr-2"
              :disabled="props.item.sent"
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
        { text: 'documentos', value: 'action'}
      ],
      students: []
    }
  },
  created () {
    console.log(this.professor.department)
    this.showMask = true
    StudentService.readAll(this.professor.department)
      .then((res) => res.data)
      .then(students => this.students = students)
      .then(() => setTimeout(() => { this.showMask = false }, 1000))
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/professor')
    }
  },
  // pusher going to here
  getNewSenderStudents () {
    Pusher.logToConsole = true;

    let pusher = new Pusher('9dc5a8662a93a62e45bb', {
      cluster: 'us2',
      forceTLS: true
    });

    let channel = pusher.subscribe('my-channel');
    channel.bind('my-event', function(data) {
      alert(JSON.stringify(data));
    });
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
</style>