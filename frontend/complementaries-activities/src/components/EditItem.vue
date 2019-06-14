<template>

  <v-layout row justify-end>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-icon color="secondary" v-on="on" small>edit</v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Novo item</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-textarea label="Descrição do item" v-model="item.description"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  
</template>

<script>
import GroupService from '@/services/Group.js'
export default {
  name: 'EditItem',
  props: ['item', 'idGroup'],
  data () {
    return {
      dialog: false
    }
  },
  methods: {
    save () {
      GroupService.updatingItem(this.idGroup, this.item)
        .then((res) => {
          if (res.status == 201) {
            alert('item atualizado')
          }
        })
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>