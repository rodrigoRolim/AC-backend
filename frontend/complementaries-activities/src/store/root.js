import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

import state from './state'
import Users from './modules/users/root'

export default new Vuex.Store({
  state: state,
  modules: {
    Users
  }
})