<template>
  <v-app>
    <div>
      <ac-navbar>
        <v-toolbar-items>
          <!--<v-btn flat to="/admin">admin</v-btn>-->
          <v-btn flat to="/professor">professor</v-btn>
          <v-btn flat to="/aluno">aluno</v-btn>
        </v-toolbar-items>
      </ac-navbar>
      <div class="home-img">
        <img src="../assets/horas-atividades-complementares.png">
      </div> 
    </div>

  </v-app>
</template>

<script>
import AcNavbar from './AcNavbar'
export default {
  name: 'Home',
  components: { AcNavbar },
  data () {
    return {
      user: JSON.parse(localStorage.getItem('user'))
    }
  },
  created () {
    console.log(this.user)
    switch(this.user.user_type) {
      case 'aluno':
        this.$router.replace('/aluno/home')
      case 'professor':
        this.$router.replace('/professor/home')
    }
  }
}
</script>

<style  scoped>
.home-img {
  display: flex;
  flex-direction: row;
  justify-content: center;
  margin: 95px 0;
  transform: scale(1.5);
}
</style>