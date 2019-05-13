<template>
  <div id="ac-leftbar">
    <create-professor></create-professor>
    <ac-perfil v-for="professor in professors" :oneProfessor="professor"></ac-perfil>
  </div>
</template>

<script>
import AcPerfil from './AcPerfil'
import CreateProfessor from './CreateProfessor.vue'
export default {
  name: 'AcLeftBar',
  components: { AcPerfil, CreateProfessor },
  data () {
    return {
      professors: [{
        name: 'nome do professor',
        email: 'email do professor',
      }]
    }
  }
}
</script>

<style scoped>
#ac-leftbar {
  display: flex;
  flex-direction: column;
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  width: 25%;
  height: 81vh;
}
</style>
