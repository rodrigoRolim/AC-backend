<template>
  <div id="app">
    <admin-login></admin-login>  
  </div>
</template>

<script>
  import AdminLogin from './components/AdminLogin'
  export default {
    name: 'App',
    components: { AdminLogin },
    data () {
      return {
        
      }
    }
  }
</script>

<style scoped>

</style>
