import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import Users from './modules/users/root'
import Degrees from './modules/degrees/root'

Vue.use(Vuex)

export default new Vuex.Store({
  state: state,
  modules: {
    Users,
    Degrees
  }
})
