<template>
  <v-app id="ManagerProfessor">
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
              color="primary"
              depressed
              dark
              v-on="on"
            >
              recursos <v-icon dark class="ml-2">build</v-icon>
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
      <v-toolbar flat color="white" >
        <v-toolbar-title>Lista de professores</v-toolbar-title>
        <v-divider
          class="mx-2"
          inset
          vertical
        ></v-divider>
        <v-spacer></v-spacer>
        <v-dialog v-model="dialog" max-width="600px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" depressed dark class="mb-2" v-on="on">Novo professor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">Novo professor</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12 sm12>
                    <v-text-field v-model="editedItem.name" label="Nome do professor"></v-text-field>
                  </v-flex>
                  <v-flex md12 sm12>
                    <v-text-field v-model="editedItem.siape" label="Siape"></v-text-field>
                  </v-flex>
                  <v-flex md12 sm12>
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-flex>
                   <v-flex md12 sm12>
                     <v-select
                      :items="departmentNames"
                      label="departamento responsável*"
                      v-model="selectedName"
                      required
                     ></v-select>
                  </v-flex>
                   <v-flex md12 sm12>
                    <v-text-field type="password" v-model="editedItem.password" label="Senha"></v-text-field>
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
      <v-card>
        <v-card-title>
            Professores
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
        :items="professors"
        class="elevation-1"
         >
        <template v-slot:items="props">
          <td class="name">{{ props.item.name }}</td>
          <td class="text-md-left">{{ props.item.email }}</td>
          <td class="text-md-left">{{ props.item.department }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
          </td>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="initialize">Reset</v-btn>
        </template>
         <template v-slot:no-results  >
          <v-alert :value="true" color="error" icon="warning">
            Sua pesquisa para "{{ search }}" não obteve resultados.
          </v-alert>
        </template>
        <template v-slot:no-data>
          <v-alert :value="true" color="error" icon="warning">
            nenhum professor cadastrado
          </v-alert>
        </template>
        </v-data-table>
      </v-card>
    </v-layout>
  </v-app>
</template>


<script>
import DepartmentService from '@/services/Department.js'
import ProfessorService from '@/services/Professor.js'
import MaskLoad from '../MaskLoad'
import AcNavbar from '../AcNavbar'
  export default {
    components: { AcNavbar, MaskLoad },
    data: () => ({
      showMask: false,
      selectedName: '',
      dialog: false,
      search: '',
      message: '',
      typeAlert: 'error',
      showAlert: false,
      headers: [
        {
          text: 'nome (professor responsável)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'email', value: 'email', sortable: false, align: 'left' },
        { text: 'departamento (responsável)', value: 'curso', sortable: false, align: 'left' },
        { text: 'Actions', value: 'name', sortable: false, align: 'left' }
      ],
      departments: [],
      departmentNames: [],
      professors: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        siape: '',
        department: '',
        password: ''
      },
      defaultItem: {
        name: '',
        email: '',
        siape: '',
        department: '',
        password: ''
      }
    }),

    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo professor' : 'Editar professor'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },

    created () {
      this.showMask = true
      this.initializeDepartments()
    },

    methods: {
      logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.replace('/professor')
      },
      initializeDepartments () {
        DepartmentService.readAll()
          .then((res) => res.data)
          .then((departments) => this.setDepartments(departments))
          .then(() => this.initializeProfessors())
          .catch((err) => this.getAlert('desculpas, houve um error'))
      },
      initializeProfessors () {
        ProfessorService.readAll()
          .then((res) => res.data)
          .then((professors) => this.replaceIdAllToName(professors))
          .then((professors) => this.professors = professors)
          .then(() => setTimeout(() => { this.showMask = false }, 1000))
          .catch((err) => this.getAlert('error', 'error ao inicilizar lista de professores'))
      },
      
      setDepartments (departments) {
        this.departments = departments
        if (departments.length > 0) {
          departments.map(dep => {
            this.departmentNames.push(dep.name)
          })
        }
      },
      editItem (item) {
        this.editedIndex = this.professors.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.professors.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.professors.splice(index, 1)
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },

      save () {
        this.editedItem.department = this.selectedName
        if (this.editedIndex > -1) {
          this.replaceNameToId()
          const professorUpdate = { 
            name: this.editedItem.name,
            email: this.editedItem.email,
            password: this.editedItem.password,                        
            department: this.editedItem.department,
            password: this.editedItem.password
          }
          ProfessorService.update(this.editedItem._id, professorUpdate)
            .then((res) => this.getAlert('success', 'atualizado com sucesso'))
            .then(() => this.replaceIdToName(this.editedItem))
            .then((professor) => Object.assign(this.professors[this.editedIndex], professor))
            .catch((err) => this.getAlert('error', 'ocorreu um error'))
          
        } else {
          this.replaceNameToId()
          ProfessorService.save(this.editedItem)
            .then((res) => res.data)
            .then((professors) => this.professors.push(this.replaceIdAllToName([professors])[0]))
            .then(() => this.getAlert('success', 'salvo com sucesso'))
            .catch((err) => {
              this.getAlert('error', err.response.data)
            })
        }
        this.close()
      },
      replaceNameToId () {
        if (this.departments.length > 0) {
          const department = this.departments.filter((dep) => 
            dep.name === this.editedItem.department)
          this.editedItem.department = department[0]._id
        }
      },
      replaceIdToName (professor) {
        const department = this.departments.filter((dep) => dep._id == professor.department)[0]
        professor.department = department.name
        return professor
      },
      replaceIdAllToName (professors) {

        console.log(professors)
        let newProfessors = []
        //if (typeof professors.department != 'undefined') {
           console.log('veio aqui')
           professors.map((professor) => {
             console.log(professor)
             console.log(this.departments)
             if (typeof professor.department != 'undefined') {
              const department = this.departments.filter((dep) => dep._id == professor.department)
              console.log(department)
              professor.department = department[0].name
             }

            newProfessors.push(professor)
          })
        //}
       console.log(newProfessors)
        
        return newProfessors
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

<style  scoped>

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
</style>