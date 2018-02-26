import Vue from 'vue'
import Vuex from 'vuex'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    user: {
      id: '',
      name: '',
      email: ''
    }
  },
  getters: {
    userId: state => state.user.id,
    username: state => state.user.email,
    isAuthorized: state => state.loggedIn
  }
})
