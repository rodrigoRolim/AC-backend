
<template>
  <v-layout row justify-center>
    <v-dialog v-model="dialog" persistent max-width="500px">
      <template v-slot:activator="{ on }">
         <v-icon
          color="#455A64"
          dark
          large
          v-on="on"
          >
         add_comment
         </v-icon>
      </template>
      <v-card>
        <v-card-title>
          <span class="headline">Motivos</span>
        </v-card-title>
        <v-card-text>
          <v-container grid-list-md>
            <v-layout wrap>
              <v-flex >
                <v-textarea
                  outline
                  name="input-7-4"
                  label="escreva os motivos de não aprovar"
                  v-model="comments"
                ></v-textarea>
               </v-flex>
            </v-layout>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" flat @click="dialog = false">fechar</v-btn>
          <v-btn color="blue darken-1" flat @click="sendComment">ok</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-layout>
</template>
<script>
export default {
  name: "ProfessorFeedback",
  data () {
    return {
      dialog: false,
      comments: ''
    }
  },
  methods: {
    sendComment () {
      console.log(this.comments)
      this.$emit('feedback', this.comments)
      this.dialog = false
    }
  }
}
</script>

<style scoped>
.v-btn {
  min-width: 5%;
}
</style>