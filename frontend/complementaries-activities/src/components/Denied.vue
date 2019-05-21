<template>
  <v-app >
      <v-alert
      :value="true"
      type="info"
      >
      acesso negado.
    </v-alert>
    <div>
      <v-btn color="success" depressed dark to="/">voltar</v-btn>
    </div>
    
  </v-app>
</template>

<script>
export default {
  
}
</script>

<style scoped>
.container {
  width: 100%;
}
</style>