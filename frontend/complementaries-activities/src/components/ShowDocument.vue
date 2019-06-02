<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable max-width="630px">
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" small dark v-on="on" class="mr-1"><v-icon color="white">picture_as_pdf
        </v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ document.name }}</span>
        </v-card-title>
        <v-card-text>
          <canvas :id="document.path"></canvas>
        </v-card-text>
        <v-card-actions>
          <v-icon class="mr-2" @click="renderPage(document.path, pdfScale, --pageNum)">keyboard_arrow_left</v-icon>
          <v-icon @click="renderPage(document.path, pdfScale, ++pageNum)">keyboard_arrow_right</v-icon>
          <v-divider
            class="mx-3"
            inset
            vertical
          ></v-divider>
          <v-icon class="mr-2" @click="renderPage(document.path, pdfScale+=0.1, pageNum)">zoom_in</v-icon>
          <v-icon @click="renderPage(document.path, pdfScale-=0.1, pageNum)">zoom_out</v-icon>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import DocumentService from '@/services/Document'
import pdfjs from 'pdfjs-dist'
export default {
  name: 'ShowDocument',
  props: ['document'],
  data () {
    return {
      dialog: false,
      pdfScale: 1,
      pageNum: 1,
      numberPages: 0,
      pdf: null
    }
  },
  created () {
    console.log(this.document.path)
    this.getDocument(this.document.path)
  },
  methods: {
    renderPage (path, scale_increment, pageNum) {

      this.pageNum = (pageNum > this.numberPages) ? this.numberPages : pageNum
      this.pageNum = (pageNum <= 0) ? 1 : this.pageNum

      this.pdfScale = scale_increment

      this.pdf.getPage(this.pageNum).then(page => {

          var viewport = page.getViewport(this.pdfScale);
          
          var canvas = document.getElementById(path)
          var context = canvas.getContext("2d")
          canvas.height = viewport.height
          canvas.width = viewport.width
          this.sizeDoc = viewport.width
          var renderContext = {
            canvasContext: context,
            viewport: viewport
          }
          var renderTask = page.render(renderContext)
          
          renderTask.promise.then(() => {
            console.log('page rendered')
          })
      }, (reason) => {
          // implemente mensagem de erro
        console.error(reason)
      })
    },
    getDocument (path) {
      DocumentService.getFile(path)
        .then((resp) => {
         
          pdfjs.getDocument(resp.data).then(doc => {
            this.pdf = doc
            this.numberPages = doc.numPages
            this.renderPage(path, 1, 1)
          })
        })
    },
  }
}
</script>

<style scoped>
.v-dialog {
 height: 30vh;
}
.v-btn {
  min-width: 15%;
}
</style>