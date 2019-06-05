<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" scrollable max-width="850px" >
      <template v-slot:activator="{ on }">
        <v-btn color="secondary" small dark v-on="on" class="mr-1"><v-icon color="white">picture_as_pdf
        </v-icon></v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">{{ document.name }}</span>
        </v-card-title>
        <v-card-text class="pdf">
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
          <v-divider
            class="mx-3"
            inset
            vertical
          ></v-divider>
          <professor-feedback @comments="getComment"></professor-feedback>
          <v-spacer></v-spacer>

            <v-flex xs12 sm6 md3>
              <v-radio-group v-model="evaluation" lign-center justify-center row class="ma-0 align-center">
                <v-radio
                  label="reprovar"
                  color="red"
                  value="reproved"
                ></v-radio>
                <v-radio
                  label="aprovar"
                  color="success"
                  value="aproved"
                ></v-radio>
              </v-radio-group>
            </v-flex>

            <v-spacer></v-spacer>
           <v-btn color="secondary" @click="dialog = false" dark depressed >fechar</v-btn>
           <v-btn color="blue darken-1" @click="update" dark depressed >Confirmar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import DocumentService from '@/services/Document'
import ProfessorFeedback from './ProfessorFeedback'
import pdfjs from 'pdfjs-dist'
export default {
  name: 'ShowDocument',
  components: { ProfessorFeedback },
  props: ['document'],
  data () {
    return {
      evaluation: '',
      comments: '',
      dialog: false,
      pdfScale: 1,
      pageNum: 1,
      numberPages: 0,
      pdf: null
    }
  },
  created () {
    this.getDocument(this.document.path)
    console.log(this.dialog)
  },
  computed: {
    getDialog () {
      
      return this.dialog
    }
  },
  methods: {
    update () {
      
      this.document.evaluation = this.evaluation
      
      // agora voce tem que salvar isso no banco e não permtir que o professor aprove um documento mais de uma vez

      this.dialog = false
      //{ position: }
      // setar em board o score min também
    },
    updateDocument () {
      const update_document = { document: this.document, evaluation: this.evaluation }
      this.$emit('refresh', update_document)
    },
    updateBoard () {
      
      const boardItems = this.$store.getters.getBoard
      const boardItem = boardItems.filter(item => item.group == this.document.group)
      const position = boardItems.indexOf(boardItem[0])
      const raw = this.document.score
      const percent = (boardItem[0].raw + raw)*100/boardItem[0].min
      const update_board = { position: position, raw: raw, percent: percent}
      
      this.$store.dispatch('update', update_board)
    }
    getComment (comments) {
      this.comments = comments
    },
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
.v-btn {
  min-width: 15%;
}
.pdf {
  display: flex;
  flex-direction: column;
  height: 100vh;
  margin: 0;
}
</style>