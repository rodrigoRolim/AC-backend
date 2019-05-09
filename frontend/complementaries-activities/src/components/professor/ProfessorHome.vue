<template>
  <div>
    <v-layout column>
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
  </v-layout>
  </div>
</template>

<script>
export default {
  
}
</script>

<style scoped>

</style>