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
    <professor-progress v-if="situation" :documents="documents" :situation="situation"></professor-progress>
    <sent-documents v-if="situation" :documents="documents" :situation="situation"></sent-documents>
  </v-app>
</template>

<script>
import Comments from '../Comments'
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import SentDocuments from '../SentDocuments'
import ProfessorProgress from '../ProfessorProgress'
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import StudentService from '@/services/Student'
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
      documents: null,
      situation: null
    }
  },
  created () {
    this.initialize(this.$route.params.id)
  },
  methods: {
    
    initialize (idStudent) {
      GroupService.readAll()
        .then((res) => res.data)
        .then((groups) => this.getDocuments(idStudent, groups))
        .then(() => this.getSituation())
        .catch((err) => console.log(err))
    },
    getSituation () {
      StudentService.getSituation(this.$route.params.id)
        .then((res) => res.data)
        .then((situation) => this.situation = situation)
        .catch((err) => console.log(err))
    },
    getDocuments (idStudent, groups) {
       DocumentService.readAll(idStudent)
        .then((res) => res.data)
        .then((documents) => {
          if (documents) {
            this.documents = this.replaceIdForNames(groups, documents)
          } else {
            this.documents = null
          }
          //this.documentsResponse = this.replaceIdForNames(groupsItems, documents)
          setTimeout(() => {
            this.showMask = false 
          }, 1000)
        })
        .catch((err) => console.log(err))
    },
    getNameGroup(groupId, groups) {
      const group = groups.filter((group) => group._id == groupId)
      return group
    },
    getNameItem (group, idItem) {

      const item = group[0].items.filter((item) => item._id == idItem)
      return item
    },
    replaceIdForNames (groups, documents) {

      const newdocuments = documents.map((document) => {
        const group = this.getNameGroup(document.group, groups)
        const item = this.getNameItem(group, document.item)
        document.group = group[0].name
        document.item = item[0].description
        return document
      })

      return newdocuments
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