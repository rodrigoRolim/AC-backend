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
      <v-toolbar-title>Lista de grupos</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn color="primary" dark @click="expand = !expand">
        {{ expand ? 'Close' : 'Keep' }} other rows
      </v-btn>
    </v-toolbar>
    <v-data-table
      :headers="headers"
      :items="desserts"
      :expand="expand"
      item-key="name"
    >
      <template v-slot:items="props">
        <tr @click="props.expanded = !props.expanded">
          <td>{{ props.item.name }}</td>
          <td class="text-xs-right">{{ props.item.calories }}</td>
          <td class="text-xs-right">{{ props.item.fat }}</td>
          <td class="text-xs-right">{{ props.item.carbs }}</td>
          <td class="justify-center layout px-0">
            <v-icon
              small
              class="mr-2"
              @click="editItem(props.item)"
            >
              edit
            </v-icon>
          </td>
        </tr>
      </template>
      <template v-slot:expand="props">
        <v-card flat v-for="arr in props.item.array">
          <v-card-text>{{arr}}</v-card-text>
        </v-card>
      </template>
    </v-data-table>
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
        headers: [
          {
            text: 'Grupo (atividades complementares)',
            align: 'left',
            sortable: false,
            value: 'name'
          },
          { text: 'pontuação mínima', value: 'minimo' },
          { text: 'pontuação máxima', value: 'fat' },
          { text: 'itens (nº)', value: 'items' },
          {text: 'Actions', value: 'name', sortable: false, align: 'center' }
        ],
        desserts: [
          {
            name: 'Frozen Yogurt',
            calories: 159,
            fat: 6.0,
            carbs: 24,
            array: [1,2,3,4,5]
          },
          {
            name: 'Ice cream sandwich',
            calories: 237,
            fat: 9.0,
            carbs: 37,
            array: [1,3,4,5]
          },
          {
            name: 'Eclair',
            calories: 262,
            fat: 16.0,
            carbs: 23,
            array: [1,2,3,4]
          },
          {
            name: 'Cupcake',
            calories: 305,
            fat: 3.7,
            carbs: 67,
            array: [1,2,3,5]
          }
        ]
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