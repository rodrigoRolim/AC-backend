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
    <v-alert
        class="alert"
        :type="typeAlert"
        :value="showAlert"
        >
        {{message}}
    </v-alert>
    <student-progress v-if="situation && documents.length >= 0" :documents="documents" :situation="situation"></student-progress>
    <student-documents v-if="documents.length >= 0" :documents="documents" :situation="situation"></student-documents>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import StudentDocuments from '../StudentDocuments'
import StudentProgress from '../StudentProgress'
import StudentService from '@/services/Student'
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import pdfjs from 'pdfjs-dist'
// import Pushser from 'pusher-js'
export default {
  name: 'StudentHome',
  components: { AcNavbar, MaskLoad, StudentDocuments, StudentProgress },
  data () {
    return {
      message: '',
      typeAlert: 'error',
      showAlert: false,
      showMask: false,
      pdf: null,
      documents: [],
      situation: null
    }
  },
  created () {
    this.showMask = true
    this.initialize(JSON.parse(localStorage.getItem('user'))._id)
  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    },
    getSituation (idStudent) {
      StudentService.getSituation(idStudent)
        .then((res) => res.data.situation)
        .then((situation) => this.situation = situation)
        .catch((err) => this.getAlert('error', 'ocorreu um erro, tente mais uma vez'))
    },
    initialize (idStudent) {
      GroupService.readAll()
        .then((res) => res.data)
        .then((groups) => this.getDocuments(idStudent, groups))
        .then(() => this.getSituation(idStudent))
        .catch((err) => this.getAlert('error', 'ocorreu um erro, tente mais uma vez'))
    },
    getDocuments (idStudent, groups) {
       DocumentService.readAll(idStudent)
        .then((res) => res.data)
        .then((documents) => {
          if (documents.length > 0) {
            this.documents = this.replaceIdForNames(groups, documents)
          } else {
            this.documents = []
          }
          setTimeout(() => {
            this.showMask = false 
          }, 1000)
        })
        .catch((err) => {
          this.showMask = false
          this.getAlert('error', 'ocorreu um erro, tente mais uma vez')
        })
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
    getAlert (type, message) {
      this.typeAlert = type
      this.message = message
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 5000)
    }
  }
}
</script>

<style scoped>

</style>