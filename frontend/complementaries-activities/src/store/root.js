import Vue from 'vue'
import Vuex from 'vuex'
import state from './state'
import Users from './modules/users/root'
import Degrees from './modules/degrees/root'
import VuexPersist from 'vuex-persist'
import Scoreboard from './modules/scoreboard/root'

Vue.use(Vuex)

const vuexLocalstorage = new VuexPersist({
  key: 'vuex',
  storage: window.localStorage
})
export default new Vuex.Store({
  state: state,
  modules: {
    Users,
    Degrees,
    Scoreboard
  },
  plugins: [vuexLocalstorage.plugin]
})
