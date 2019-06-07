<template>
  <v-app>
    <mask-load v-if="showMask"></mask-load>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/aluno/home">Home</v-btn>
        <v-btn flat color="blue-grey" to="/aluno/documento/add">
        documento <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <student-progress v-if="documentsResponse" :documents="documentsResponse"></student-progress>
    <student-documents v-if="documentsResponse" :documents="documentsResponse"></student-documents>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import MaskLoad from '../MaskLoad'
import StudentDocuments from '../StudentDocuments'
import StudentProgress from '../StudentProgress'
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import pdfjs from 'pdfjs-dist'

export default {
  name: 'StudentHome',
  components: { AcNavbar, MaskLoad, StudentDocuments, StudentProgress },
  data () {
    return {
      showMask: false,
      pdf: null,
      documentsResponse: null
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
    initialize (idStudent) {
      GroupService.readAll()
        .then((res) => res.data)
        .then((groups) => this.getDocuments(idStudent, groups))
    },
    getDocuments (idStudent, groups) {
       DocumentService.readAll(idStudent)
        .then((res) => res.data)
        .then((documents) => {
          if (documents.length > 0) {
            this.documentsResponse = this.replaceIdForNames(groups, documents)
          } else {
            this.documentsResponse = []
          }
          //this.documentsResponse = this.replaceIdForNames(groupsItems, documents)
          setTimeout(() => {
            this.showMask = false 
          }, 1000)
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
    }
  }
}
</script>

<style scoped>

</style>