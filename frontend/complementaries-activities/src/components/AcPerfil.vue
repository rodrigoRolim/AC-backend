<template>
  <v-card class="v-card">
  <v-container fluid>
    <v-layout justify-space-around>
      <v-flex xs5 sm12>
        <v-layout column>
        
          <img src="../assets/rodrigo.jpg" height="125">
        </v-layout>
        <div class="title mb-1">
          Eduardo damasceno
        </div>
        <div class="actions">
          <v-btn flat color="success">Adcionar</v-btn>
          <v-btn flat color="warning">Substituir</v-btn>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
  </v-card>
</template>

<script>
export default {
  name: 'AcPerfil',
  data () {
    return {

    }
  }
}
</script>

<style scoped>
.actions {
  margin-top: 30px;
  display: flex;
  flex-direction: row;
  justify-content: center
}
.title {
  margin-top: 10px;
}
.v-card {
  height: 81vh;
}
</style>
