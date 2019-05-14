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
            <v-btn color="primary" depressed dark class="mb-2" v-on="on">Novo professor</v-btn>
          </template>
          <v-card>
            <v-card-title>
              <span class="headline">{{ formTitle }}</span>
            </v-card-title>

            <v-card-text>
              <v-container grid-list-md>
                <v-layout wrap>
                  <v-flex md12>
                    <v-text-field v-model="editedItem.name" label="Nome do professor"></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-text-field v-model="editedItem.email" label="Email"></v-text-field>
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
      <v-data-table
        :headers="headers"
        :items="professors"
        class="elevation-1"
      >
        <template v-slot:items="props">
          <td class="name">{{ props.item.name }}</td>
          <td class="text-md-center">{{ props.item.email }}</td>
          <td class="text-md-center">{{ props.item.graduation }}</td>
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
      </v-data-table>
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
      headers: [
        {
          text: 'nome (professor responsável)',
          align: 'left',
          sortable: false,
          value: 'name'
        },
        { text: 'email', value: 'email', sortable: false, align: 'center' },
        { text: 'curso (responsável)', value: 'curso', sortable: false, align: 'center' },
        { text: 'Actions', value: 'name', sortable: false, align: 'center' }
      ],
      professors: [],
      graduations: [],
      editedIndex: -1,
      editedItem: {
        name: '',
        email: '',
        graduation: '',
      },
      defaultItem: {
        name: '',
        email: '',
        graduation: '',
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
      this.initialize()
    },

    methods: {
      getGraduations () {
        AdminService.readAllDegrees()
          .then(graduations => {
            this.graduations = graduations.data
          })
      },
      initialize () {
        AdminService.readAllProfessors()
          .then(professors => {
            professors.data.map((item) => {

              let graduationName = this.graduations
                .filter(graduation => graduation.professor === item._id)
              console.log(graduationName)
              let name = (typeof graduationName[0].name === undefined) ? '':  graduationName[0].name
              
              this.professors.push(Object.assign({}, 
                {name: item.name, email: item.email, graduation: name}))
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
          Object.assign(this.professors[this.editedIndex], this.editedItem)
        } else {
           AdminService.addProfessor(this.editedItem).
            then((res) => {
              this.professors.push(res.data)
              alert('cadastrado com sucesso')
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