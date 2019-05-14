<template>
  <v-app id="AdminHome">
    <ac-navbar>
    <v-toolbar-items>
      <v-btn flat to="/admin/home">home</v-btn>
      <v-btn flat to="/admin/professor">professores</v-btn>
      <v-btn flat to="/admin/grupo">grupos</v-btn>
      <v-btn color="error"  @click="logout()">sair<i class="material-icons">exit_to_app</i></v-btn>
    </v-toolbar-items>

    </ac-navbar>
    <div class="middle">
      <ac-main></ac-main>
    </div>
    <router-view></router-view>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import AcMain from '../AcMain'

export default {
  name: 'AdminHome',
  components: { AcNavbar, AcMain },
  data () {
    return {
      show: false
    }
  },
  methods: {
    logout () {
      localStorage.removeItem('user')
      this.$router.replace('/admin')
    }
  }
}
</script>

<style scoped>
#AdminHome {
  display: flex;
  flex-direction: column;
 
}
.middle {
  display: flex;
  flex-direction: row;
  margin: 10px auto;
  width: 100%;
}
</style>
