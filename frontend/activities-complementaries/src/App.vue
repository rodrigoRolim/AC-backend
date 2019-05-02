<template>
  <div id="app">
    <admin-login></admin-login>
  </div>
</template>

<script>
import AdminLogin from './Autentication/AdminLogin.vue'
export default {
  name: 'app',
  components: {AdminLogin},
  data: () => {
    return {
      msg: 'Welcome to Your Vue.js App'
    }
  }
}
</script>

<style lang="scss" scoped>
  body {
   font-family: -apple-system,BlinkMacSystemFont,"Segoe UI",Helvetica,Arial,sans-serif,"Apple Color Emoji","Segoe UI Emoji","Segoe UI Symbol";
   font-size: 100%;
   margin: 0;
  }
</style>
