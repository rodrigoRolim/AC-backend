<template>
   <v-app>
     <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin/home">home</v-btn>
        <v-btn flat to="/admin/professor">professores</v-btn>
        <v-btn flat to="/admin/grupo">grupos</v-btn>
        <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
       
      </ac-navbar>
      <v-layout class="table">
        <v-toolbar flat color="white">
      <v-toolbar-title>Lista de cursos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
        <template v-slot:activator="{ on }">
          <v-btn color="secondary" depressed dark class="mb-1" v-on="on">Novo curso</v-btn>
        </template>
        <v-card>
          <v-card-title>
            <span class="headline">{{ formTitle }}</span>
          </v-card-title>

          <v-card-text>
            <v-container grid-list-md>
              <v-layout wrap>
                <v-flex xs12 sm12 md12>
                  <v-text-field
                  v-model="editedItem.name"
                  :rules="nameRules"
                  label="nome do curso"
                  required
                  ></v-text-field>
                </v-flex>
              </v-layout>
            </v-container>
          </v-card-text>

          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="error" @click="close">Cancel</v-btn>
            <v-btn color="primary"
            :disabled="!valid"
            @click="save">Save</v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-toolbar>

      <v-card>
        <v-card-title >
          Cursos
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
        
      >
        <template v-slot:items="props" >
          <td class="name-item">{{ props.item.name }}</td>
          <td class="justify-end layout px-6">
          <btn-set-professor class="mr-3 tam" :degree="props.item"></btn-set-professor>
          <v-icon
            small
            color="success"
            class="mr-3 tam"
            @click="editItem(props.item)"
          >
            edit
          </v-icon>
          <v-icon
            small
            color="error"
            class="mr-3 tam"
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
  </v-layout>

  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar.vue'
import Degree from '@/services/Admin.js'
import BtnSetProfessor from '../SetProfessor'
export default {
  components: { BtnSetProfessor, AcNavbar },
  data () {
    return {
      dialog: false,
      editedIndex: -1,
      valid: true,
      nameRules: [
        v => !!v || 'Name is required'
      ],
      editedItem: {
        name: ''
      },
      defaultItem: {
        name: ''
      },
      search: '',
      pagination: {
        rowsPerPage: 6,
        page: 1
      },
      selected: [],
      headers: [
        {
          text: 'Cursos',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      degrees: []
    }
  },
  computed: {
    pages () {
      this.pagination.totalItems = this.degrees.length
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
          return 0
        } 
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
  mounted () {
    this.initialize()
  },
  methods: {
    initialize () {
      Degree.readAllDegrees()
        .then((degrees) => {
          this.degrees = degrees.data
          console.log(this.degrees)
        })
    },
    editItem (item) {
      this.editedIndex = this.degrees.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.degrees.indexOf(item)
      const userResponse = confirm('Are you sure you want to delete this item?')
      if (userResponse) {
        Degree.deleteDegree(item).then((res) => {
        alert(res.data.message)
        })
        .then(() => {
          console.log('e aqui')
          console.log(item)
          if (typeof item.professor !== 'undefined') {
            Degree.unsetGraduationOfProfessor(item._id)
              .then((res) => {
                console.log('entrou aqui')
                console.log(res)
              })
          }
          this.degrees.splice(index, 1)
        })
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/admin')
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
        Degree.updatingDegree(this.editedItem._id, this.editedItem)
          .then((res) => {
            if (res.data.ok == 1) {
              alert('atualizado com sucesso')
            }
          })
        Object.assign(this.degrees[this.editedIndex], this.editedItem)
      } else {
        Degree.addDegree(this.editedItem).then((degree) => {
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
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 70%;
  margin: 0 auto;
  max-height: 100vh;
}
.table {
  display: flex;
  flex-direction: column;
  align-content: center;
  justify-content: center;
  width: 75%;
  margin: 0 auto;
  height: 70vh;
}
.title {
  background-color: white;
}
</style>
