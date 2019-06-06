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
    <!--<v-btn 
    color="secondary" 
    v-if="documents.length > 0"
    depressed 
    :disabled="false"
    :loading="false"
    class="mb-1">enviar documentos</v-btn>-->
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
          {{ getIcon(props.item.evaluation) }}
        </v-icon>
        </td>
        <td class="justify-center layout px-0">
          <show-sent-document :document="props.item" @refresh="updateEvaluation"></show-sent-document>
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
import DocumentService from  '@/services/Document'
import Comments from './Comments'
import ShowSentDocument from './ShowSentDocument'
export default {
  name: 'SentDocuments',
  components: { Comments, ShowSentDocument },
  props: ['documents'],
  data () {
    return {
      search: '',
      successUpload: false,
      messageAlert: '',
      alert: 'success',
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
        { text: 'ações', value: 'actions', sortable: false, align: 'left' }
      ]
    }
  },
  created () {
    console.log(this.documents)
  },
  methods: {
    updateEvaluation (value) {
      console.log(value)
      const position = this.documents.indexOf(value.document)
      this.documents[position].evaluation = value.evaluation
      this.$emit('reload', true)
    },
    getIcon (evaluation) {
      console.log('sentdoc')
      console.log(evaluation)
      switch (evaluation) {
        case 'none':
          return 'fiber_manual_record'
        case 'aproved':
          return 'check_circle'
        case 'reproved':
          return 'remove_circle'
      }
    },
  }
}
</script>

<style scoped>
.check_circle {
  color: green
}
.remove_circle {
  color: red
}
</style>