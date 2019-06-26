<template>
  <v-layout class="table">
    <v-alert
      :value="successUpload"
      :type="alert"
      >
        {{ messageAlert }}
    </v-alert>
   <v-toolbar flat color="white">
    <v-toolbar-title>Lista de documentos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn 
      color="secondary" 
      v-if="documents.length > 0"
      @click="sentDocuments" depressed 
      :disabled="loadBtn || situation == 'approved'"
      :loading="loadBtn"
      class="mb-1">
      enviar documentos
    </v-btn>
   </v-toolbar>
    <v-card>
      <v-card-title>
        Documentos
        <v-spacer></v-spacer>
        <v-text-field
          v-model="search"
          append-icon="search"
          label="Search"
          single-line
          hide-details
        ></v-text-field>
      </v-card-title>
      <v-data-table
        :headers="headers"
        :items="documents"
        :search="search"
      >
      <template v-slot:items="props">
        <td>{{ props.item.name }}</td>
        <td class="text-md-left">{{ props.item.group }}</td>
        <td class="text-md-left">
          <v-tooltip top>
            <template v-slot:activator="{ on }" >
              <v-icon  v-on="on">description</v-icon>
            </template>
            <span>{{ props.item.item }}</span>
          </v-tooltip>
        </td>
        <td class="text-md-left">{{ props.item.score }}</td>
        <td class="text-md-left">
        <v-tooltip top>
          <template v-slot:activator="{ on }">
            <v-icon v-on="on" v-bind:class="getIcon(props.item.evaluation)">
              {{ getIcon(props.item.evaluation)  }}
            </v-icon>
          </template>
          <span>{{ getEvaluation(props.item.evaluation) }}</span>
        </v-tooltip>
        </td>
        <td class="text-md-left">
          <comments v-if="props.item.feedback" :feedback="props.item.feedback"></comments>
        </td>
        <td class="justify-center layout px-0">
          <show-document :document="props.item"></show-document>
          <v-btn
            color="#00796B"
            class="mr-2"
            :disabled="props.item.sent && props.item.evaluation !== 'reproved'"
            small
            :to="`/aluno/documento/add/${props.item._id}`"
          >
            <v-icon color="white">edit</v-icon>
          </v-btn>
          <v-btn
            color="#FF1744"
            class="mr-2"
            :disabled="props.item.sent && props.item.evaluation !== 'reproved'"
            small
            @click="deleteDocument(props.item)"
          >
            <v-icon color="white">delete</v-icon>
          </v-btn>
        </td> 
      </template>
      <template v-slot:no-results>
        <v-alert :value="true" color="error" icon="warning">
          Your search for "{{ search }}" found no results.
        </v-alert>
      </template>
      <template v-slot:no-data>
        <v-alert :value="true" color="#78909C" icon="warning">
          nenhum documento cadastrado
        </v-alert>
      </template>
     </v-data-table>
    </v-card>
  </v-layout>
</template>

<script>
import Comments from './Comments'
import DocumentService from '@/services/Document'
import ShowDocument from  './ShowDocument'
export default {
  name: 'StudentProgess',
  components: { },
  props: ['documents', 'situation'],
  components: { Comments, ShowDocument },
  data () {
    return {
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
      ]
    }
  },
  created () {

  },
  methods: {

    allsents () {
      if (this.documents.length !== 0) {
        const qtdDocuments = this.documents.filter((doc) => doc.sent && doc.evaluation !== 'reproved')
        return (qtdDocuments.length === this.documents.length)
      } else {
        return false
      }      
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
    deleteDocument (doc) {

      const userResponse = confirm('tem certeza que deseja excluir este item?')
      if (userResponse) {
         DocumentService.delete(doc.path)
          .then((res) => {
            this.popDocument(doc)
            setTimeout(this.getAlert('success', 'Excluído com sucesso!'), 2000)
            return
          })
          .then(() =>this.updateBoardStore(doc))
          .catch((err) => {
            this.getAlert('error', 'houve um problema na hora de excluir')
          })
      }
    },
    updateBoardStore (document) {

      const boardItems = this.$store.getters.getBoard
      const boardItem = boardItems.filter(item => item.group == document.group)[0]

      const position = boardItems.indexOf(boardItem)
      let raw = document.score

      let percent = 0
      let new_raw = 0
        
      new_raw = boardItem.raw - raw
      percent = (boardItem.raw - raw)*100/boardItem.min
    
      const update_board = { position: position, raw: new_raw, percent: percent }

      this.$store.dispatch('update', update_board)
    },
    sentDocuments () {
      this.loadBtn = true
      const studentid = JSON.parse(localStorage.getItem('user'))._id

      if (!this.allsents()) {
        DocumentService.send(studentid)
        .then((res) => {
          setTimeout(this.getAlert('success', 'Enviados com sucesso!'), 2000)
          this.documents.map((doc) => {
            doc.sent = true
            if (doc.evaluation == 'reproved') {
              doc.evaluation = 'none'
            }
          })
        })
        .catch((err) => setTimeout(this.getAlert('error', 'Não foi possível enviar, tente mais uma vez!'), 2000))
      } else {
        this.getAlert('info', 'Não há documentos reprovados ou não avaliados para se enviar!')
      }
    },
    popDocument (doc) {
      const index = this.documents.indexOf(doc)
      this.documents.splice(index, 1)
    },
    getEvaluation (evaluation) {
      switch (evaluation) {
       case 'none':
          return 'não avaliado'
        case 'aproved':
          return 'aceito'
        case 'reproved':
          return 'não aceito'
      }
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
.v-btn {
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
#description {
  word-break: break-all;
  width: 1%;
}
</style>