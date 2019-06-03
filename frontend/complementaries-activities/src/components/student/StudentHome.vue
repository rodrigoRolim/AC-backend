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
    const idStudent = JSON.parse(localStorage.getItem('user'))._id
    DocumentService.readAll(idStudent)
      .then((documents) => {
        this.documentsResponse = documents.data
        setTimeout(() => {
          this.showMask = false 
        }, 1000)
      })

  },
  methods: {
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/aluno')
    },
  }
}
</script>

<style scoped>

</style>