import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import Users from './modules/users/root'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  modules: {
    Users
  }
})
