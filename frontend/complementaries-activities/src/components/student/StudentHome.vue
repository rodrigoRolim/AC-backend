<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/aluno/home">Home</v-btn>
        <v-btn flat color="blue-grey" to="/aluno/documento/add">
        documento <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error"  @click="">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <student-progress></student-progress>
    <student-documents></student-documents>
    <!--<v-btn @click="soVem">vem nimin</v-btn>
    <div>
    <canvas id="my_canvas"></canvas></div>-->
    
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import StudentDocuments from '../StudentDocuments'
import StudentProgress from '../StudentProgress'
import DocumentService from '@/services/Document'
import pdfjs from 'pdfjs-dist'
export default {
  name: 'StudentHome',
  components: { AcNavbar, StudentDocuments, StudentProgress },
  data () {
    return {
      pdf: null
    }
  },
  methods: {
    soVem () {
      DocumentService.get()
        .then((resp) => {
            pdfjs.getDocument(resp.data).then(doc => {
              doc.getPage(1).then(page => {
                console.log(page)
                var viewport = page.getViewport(1.0);
                
                var canvas = document.getElementById("my_canvas")
                var context = canvas.getContext("2d")
                canvas.height = viewport.height
                canvas.width = viewport.width

                var renderContext = {
                  canvasContext: context,
                  viewport: viewport
                }
                var renderTask = page.render(renderContext)
                
                renderTask.promise.then(() => {
                  console.log('page rendered')
                })
              }, (reason) => {
                console.error(reason)
              })
            })
        })
    },
  }
}
</script>

<style scoped>

</style>