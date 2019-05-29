<template>
  <v-app id="ManagerProfessor">
    <ac-navbar>
    <v-toolbar-items>
      <v-btn flat to="/professor/home">cursos</v-btn>
      <v-btn flat to="/admin/departamentos">departamentos</v-btn>
      <v-btn flat to="/admin/professores">professores</v-btn>
      <v-btn flat to="/admin/grupos">grupos</v-btn>
      <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
    </v-toolbar-items>
      </v-btn>
      
    </ac-navbar>
    <v-layout class="table">
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
            nenhum grupo cadastrado
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
import AcNavbar from '../AcNavbar'
  export default {
    components: { AcNavbar },
    data: () => ({
      selectedName: '',
      dialog: false,
      search: '',
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
      departaments: [],
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
          .then((departments) => {
            this.departments = departments.data
            departments.data.map(dep => {
              this.departmentNames.push(dep.name)
            })
          })
          .then(() => {
            this.initializeProfessors()
          })
      },
      initializeProfessors () {
        ProfessorService.readAll()
          .then((professors) => {
            console.log(professors)
            this.professors = this.replaceIdToName(professors.data)
          })
          .catch((err) => {
            console.log('errroooouu')
            // implementar mesagem de erro, sem graça
          })
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
          const professorUpdate = { name: this.editedItem.name, email: this.editedItem.email, 
                                    professor: this.editedItem.professor}
          ProfessorService.updateResponsible(this.editedItem._id, professorUpdate)
            .then((res) => {
              console.log(res)
              if (res.data == 'OK') {
                alert('atualizado com sucesso')
              }
            })
          Object.assign(this.professors[this.editedIndex], this.editedItem)
        } else {
          this.replaceNameToId()
          console.log(this.editedItem)
           ProfessorService.save(this.editedItem).
            then((res) => {
              alert('cadastrado com sucesso')
              this.professors.push(this.replaceIdToName([res.data])[0])
            })
            .catch((err) => {
              console.log(err)
              // implementar messagem de erro
            })
        }
        this.close()
      },
      replaceNameToId () {
        const department = this.departments.filter((dep) => 
            dep.name === this.editedItem.department)
        this.editedItem.department = department[0]._id
      },
      replaceIdToName (professors) {
        let newProfessors = []
        professors.map((professor) => {
          
          const department = this.departments.filter((dep) => 
            dep._id === professor.department)
          professor.department = department[0].name

          newProfessors.push(professor)

        })
        
        return newProfessors
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
  width: 75%;
  margin: 0 auto;
  height: 70vh;
}

</style>