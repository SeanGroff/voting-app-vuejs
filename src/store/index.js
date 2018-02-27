import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export const store = new Vuex.Store({
  state: {
    loggedIn: !!localStorage.getItem('token'),
    user: {
      id: '',
      name: '',
      email: ''
    },
    error: ''
  },
  getters: {
    userId: state => state.user.id,
    username: state => state.user.email,
    isAuthorized: state => state.loggedIn,
    errorMessage: state => state.error
  },
  mutations: {
    setCurrentUser: (state, payload) => {
      state.user = payload
    },
    setLoggedInUser: (state, payload) => {
      state.loggedIn = payload
    },
    setErrorMessage: (state, payload) => {
      state.error = payload
    }
  },
  actions: {
    updateCurrentUser: async (
      { commit },
      { name, email, password, confirmPassword }
    ) => {
      commit('setErrorMessage', '')

      try {
        const { data } = await axios.post('/signup', {
          name,
          email,
          password,
          confirmPassword
        })

        if (localStorage.getItem('token')) {
          localStorage.removeItem('token')
        }

        localStorage.setItem('token', data.token)

        commit('setCurrentUser', {
          id: data.uid,
          name: data.name,
          email: data.email
        })

        return { success: true }
      } catch (err) {
        const authError = err.response.data
          ? err.response.data
          : 'Error registering...'
        commit('setErrorMessage', authError)
        return { success: false }
      }
    }
  }
})
