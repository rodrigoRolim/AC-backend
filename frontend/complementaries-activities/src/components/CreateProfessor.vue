<template>
  <div>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="600px">
      <template v-slot:activator="{ on }">
        <v-btn color="success" flat dark v-on="on">Novo Professor</v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">User Profile</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex md12>
                <v-text-field
                v-model="professor.name"
                label="Nome do professor*"
                required
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                v-model="professor.email"
                label="Email*"
                required
                ></v-text-field>
              </v-flex>
              <v-flex md12>
                <v-text-field
                v-model="professor.password"
                label="Senha*"
                required
                ></v-text-field>
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
  </div>
</template>

<script>
import Admin from '@/services/Admin.js'
export default {
  data () {
    return {
      dialog: false,
      professor: {
        name: '',
        email: '',
        password: ''
      }
    }
  },
  methods: {
    save () {
      Admin.addProfessor(this.professor)
        .then((res) => {
          console.log(res)
        })
      this.dialog = false
    }
  }
}
</script>

<style scoped>

</style>