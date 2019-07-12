<template>
   <v-app>
     <mask-load v-if="showMask"></mask-load>
      <ac-navbar>
      <v-toolbar-items>
        <v-btn color="secondary" dark depressed to="/professor/home">alunos<v-icon class="ml-2">fa-graduation-cap</v-icon></v-btn>
       <v-menu
        transition="slide-y-transition"
        bottom
        >
          <template v-slot:activator="{ on }">
            <v-btn
              class="purple"
              color="blue-grey"
              depressed
              dark
              v-on="on"
            >
              menu <v-icon dark right>menu</v-icon>
            </v-btn>
          </template>
          <v-list>
            <v-list-tile to="/admin/cursos">
              <v-list-tile-title>cursos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/departamentos">
              <v-list-tile-title>departamentos</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/professores">
              <v-list-tile-title>professores</v-list-tile-title>
            </v-list-tile>
            <v-list-tile to="/admin/grupos">
              <v-list-tile-title>grupos</v-list-tile-title>
            </v-list-tile>
          </v-list>
        </v-menu>
        <v-btn color="error" depressed  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
    </ac-navbar>
      <v-layout class="table">
        <v-alert
        class="alert"
        :type="typeAlert"
        :value="showAlert"
        >
        {{message}}
        </v-alert>
        <v-toolbar flat color="white">
          <v-toolbar-title>Lista de departamentos</v-toolbar-title>
          <v-spacer></v-spacer>
          <v-dialog v-model="dialog" max-width="500px">
            <template v-slot:activator="{ on }">
              <v-btn color="secondary" depressed dark class="mb-1" v-on="on">Novo departmento</v-btn>
            </template>
            <v-card>
              <v-card-title>
                <span class="headline">novo departamento</span>
              </v-card-title>

              <v-card-text>
                <v-container grid-list-md>
                  <v-layout wrap>
                    <v-flex xs12 sm12 md12>
                      <v-text-field
                      v-model="editedItem.name"
                      :rules="nameRules"
                      label="nome do departamento"
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
            Departamentos
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
            :items="departments"
            :search="search"
            hide-actions
            :pagination.sync="pagination"
          
        >
          <template v-slot:items="props" >
            <td class="name-item">{{ props.item.name }}</td>
            <td class="justify-end layout px-6">
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
            nenhum departamento cadastrado
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
import MaskLoad from '../MaskLoad'
import DepartmentService from '@/services/Department.js'
export default {
  components: { AcNavbar, MaskLoad },
  data () {
    return {
      showMask: false,
      dialog: false,
      editedIndex: -1,
      message: '',
      typeAlert: 'error',
      showAlert: false,
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
          text: 'Departamento',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      departments: []
    }
  },
  computed: {
    pages () {
      this.pagination.totalItems = this.departments.length
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
      this.showMask = true
      DepartmentService.readAll()
        .then((res) => res.data)
        .then((departments) => {
          this.departments = departments
        })
        .then(() => setTimeout(() => { this.showMask = false}, 1000))
        .catch((err) => this.getAlert('error', err.response.data))
    },
    editItem (item) {
      this.editedIndex = this.departments.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.departments.indexOf(item)
      const userResponse = confirm('Are you sure you want to delete this item?')
      if (userResponse) {
        DepartmentService.delete(item._id)
        .then((res) => this.getAlert('success', 'deletado com sucesso'))
        .then(() =>  this.departments.splice(index, 1))
        .catch((err) => this.getAlert('error', err.response.data))
      }
    },
    logout () {
      localStorage.removeItem('token')
      localStorage.removeItem('user')
      this.$router.replace('/professor')
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
        // falta resolver a atualização de departamento, cara
        DepartmentService.update(this.editedItem._id, this.editedItem)
          .then((res) => {
            console.log(res)
          })
        Object.assign(this.departments[this.editedIndex], this.editedItem)
      } else {
        DepartmentService.save(this.editedItem)
          .then((department) => this.departments.push(department.data))
          .then(() => this.getAlert('success', 'departamento cadastrado com sucesso'))
          .catch(() => this.getAlert('error', 'não foi possível salvar o departamento'))
      }
      this.close()
    },
    getAlert (type, message) {
      this.typeAlert = type
      this.message = message
      this.showAlert = true
      setTimeout(() => {
        this.showAlert = false
      }, 5000)
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
  width: 90%;
  margin: 0 auto;
  height: 70vh;
}
.alert {
  width: 100%;
}
.title {
  background-color: white;
}
</style>
