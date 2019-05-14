<template>
  <v-app>
  <ac-navbar>
    <v-toolbar-items>
      <v-btn flat to="/admin/home">home</v-btn>
      <v-btn flat to="/admin/professor">professores</v-btn>
      <v-btn flat to="/admin/grupo">grupos</v-btn>
      <v-btn color="error" @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
    </v-toolbar-items>

    </ac-navbar>
    <v-layout class="table">
    <v-toolbar flat color="white">
      <v-toolbar-title>Lista de grupos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-dialog v-model="dialog" max-width="500px">
          <template v-slot:activator="{ on }">
            <v-btn color="secondary" depressed dark class="mb-2" v-on="on">Novo grupo</v-btn>
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
    <v-card>
      <v-card-title>
        Grupos
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
      :items="groups"
      :expand="expand"
      item-key="name"
      >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-left">{{ props.item.scoreMin }}</td>
          <td class="text-xs-left">{{ props.item.scoreMax }}</td>
          <td class="text-xs-left">{{ props.item.nItems }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
            <v-icon
              small
              class="mr-2"
              @click="deleteItem(props.item)"
            >
              delete
            </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat v-for="arr in props.item.array" :key="arr">
          <v-card-text>{{arr}}</v-card-text>
        </v-card>
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
import AcNavbar from '../AcNavbar'
  export default {
    components: { AcNavbar },
    data () {
      return {
        expand: false,
        dialog: false,
        editedIndex: -1,
        editedItem: {
          name: '',
          email: '',
          graduation: '',
          _id: ''
        },
        defaultItem: {
          name: '',
          email: '',
          graduation: '',
          _id: ''
        },
        headers: [
          {
            text: 'Grupo (atividades complementares)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'pontuação mínima', value: 'minimo', align: 'left' },
          { text: 'pontuação máxima', value: 'maximo', align: 'left' },
          { text: 'itens (nº)', value: 'items', align: 'left' },
          {text: 'Actions', value: 'name', sortable: false, align: 'center' }
        ],
        groups: [
          {
            name: 'Grupo 1',
            scoreMin: 20,
            scoreMax: 30,
            nItems: 24,
            array: [1,2,3,4,5]
          },
          {
            name: 'Grupo 2',
            scoreMin: 20,
            scoreMax: 40,
            nItems: 24,
            array: [1,2,3,4,5]
          },
          {
            name: 'Grupo 3',
            scoreMin: 20,
            scoreMax: 30,
            nItems: 24,
            array: [1,2,3,4,5]
          }
        ]
      }
    },
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
    methods: {
      logout () {
        localStorage.removeItem('user')
        this.$router.replace('/admin')
      },
      editItem (item) {
        this.editedIndex = this.groups.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const index = this.groups.indexOf(item)
        confirm('Are you sure you want to delete this item?') && this.groups.splice(index, 1)
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
          const professorUpdate = { name: this.editedItem.name, email: this.editedItem.email}
          AdminService.updatingProfessorResponsible(this.editedItem._id, professorUpdate)
            .then((res) => {
              console.log(res)
              if (res.data == 'OK') {
                alert('atualizado com sucesso')
              }
            })
          Object.assign(this.groups[this.editedIndex], this.editedItem)
        } else {
          AdminService.addProfessor(this.editedItem).
            then((res) => {
              this.groups.push(res.data)
              alert('cadastrado com sucesso')
            })
        }
        this.close()
      }
    }
  }
</script>
<style>
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