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
          <professor-feedback class="mr-5" @feedback="getComment" v-if="!situation == 'approved'"></professor-feedback>
          <v-spacer></v-spacer>

          <v-flex xs7 sm7 md4 class="ml-5">
            <v-btn color="success"
            class="actions"
            small
            @click="update('aproved')" dark depressed :disabled="situation == 'approved'" ><v-icon medium>fa-check</v-icon></v-btn>
            <v-btn color="#FFAB40"
            class="actions"
            small
            @click="update('none')" depressed dark :disabled="situation == 'approved'"> <v-icon medium>fa-undo</v-icon></v-btn>
            <v-btn color="error"
            class="actions"
            small
            @click="update('reproved')" dark depressed :disabled="situation == 'approved'" ><v-icon medium>fa-times</v-icon></v-btn>
          </v-flex>
          <v-spacer></v-spacer>
          <v-btn small color="secondary" @click="dialog = false" dark depressed >fechar</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
import DocumentService from '@/services/Document'
import GroupService from '@/services/Group'
import ProfessorFeedback from './ProfessorFeedback'
import pdfjs from 'pdfjs-dist'
export default {
  name: 'ShowDocument',
  components: { ProfessorFeedback },
  props: ['document', 'situation'],
  data () {
    return {
      newEvaluation: '',
      oldEvaluaton: '',
      comments: '',
      dialog: false,
      pdfScale: 1,
      pageNum: 1,
      numberPages: 0,
      pdf: null,
      group: null
    }
  },
  created () {
    this.evaluation = this.document.evaluation
    this.getDocument(this.document.path)
  },
  computed: {
    getDialog () {
      
      return this.dialog
    }
  },
  methods: {
    replaceForIdGroupItem (group, document) {
      
      document.group = group._id
      const item = group.items.filter((item) => item.description == document.item)[0]
      document.item = item._id

      return document
    },
    getComment (comments) {
      this.comments = comments
    },
    updateDocument (document) {
      DocumentService.update(document._id, document)
        .then((res) => {
          this.document.evaluation = document.evaluation
          return this.document
        })
        .then((document) => this.updateDocumentTable(document))
        .then((document) => this.updateBoardStore(document)) 
        .then(() => this.dialog = false)
        .catch((err) => {
          console.log(err)
        })

    },
    setEvaluationInDocument (evaluation, document) {
      document.evaluation = evaluation
      return document
    },
    setCommentInDocument (document, comments) {
      document.feedback = comments
      return document
    },
    update (evaluation) {

      this.oldEvaluaton = this.document.evaluation
      this.newEvaluation = evaluation

      var doc = Object.assign({}, this.document)
      GroupService.getByName(this.document.group)
        .then((res) => res.data[0])
        .then((group) => this.replaceForIdGroupItem(group, doc))
        .then((document) => this.setEvaluationInDocument(evaluation, document))
        .then((document) => this.setCommentInDocument(document, this.comments)) 
        .then((document) => this.updateDocument(document))
        .catch((err) => console.log(err))
     
    },
    updateDocumentTable (document) {

      const update_document = { document: this.document, evaluation: this.document.evaluation }
      this.$emit('refresh', update_document)
      return document
    },
    updateBoardStore (document) {

      const boardItems = this.$store.getters.getBoard
      const boardItem = boardItems.filter(item => item.group == document.group)[0]

      const position = boardItems.indexOf(boardItem)
      let raw = document.score

      let percent = 0
      let new_raw = 0

      if (this.oldEvaluaton !== 'aproved' && this.newEvaluation == 'aproved') {
        
        new_raw = boardItem.raw + raw
        percent = (boardItem.raw + raw)*100/boardItem.min
      } else if (this.oldEvaluaton !== 'reproved' && boardItem.raw > 0 && this.newEvaluation == 'reproved') {
        console.log('reprpovv')
        new_raw = boardItem.raw - raw
        percent = (boardItem.raw - raw)*100/boardItem.min
      } else {
        console.log('else')
        new_raw = boardItem.raw
        percent = boardItem.percent
      }
     
      const update_board = { position: position, raw: new_raw, percent: percent }

      this.$store.dispatch('update', update_board)
    },
    getIdGroupItem (nameGroup) {
      const group = this.groups
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
.actions {
  min-width: 17%;
}
</style>