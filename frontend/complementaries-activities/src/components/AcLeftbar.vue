<template>
  <div id="ac-leftbar">
    <ac-perfil></ac-perfil>
  </div>
</template>

<script>
import AcPerfil from './AcPerfil'
export default {
  name: 'AcLeftBar',
  components: { AcPerfil }
}
</script>

<style scoped>
#ac-leftbar {
  border-right: 1px solid rgba(0, 0, 0, 0.2);
  width: 20%;
  height: 81vh;
}
</style>
