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
                    <v-text-field v-model="editedItem.name" label="Nome do grupo"></v-text-field>
                  </v-flex>
                   <v-flex md12>
                    <v-text-field v-model="editedItem.description" label="Descrição do grupo"></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-text-field type="number"  v-model="editedItem.scoreMin" label="Pontuação mínima"></v-text-field>
                  </v-flex>
                  <v-flex md12>
                    <v-text-field type="number" v-model="editedItem.scoreMax" label="Pontuação máxima"></v-text-field>
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
          <td class="text-xs-left">{{ props.item.description }}</td>
          <td class="justify-center layout px-3">
            <add-item @refresh="reloadTable" :group="props.item"></add-item>
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
        <v-card flat v-for="item in props.item.items" :key="item._id">
          <v-card-text class="item"><span class="format-text">{{item.description}}</span>
            <edit-item  :item="item" :idGroup="props.item._id" class="edit mr-2" small></edit-item>
            <v-icon class="mr-2" small dark color="secondary" @click="removeItem(props.item, item)">delete</v-icon>
          </v-card-text>
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
import AddItem from '../AddItem'
import EditItem from '../EditItem'
import GroupService from '@/services/Group.js'
  export default {
    components: { AcNavbar, AddItem, EditItem },
    data () {
      return {
        expand: false,
        dialog: false,
        editedIndex: -1,
        search: '',
        editedItem: {
          name: '',
          description: '',
          scoreMin: 0,
          scoreMax: 0,
          items: []
        },
        defaultItem: {
          name: '',
          description: '',
          scoreMin: 0,
          scoreMax: 0,
          items: []
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
          { text: 'description', value: 'description', align: 'left' },
          {text: 'Actions', value: 'name', sortable: false, align: 'center' }
        ],
        groups: []
      }
    },
    created () {
      this.initializeGroup()
    },
    computed: {
      formTitle () {
        return this.editedIndex === -1 ? 'Novo grupo' : 'Editar grupo'
      }
    },

    watch: {
      dialog (val) {
        val || this.close()
      }
    },
    methods: {
      reloadTable (value) {
        this.initializeGroup()
      },
      initializeGroup () {
        GroupService.readAll()
          .then((res) => {
            this.groups = res.data
          })
      },
      logout () {
        localStorage.removeItem('token')
        localStorage.removeItem('user')
        this.$router.replace('/professor')
      },
      editItem (item) {
        this.editedIndex = this.groups.indexOf(item)
        this.editedItem = Object.assign({}, item)
        this.dialog = true
      },

      deleteItem (item) {
        const response = confirm('Are you sure you want to delete this item?')
        if (response) {
          GroupService.deleteGroup(item._id)
          .then((res) => {
            if (res.status == 204) {
              const index = this.groups.indexOf(item)
              this.groups.splice(index, 1)
            }
          })
        }
     
      },

      close () {
        this.dialog = false
        setTimeout(() => {
          this.editedItem = Object.assign({}, this.defaultItem)
          this.editedIndex = -1
        }, 300)
      },
      removeItem (group, item) {
        const userResponse = confirm('Are you sure you want to delete this item?')
        if (userResponse) {
           GroupService.removeItem(group._id, item)
            .then((res) => {
              if (res.status == 204) {
                const indexGroup = this.groups.indexOf(group)
                const indexItem = this.groups[indexGroup].items.indexOf(item)
                this.groups[indexGroup].items.splice(indexItem, 1)
              }
            })
        }
       
      },
      save () {
        if (this.editedIndex > -1) {
          
          GroupService.updatingGroup(this.editedItem._id, this.editItem)
            .then((res) => {
              console.log(res)
              if (res.data == 'OK') {
                alert('atualizado com sucesso')
                Object.assign(this.groups[this.editedIndex], this.editedItem)
              }
            })
          
        } else {
          GroupService.addGroup(this.editedItem).
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
.item {
  width: 100%;
  display: flex;
  flex-direction: row;
  justify-content: flex-end;
  word-break: break-all;  
}
.format-text {

  width: 50%;
}
</style>