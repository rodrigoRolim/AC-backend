<template>
   <v-app>
     <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/professor/home">cursos</v-btn>
        <v-btn flat to="/admin/departamentos">departamentos</v-btn>
        <v-btn flat to="/admin/professores">professores</v-btn>
        <v-btn flat to="/admin/grupos">grupos</v-btn>
        <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
       
      </ac-navbar>
        <v-alert :value="departments.length === 0" type="info">
          Não há departamentos cadastrados, 
          você precisa primeiro cadastrar um departamento para cadastrar um curso
        </v-alert>
        <v-alert :value="success" type="success">
          curso cadastrado com sucesso!
        </v-alert>
        <v-alert :value="denied" type="warning">
          já existe um curso com esse nome!
        </v-alert>
     <v-layout class="table">
      <v-toolbar flat color="white">
        <v-toolbar-title>Lista de cursos</v-toolbar-title>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn :disabled="departments.length === 0" color="secondary" 
            depressed dark class="mb-1" v-on="on">Novo curso</v-btn>
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
                  <v-select
                    :items="departmentNames"
                    label="departamento responsável*"
                    v-model="editedItem.department"
                    required
                  ></v-select>
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
        :items="graduations"
        :search="search"
        hide-actions
        :pagination.sync="pagination"
        >
        <template v-slot:items="props" >
          <td class="name-item">{{ props.item.name }}</td>
          <td class="name-item">{{ props.item.department }}</td>
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
import GraduationService from '@/services/Graduation.js'
import DepartmentService from '@/services/Department.js'
export default {
  components: { AcNavbar },
  data () {
    return {
      success: false,
      denied: false,
      departmentNames: [],
      selectedName: '',
      dialog: false,
      editedIndex: -1,
      valid: true,
      departments: [],
      nameRules: [
        v => !!v || 'Name is required'
      ],
      editedItem: {
        name: '',
        department: ''
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
         { text: 'Departamento', value: 'department', sortable: false, align: 'left' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      graduations: []
    }
  },
  computed: {
    pages () {
      this.pagination.totalItems = this.graduations.length
      if (this.pagination.rowsPerPage == null ||
        this.pagination.totalItems == null
      ) {
          return 0
        } 
      return Math.ceil(this.pagination.totalItems / this.pagination.rowsPerPage)
    },
    formTitle () {
      return this.editedIndex === -1 ? 'Novo curso' : 'Editar Curso'
    }
  },
  watch: {
    dialog (val) {
      val || this.close()
    }
  },
  mounted () {
    this.initializeGraduations()
  },
  methods: {
    initializeGraduations () {
      GraduationService.readAll()
        .then((graduations) => {

          graduations.data.map(grad => {
            const newGraduation = Object.assign({}, 
                { _id: grad._id, name: grad.name, department: grad.deps[0].name })
            this.graduations.push(newGraduation)
          })
          this.initializeDepartments()
        })
    },
    initializeDepartments () {
      DepartmentService.readAll()
        .then((departments) => {
          this.departments = departments.data
          console.log(this.departments)
          departments.data.map(dep => {
            this.departmentNames.push(dep.name)
          })
        })
    },
    editItem (item) {
      this.editedIndex = this.graduations.indexOf(item)
      this.editedItem = Object.assign({}, item)
      this.dialog = true
    },
    deleteItem (item) {
      const index = this.graduations.indexOf(item)
      const userResponse = confirm('Are you sure you want to delete this item?')
      if (userResponse) {
        GraduationService.delete(item).then((res) => {
          alert(res.data.message)
          this.graduations.splice(index, 1)
        })
        .catch((err) => {
          // implemente uma mensagem de erro ao usuário
        })
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
        GraduationService.updatingDegree(this.editedItem._id, this.editedItem)
          .then((res) => {
            if (res.data.ok == 1) {
              alert('atualizado com sucesso')
            }
          })
        Object.assign(this.graduations[this.editedIndex], this.editedItem)
      } else {
        this.replaceNameToId()
        GraduationService.save(this.editedItem).then((graduation) => {
          this.alertSuccess()
          this.graduations = []
          this.initializeGraduations()
        })
        .catch((err) => {
          this.alertDenied()

        })
      }
      this.close()
    },
    replaceNameToId () {
      const department = this.departments.filter((dep) => 
          dep.name === this.editedItem.department)
      this.editedItem.department = department[0]._id
    },
    alertSuccess () {
      this.success = true;
      setTimeout(() => {
        this.success = !this.success
      }, 4000)
    },
    alertDenied () {
      this.denied = true;
      setTimeout(() => {
        this.denied = !this.denied
      }, 4000)
    },
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
