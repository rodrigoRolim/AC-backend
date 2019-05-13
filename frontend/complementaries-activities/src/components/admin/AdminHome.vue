<template>
  <v-app id="AdminHome">
    <ac-navbar>
      <button @click="logout()">
        <span class="rot-logout">logout</span>
        <i class="material-icons">exit_to_app</i>
      </button>
    </ac-navbar>
    <div class="middle">
      <ac-leftbar></ac-leftbar>
      <ac-main></ac-main>
      <ac-rightbar></ac-rightbar>
    </div>
    <ac-footer></ac-footer>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import AcLeftbar from '../AcLeftbar'
import AcRightbar from '../AcRightbar'
import AcMain from '../AcMain'
import AcFooter from '../AcFooter'

export default {
  name: 'AdminHome',
  components: { AcNavbar, AcLeftbar, AcRightbar, AcMain, AcFooter },
  data () {
    return {
      show: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      // localStorage.removeItem('admin_token')
      this.$router.replace('/admin/login')
    }
  }
}
</script>

<style scoped>
* {
  margin: 0;
  padding: 0;
  box-sizing: border-box
}
#AdminHome {
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0, 0.001)
}
.middle {
  display: flex;
  flex-direction: row;
}
</style>
