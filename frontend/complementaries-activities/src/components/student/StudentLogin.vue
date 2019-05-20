<template>
  <v-app>
    <ac-navbar>
      <v-toolbar-items>
        <v-btn flat to="/admin">admin</v-btn>
        <v-btn flat to="/professor">professor</v-btn>
        <v-btn flat to="/aluno">aluno</v-btn>
      </v-toolbar-items>
    </ac-navbar>
    <div class="container-lg-ad">
      <form
        class="form-login"
        @submit.prevent="login"
        method="post"
        >
        <h3>Estudante</h3>
        <div class="form-row-name">
          <div class="input-label">
            <label for="username">registro acadêmico (RA)*</label>
            <input type="text" v-model="student.ra" id="username"/>
            </div>
        </div>
        <div class="form-row-password">
          <div class="input-label">
            <label for="password">senha</label>
            <input type="password" v-model="student.password" id="password"/>
          </div>
        </div>
        <div class="form-row">
          <div class="actions">
            <button type="submit">confirmar</button>
            <router-link type="button" class="register" to="/aluno/registrar">registrar</router-link>
          </div>
        </div>
    </form>
    </div>
  </v-app>
</template>

<script>
import AcNavbar from '../AcNavbar'
import router from '@/router/index'
import Admin from '@/services/Admin.js'
export default {
  name: 'AdminLogin',
  components: { AcNavbar },
  data () {
    return {
      student: {
        ra: '',
        password: ''
      }
    }
  },
  methods: {
    login () {
      Admin.loginAdmin(this.student).then(response => {
        if (response.data.auth) {
          localStorage.removeItem('user')
          localStorage.setItem('user', JSON.stringify(response.data))
          router.replace('/student/home')
        }
      })
    }
  }
}
</script>

<style scoped>
.container-lg-ad {
  background-color: rgba(0,0,0,0.005);
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: calc(30vh/2) 0;
  width: 100%;
}
.form-login {
  display: flex;
  flex-direction: column;
  align-content: space-around;
  background-color: white;
  box-sizing: border-box;
  width: 30%;
  border: 1px solid transparent;
  padding: 40px;
  box-shadow: 0px 2px 2px 0px rgba(0,0,0,0.5)
}
[class*="form-row"] {
  display: flex;
  flex-flow: row wrap;
  justify-content: space-between;
  width: 100%;
}

.form-row .actions {
  align-self: flex-end;
}
.actions {
  width: 100%;
  margin-top: 25px;
  display: flex;
  flex-direction: row;
  align-items: baseline;
  justify-content: flex-end;
}
.input-label {
  display: flex;
  flex-direction: column;
  margin: 10px 0;
  width: 50%;
}
.input-label {
  width: 100%;
}
input {
  border: 1px solid rgb(180, 179, 179);
  border-radius: 2px;
  padding: 10px 10px;
}
label {
  margin-bottom: 8px;
  font-weight: 400;
}
.actions button[type='submit'] {
  background-color:#3F69AA;
  color: white;
  border: 1px solid transparent;
  padding: 10px 18px;
  border-radius: 2px;
  cursor: pointer;
}
.register {
  background-color: #57C89B;
  color: white;
  border: 1px solid transparent;
  padding: 10px 18px;
  border-radius: 2px;
  cursor: pointer;
  margin-left: 10px;
  text-decoration: none
}
.signin {
  color: rgb(111, 191, 216);
  margin-right: 10px;
}
h3 {
  font-weight: 400;
  align-self: center;
  margin-top: 0;
  margin-bottom: 30px;
}
</style>
