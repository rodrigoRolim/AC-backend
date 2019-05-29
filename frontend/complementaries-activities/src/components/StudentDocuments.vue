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
            <v-icon
              
              color="#42A5F5"
              class="mr-3"
              @click="editItem(props.item)"
            >
              send
            </v-icon>
            <v-icon
              color="#546E7A"
              class="mr-3"
              @click="editItem(props.item)"
            >
              open_in_browser
            </v-icon>
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
export default {
  name: 'StudentProgess',
  props: ['documents'],
  components: { Comments },
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
        { text: 'Grupo', value: 'group', align: 'left' },
        { text: 'Item', value: 'item', align: 'left' },
        { text: 'Pontos', value: 'score', align: 'left' },
        { text: 'Avaliação', value: 'evaluation', align: 'left' },
        { text: 'Feedback', value: 'feedback', align: 'left' },
        { text: 'ações', value: 'actions', align: 'left' }
      ]
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