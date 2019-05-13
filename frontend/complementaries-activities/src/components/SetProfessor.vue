<template>
  <div>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="blue-grey" small dark v-on="on">Professor</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-select
                  :items="professors"
                  label="Age*"
                  required
                ></v-select>
              </v-flex>
            </v-layout>
          </v-container>
          <small>*indicates required field</small>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">Close</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog = false">Save</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
    </v-layout>
  
  </div>
</template>

<script>
import AdminService from '@/services/Admin.js'
export default {
  name: 'AddProfessor',
  data () {
    return {
      dialog: false,
      professors: []
    }
  },
  created () {
    AdminService.readAllProfessors()
      .then(professors => {
        professors.data.map(item => {
          this.professors.push(item.name)
        })
      })
  },
}
</script>

<style scoped>

</style>