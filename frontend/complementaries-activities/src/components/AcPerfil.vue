<template>
  <v-container fluid>
    <v-layout justify-space-around>
      <v-flex xs5 sm12>
        <v-layout column>
          <v-img src="https://picsum.photos/510/300?random" aspect-ratio="1.7"></v-img>
        </v-layout>
        <div class="title mb-1">
          Eduardo damasceno
        </div>
        <div class="actions">
          <v-btn color="success">Adcionar</v-btn>
          <v-btn color="warning">Substituir</v-btn>
        </div>
      </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
export default {
  name: 'AcPerfil'
}
</script>

<style scoped>
.actions {
  display: flex;
  flex-direction: row;
  justify-content: center
}
</style>