<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" small dark depressed v-on="on"><v-icon small>add</v-icon> item</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Novo item</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-textarea label="Descrição do item" 
                :rules="validations"
                v-model="item.description"></v-textarea>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="save" :disabled="validated">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
  
</template>

<script>
import GroupService from '@/services/Group.js'
export default {
  name: 'AddItem',
  props: ['group'],
  data () {
    return {
      dialog: false,
      item: {
        description: ''
      },
      validations: [
        v => !!v || 'Campo obrigatório*'
      ] 
    }
  },
  methods: {
    save () {
      GroupService.addItemInGroup(this.group._id, this.item)
        .then((res) => this.$emit('refresh', true))
        .then(() => this.item.description = '')
        .catch((err) => this.$emit('refresh', false))
      this.dialog = false
    }  
  },
  computed: {
    validated () {
      return this.item.description == ''
    }
  }
}
</script>

<style scoped>

</style>