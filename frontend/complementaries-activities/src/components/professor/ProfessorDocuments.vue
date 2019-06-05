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
    <professor-progress v-if="documents" :documents="documents"></professor-progress>
    <sent-documents v-if="documents" :documents="documents"></sent-documents>
  </v-app>
</template>

<script>
import Comments from '../Comments'
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import SentDocuments from '../SentDocuments'
import ProfessorProgress from '../ProfessorProgress'
import DocumentService from '@/services/Document'
import ShowDocument from  '../ShowDocument'
export default {
  name: 'StudentProgess',
  components: { Comments, ShowDocument, AcNavbar, ProfessorProgress, SentDocuments, MaskLoad },
  data () {
    return {
      showMask: false,
      choiced: '',
      reproveBtn: false,
      aproveBtn: false,
      loadBtn: false,
      isAllSent: false,
      successUpload: false,
      messageAlert: '',
      alert: 'success',
      search: '',
      dialog: false,
      editedIndex: -1,
      search: '',
      headers: [
        {
          text: 'Nome do documento',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Grupo', value: 'group', sortable: false, align: 'left' },
        { text: 'Item', value: 'item', sortable: false, align: 'left' },
        { text: 'Pontos', value: 'score', sortable: false, align: 'left' },
        { text: 'Avaliação', value: 'evaluation', sortable: false, align: 'left' },
        { text: 'Feedback', value: 'feedback', sortable: false, align: 'left' },
        { text: 'ações', value: 'actions', sortable: false, align: 'left' }
      ],
      documents: null
    }
  },
  created () {
    console.log(this.choiced)
    this.initializeDocuments(this.$route.params.id)
  },
  methods: {
    
    initializeDocuments (studentid) {
      this.showMask = true
      DocumentService.readAllSents(studentid)
        .then((res) => res.data)
        .then((documents) => {
          this.documents = documents
          return
        })
        .then(() => setTimeout(() => { this.showMask = false }, 2000))
        .catch((err) => console.log(err))
    },
    getIcon (evaluation) {
      switch (evaluation) {
        case 'none':
          return 'fiber_manual_record'
        case 'aproved':
          return 'check_circle'
        case 'reproved':
          return 'remove_circle'
      }
    },
    getAlert (type, message) {
      this.alert = type
      this.messageAlert = message
      this.successUpload = true
      this.loadBtn = false
      setTimeout(() => {
        this.successUpload = false
      }, 5000)
    },
    confirmAvaliations () {
      this.loadBtn = true
      const studentid = JSON.parse(localStorage.getItem('user'))._id
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/professor')
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
.table .v-btn {
  min-width: 15%
}
.v-alert {
  width: 100%;
}
.check_circle {
  color: green
}
.remove_circle {
  color: red
}
</style>