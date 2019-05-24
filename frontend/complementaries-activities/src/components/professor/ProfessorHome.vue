<template>
  <v-app>
  <ac-navbar>
    <v-toolbar-items>
      <v-btn flat to="/admin/cursos">cursos</v-btn>
      <v-btn flat to="/admin/departamentos">departamentos</v-btn>
      <v-btn flat to="/admin/professores">professores</v-btn>
      <v-btn flat to="/admin/grupos">grupos</v-btn>
      <v-btn flat to="/professor/home">alunos</v-btn>
      <v-btn color="error"  @click="">sair<i class="material-icons">exit_to_app</i></v-btn>
    </v-toolbar-items>
    </ac-navbar>
    <!--<v-layout column>
      <v-progress-circular
      :rotate="360"
      :size="130"
      :width="15"
      :value="value"
      color="red"
      >
      {{ value }} %
      </v-progress-circular>
      <span>grupo 1</span>
    </v-layout>-->
  </v-app>

</template>

<script>
import AcNavbar from '../AcNavbar'
export default {
  name: 'ProfessorHome',
  components: { AcNavbar }
  
}
</script>

<style scoped>

</style>