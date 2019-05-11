<template>

   <v-card id="ac-main">
    <v-toolbar flat color="white">
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="primary" flat dark class="mb-1" v-on="on">Novo curso</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field v-model="editedItem.name" label="nome do curso"></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="blue darken-1" flat @click="close">Cancel</v-btn>
            <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>
   
      <v-card-title>
        Cursos de graduação
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
        :items="degrees"
        :search="search"
        hide-actions
        :pagination.sync="pagination"
        class="table"
      >
        <template v-slot:items="props" >
          <td class="name-item">{{ props.item.name }}</td>
          <td class="justify-end layout px-6">
          <v-icon
            small
            class="mr-2"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            @click="deleteItem(props.item)"
          >
            delete
          </v-icon>
        </td>
        </template>
        <template v-slot:no-results  >
          <v-alert :value="true" color="error" icon="warning">
            Sua pesquisa para "{{ search }}" não obteve resultados.
          </v-alert>
        </template>
        <template v-slot:no-data>
        <v-alert :value="true" color="error" icon="warning">
          nenhum curso cadastrado
        </v-alert>
        </template>
      </v-data-table>
      <div class="text-xs-center pt-0">
      <v-pagination v-model="pagination.page" :length="pages"></v-pagination>
    </div>
  </v-card>
</template>

<script>
import Degree from '@/services/Admin.js'
export default {
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      editedItem: {
        name: '',
      },
      defaultItem: {
        name: '',
      },
      search: '',
      pagination: {
        rowsPerPage: 6
      },
      selected: [],
      headers: [
        {
          text: 'Cursos',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'right' }
      ],
      degrees: []
    }
  },
  computed: {
    pages () {
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) return 0

      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    formTitle () {
      return this.editedIndex === -1 ? 'New Item' : 'Edit Item'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  created () {
    console.log(this.degrees)
    this.initialize()
  },
  methods: {
    initialize () {
      
      this.degrees = []
    },
    editItem (item) {
      this.editedIndex = this.degrees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.degrees.indexOf(item)
      confirm('Are you sure you want to delete this item?') && this.degrees.splice(index, 1)
    },
    close () {
      this.dialog = false
      setTimeout(() => {
        this.editedItem = Object.assign({}, this.defaultItem)
        this.editedIndex = -1
      }, 300)
    },
    save () {
      if (this.editedIndex > -1) {
        // programa o update de curso
        Object.assign(this.degrees[this.editedIndex], this.editedItem)
      } else {
        Degree.addDegree(this.editedItem).then((degree) => {
          console.log(degree)
          this.degrees.push(degree.data)
        })
      }
      this.close()
    }
  }
}
</script>

<style scoped>
#ac-main {
  width: 52%;
  max-height: 80vh;
}

.table {
  min-height: 50vh;
}
</style>
