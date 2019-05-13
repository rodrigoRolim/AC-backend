<template>
  <v-app id="AdminHome">
    <ac-navbar>
    <v-btn class="success" to="/admin/professor">professores</v-btn>
      <v-btn class="error" @click="logout()">
        sair
        <i class="material-icons">exit_to_app</i>
      </v-btn>

    </ac-navbar>
    <div class="middle">
      <ac-main></ac-main>
      <ac-rightbar></ac-rightbar>
    </div>
    <ac-footer></ac-footer>
    <router-view></router-view>
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
#AdminHome {
  display: flex;
  flex-direction: column;
  background-color: rgba(0,0,0, 0.001)
}
.middle {
  display: flex;
  flex-direction: row;
  margin: 0 auto;
  width: 80%;
}
</style>
