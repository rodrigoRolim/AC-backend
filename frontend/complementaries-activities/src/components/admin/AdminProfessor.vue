<template>
  <v-app id="ManagerProfessor">
    <ac-navbar>
    <v-toolbar-items>
      <v-btn flat to="/admin/home">home</v-btn>
      <v-btn flat to="/admin/professor">professores</v-btn>
      <v-btn flat to="/admin/grupo">grupos</v-btn>
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
        <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" depressed dark class="mb-2" v-on="on">Novo professor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12 sm12>
                    <v-text-field v-model="editedItem.name" label="Nome do professor"></v-text-field>
                  </v-flex>
                  <v-flex md12 sm12>
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
                  </v-flex>
                   <v-flex md12 sm12>
                    <v-text-field type="password" v-model="editedItem.password" label="Senha"></v-text-field>
                  </v-flex>
                  <v-checkbox
                  md12
                  v-model="editedItem.admin"
                  label="Admin"
                  ></v-checkbox>
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
          <td class="text-md-left">{{ props.item.graduation }}</td>
          <td class="text-md-left">
            <v-icon color="success" small class="mr-2">{{ props.item.admin ? 'lens': ''}}</v-icon>
          </td>
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
import AdminService from '@/services/Admin.js'
import AcNavbar from '../AcNavbar'
  export default {
    components: { AcNavbar },
    data: () => ({
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
        { text: 'curso (responsável)', value: 'curso', sortable: false, align: 'left' },
        { text: 'admin', value: 'admin', sortable: false, align: 'left'},
        { text: 'Actions', value: 'name', sortable: false, align: 'left' }
      ],
      professors: [],
      graduations: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        graduation: '',
        _id: '',
        password: '',
        admin: false
      },
      defaultItem: {
        name: '',
        email: '',
        graduation: '',
        _id: '',
        password: '',
        admin: false
      }
    }),

    computed: {
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
      this.getGraduations()
    },

    methods: {
      logout () {
        localStorage.removeItem('user')
        this.$router.replace('/admin')
      },
      getGraduations () {
        AdminService.readAllDegrees()
          .then(graduations => {
            this.graduations = graduations.data
          })
          .then(() => {
            this.initialize()
          })
      },
      initialize () {
        AdminService.readAllProfessors()
          .then(professors => {
            console.log(professors)
            professors.data.map((item) => {
              console.log(item)
              let graduationName = this.graduations
                .filter(graduation => graduation.professor === item._id)
              let name = (typeof graduationName[0] === 'undefined') ? '':  graduationName[0].name
              console.log(item.admin)
              this.professors.push(Object.assign({}, 
                {_id: item._id, name: item.name, email: item.email, graduation: name, admin: item.admin}))
            })
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
        if (this.editedIndex > -1) {
          const professorUpdate = { name: this.editedItem.name, email: this.editedItem.email, 
                                    admin: this.editedItem.admin}
          AdminService.updatingProfessorResponsible(this.editedItem._id, professorUpdate)
            .then((res) => {
              console.log(res)
              if (res.data == 'OK') {
                alert('atualizado com sucesso')
              }
            })
          Object.assign(this.professors[this.editedIndex], this.editedItem)
        } else {
          console.log(this.editedItem)
           AdminService.addProfessor(this.editedItem).
            then((res) => {
              alert('cadastrado com sucesso')
              this.professors.push(res.data)
            })
            .catch((err) => {
              alert('nomes duplicados')
            })
        }
        this.close()
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