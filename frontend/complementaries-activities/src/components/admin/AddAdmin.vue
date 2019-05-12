<template>
  <div class="container-lg-ad">
    <form
      class="form-login"
      @submit.prevent="login"
      method="post"
      >
      <h3>Administrador</h3>
      <div class="form-row-name">
        <div class="input-label">
          <label for="username">nome de usuário</label>
          <input type="text" v-model="admin.username" id="username"/>
          </div>
      </div>
      <div class="form-row-password">
        <div class="input-label">
          <label for="password">senha</label>
          <input type="password" v-model="admin.password" id="password"/>
        </div>
      </div>
      <div class="form-row">
        <div class="actions">
          <button type="submit">confirmar</button>
        </div>
      </div>
   </form>

<script>
import router from '@/router/index'
import Admin from '@/services/Admin.js'
export default {
  name: 'AddAdmin',
  data () {
    return {
      admin: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    createAdmin () {
      Admin.addAdmin(this.admin).then(response => {
        if (response.data.auth) {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(response.data))
          router.replace('/admin/login')
        }
      })
    }
  }
}
</script>

<style scoped>

</style>
