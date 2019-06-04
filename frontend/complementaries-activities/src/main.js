// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import App from './App'
import router from './router'
import store from './store/root'
import Vuetify from 'vuetify'
import AdminGraduation from '@/components/professor/AdminGraduation'
import ProfessorLogin from '@/components/professor/ProfessorLogin'
import ProfessorHome from '@/components/professor/ProfessorHome'
import 'font-awesome/css/font-awesome.min.css'
import 'vuetify/dist/vuetify.min.css'

Vue.config.productionTip = false
Vue.use(Vuetify, {
  iconfont: 'fa1'
})

/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  store,
  components: { App, AdminGraduation, ProfessorLogin, ProfessorHome  },
  template: '<App/>'
})
