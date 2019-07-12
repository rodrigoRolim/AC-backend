<template>
  <div class="text-xs-center">
    <v-dialog
      v-model="dialog"
      width="500"
    >
      <template v-slot:activator="{ on }">
        <v-icon
          color="#37474F"
          dark
          v-on="on"
        >
          chat
        </v-icon>
      </template>

      <v-card>
        <v-card-title
          class="headline grey lighten-2"
          primary-title
        >
          Motivos segundo o seu professor
        </v-card-title>

        <v-card-text>
          {{ feedback }}
        </v-card-text>

        <v-divider></v-divider>

        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="primary"
            flat
            @click="dialog = false"
          >
           ok
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  name: 'commments',
  props: ['feedback'],
  data () {
    return {
      dialog: false
    }
  }
}
</script>

<style scoped>

</style>