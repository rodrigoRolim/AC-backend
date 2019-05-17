<template>
  <v-toolbar>
    <v-btn  icon to="/"><v-icon class="icon" x-large>access_time</v-icon> </v-btn> 
    <v-spacer></v-spacer>
    <slot></slot>
  </v-toolbar>
</template>

<script>
export default {
  name: 'AcNavbar',
  data () {
    return {
    }
  }
}
</script>

<style scoped>

</style>
