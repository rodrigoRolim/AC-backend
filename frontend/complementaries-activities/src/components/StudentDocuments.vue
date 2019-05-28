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
        :items="desserts"
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
      ],
      desserts: [
        {
          name: 'Atividades comunitárias',
          group: 1,
          item: 'IV',
          score: 14,
          evaluation: 4.0,
        },
        {
          name: 'Ice cream sandwich',
          group: 237,
          item: 9.0,
          score: 37,
          evaluation: 4.3,

        },
        {
          name: 'Eclair',
          group: 262,
          item: 16.0,
          score: 23,
          evaluation: 6.0,
          iron: '7%'
        },
        {
          name: 'Cupcake',
          group: 305,
          item: 3.7,
          score: 67,
          evaluation: 4.3,
          iron: '8%'
        },
        {
          name: 'Gingerbread',
          group: 356,
          item: 16.0,
          score: 49,
          evaluation: 3.9,
          iron: '16%'
        },
        {
          name: 'Jelly bean',
          group: 375,
          item: 0.0,
          score: 94,
          evaluation: 0.0,
          iron: '0%'
        },
        {
          name: 'Lollipop',
          group: 392,
          item: 0.2,
          score: 98,
          evaluation: 0,
          iron: '2%'
        },
        {
          name: 'Honeycomb',
          group: 408,
          item: 3.2,
          score: 87,
          evaluation: 6.5,
          iron: '45%'
        },
        {
          name: 'Donut',
          group: 452,
          item: 25.0,
          score: 51,
          evaluation: 4.9,
          iron: '22%'
        },
        {
          name: 'KitKat',
          group: 518,
          item: 26.0,
          score: 65,
          evaluation: 7,
          iron: '6%'
        }
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