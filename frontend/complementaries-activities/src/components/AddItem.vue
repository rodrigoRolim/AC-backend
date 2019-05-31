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
  name: 'AddItem',
  props: ['group'],
  data () {
    return {
      dialog: false,
      item: {
        description: ''
      }
    }
  },
  methods: {
    save () {
      GroupService.addItemInGroup(this.group._id, this.item)
        .then((res) => {
          console.log(res)
          if (res.status == 201) {
            alert('item adicionado')
            this.$emit('refresh', true)
          }
        })
      this.dialog = false
    },
    updatingProfessor (professor, degId, profId) {
      professor.graduation = degId
      GroupService.updatingProfessorResponsible(profId, professor)
        .then((res) => {
          console.log(res)
        })
    }
  
  }
}
</script>

<style scoped>

</style>