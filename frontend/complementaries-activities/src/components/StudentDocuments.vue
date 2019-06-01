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
    <v-btn color="secondary" 
    @click="sentDocuments" depressed 
    :disabled="loadBtn || isAllSent"
    :loading="loadBtn"
    class="mb-1">enviar documentos</v-btn>
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
        <td class="text-md-left">{{ props.item.item }}</td>
        <td class="text-md-left">{{ props.item.score }}</td>
        <td class="text-md-left">
        <v-icon v-bind:class="getIcon(props.item.evaluation)">
          {{ getIcon(props.item.evaluation)  }}
        </v-icon>
        </td>
        <td class="text-md-left">
          <comments></comments>
        </td>
        <td class="justify-center layout px-0">
          <show-document :document="props.item"></show-document>
          <v-btn
            color="#00796B"
            class="mr-2"
            :disabled="props.item.sent"
            small
            :to="`/aluno/documento/add/${props.item._id}`"
          >
            <v-icon color="white">edit</v-icon>
          </v-btn>
          <v-btn
            color="#FF1744"
            class="mr-2"
            :disabled="props.item.sent"
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
  props: ['documents'],
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
    console.log(this.documents)
    this.verifyAllSent()
  },
  methods: {
    verifyAllSent () {
      if (this.documents.length !== 0) {
        console.log(this.documents.filter((doc) => doc.sent).length)
        this.isAllSent = this.documents.filter((doc) => doc.sent).length === this.documents.length
      } else {
        this.isAllSent = false
      }
    }/* ,
    isAllHaveMinScore () {
      if (this.documents.length !== 0) {
        
      } else {
        return false
      }
    } */, 
    getIcon (evaluation) {
      switch (evaluation) {
        case 'none':
          return 'fiber_manual_record'
        case 'aproved':
          return 'check_circle'
      }
    },
    getAlert (type, message) {
      this.alert = type
      this.messageAlert = message
      this.successUpload = true
      setTimeout(() => {
        this.loadBtn = false
        this.successUpload = false
      }, 5000)
    },
    deleteDocument (doc) {
      // verificar se o sent é falso no lado do servidor: middleware
       const userResponse = confirm('tem certeza que deseja excluir este item?')
      if (userResponse) {
         DocumentService.delete(doc.path)
          .then((res) => {
            this.popDocument(doc)
            this.getAlert('success', 'Excluído com sucesso!')
          })
          .catch((err) => {
            this.getAlert('error', 'houve um problema na hora de excluir')
          })
      }
    },
    sentDocuments () {
      this.loadBtn = true
      const studentid = JSON.parse(localStorage.getItem('user'))._id

      DocumentService.send(studentid)
        .then((res) => {
          this.getAlert('success', 'Enviados com sucesso!')
          this.documents.map((doc) => {
            doc.sent = true
          })
          return
        })
        .then(() => {
          this.verifyAllSent()
        })
    },
    popDocument (doc) {
      const index = this.documents.indexOf(doc)
      this.documents.splice(index, 1)
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
</style>