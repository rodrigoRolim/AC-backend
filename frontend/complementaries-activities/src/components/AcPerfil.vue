<template>
  <v-card class="v-card">
  <v-container fluid>
    <v-layout justify-space-around>
      <v-flex xs5 sm12>
        <v-layout column class="perfil">
        
          
        </v-layout>
        <div class="title mb-1">
          Nome do professor
        </div>
        <div class="mb-6">
          <strong>email: </strong> email do professor
        </div>
        <div class="actions">
          <v-btn color="primary">Adcionar</v-btn>
          <v-btn color="warning">Substituir</v-btn>
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
  height: 80vh;
}
.perfil {
  border: 1px solid;
  border-radius: 4px;
  height: 35vh;
  width: 100%;
}
</style>
