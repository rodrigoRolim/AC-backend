<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/aluno/home">Home</v-btn>
        <v-btn flat color="blue-grey" to="/aluno/documento/add">
        documento <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <student-progress v-if="documentsResponse.length != 0" 
    :documents="documentsResponse" >
    </student-progress>
    <student-documents v-if="documentsResponse.length != 0" 
    :documents="documentsResponse" >
    </student-documents>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import StudentDocuments from '../StudentDocuments'
import StudentProgress from '../StudentProgress'
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import pdfjs from 'pdfjs-dist'

export default {
  name: 'StudentHome',
  components: { AcNavbar, StudentDocuments, StudentProgress },
  data () {
    return {
      pdf: null,
      documentsResponse: [],
      progress_group_1: 0,
      progress_group_2: 0,
      progress_group_3: 0,
      progress: []
    }
  },
  created () {
    DocumentService.readAll()
      .then((documents) => {
       this.documentsResponse = documents.data
       console.log(this.documentsResponse)
      })

  },
  methods: {
    /* initiliazeGroups () {
      GroupService.readAll()
        .then((resp) => {
          console.log(resp.data)
        })
    }, */
    async calculateProgress () {
      await this.documentResponse.map(document => {
        switch(document.group) {
          case 'grupo 1':
            this.progress_group_1 += document.score
          case 'grupo 2':
            this.progress_group_2 += document.score
          case 'grupo 3':
            this.progress_group_3 += document.score
        }
      })
    },
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