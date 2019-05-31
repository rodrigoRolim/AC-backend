<template>
  <v-layout class="table">
   <v-toolbar flat color="white">
    <v-toolbar-title>Lista de documentos</v-toolbar-title>
    <v-spacer></v-spacer>
    <v-btn color="secondary" depressed dark class="mb-1">enviar documentos</v-btn>
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
        <td class="text-md-left">{{ props.item.evaluation }}</td>
        <td class="text-md-left">
          <comments></comments>
        </td>
        <td class="justify-center layout px-0">
          <show-document :document="props.item"></show-document>
          <v-icon
            color="#43A047"
            class="mr-3"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            color="#FF1744"
            class="mr-3"
            @click="editItem(props.item)"
          >
            delete
          </v-icon>
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
  methods: {
    openDocument (document) {
      DocumentService.getFile(document.path)
        .then((res) => {
          console.log(res)
        })
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
</style>