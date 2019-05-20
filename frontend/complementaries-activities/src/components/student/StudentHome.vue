<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin/home">Home</v-btn>
        <v-btn flat color="blue-grey" to="/aluno/documento/add">
        documento <v-icon right dark>cloud_upload</v-icon>
        </v-btn>
        <v-btn color="error"  @click="">sair<i class="material-icons">exit_to_app</i></v-btn>
      </v-toolbar-items>
      </ac-navbar>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
export default {
  name: 'StudentHome',
  components: { AcNavbar }
}
</script>

<style scoped>

</style>