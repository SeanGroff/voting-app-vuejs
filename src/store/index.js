import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loggedIn: !!localStorage.getItem('token'),
    user: {
      id: '',
      name: '',
      email: ''
    },
    error: '',
    loading: false
  },
  getters: {
    user: state => state.user,
    userId: state => state.user.id,
    username: state => state.user.email,
    isAuthorized: state => state.loggedIn,
    errorMessage: state => state.error,
    loadingStatus: state => state.loading
  },
  mutations: {
    AUTH_PENDING: state => {
      state.loading = true
    },
    AUTH_FAILURE: (state, payload) => {
      state.error = payload
      state.loading = false
    },
    AUTH_SUCCESS: (state, payload) => {
      state.user = payload
      state.loggedIn = true
      state.error = ''
      state.loading = false
    },
    setErrorMessage: (state, payload) => {
      state.error = payload
    }
  },
  actions: {
    updateErrorMessage: ({ commit }, payload) => {
      commit('setErrorMessage', payload)
      return payload
    },
    registerCurrentUser: async (
      { commit },
      { name, email, password, confirmPassword }
    ) => {
      commit('AUTH_PENDING')

      try {
        const { data } = await axios.post('/signup', {
          name,
          email,
          password,
          confirmPassword
        })

        commit('AUTH_SUCCESS', {
          id: data.uid,
          name: data.name,
          email: data.email
        })

        return { ...data, error: null }
      } catch (err) {
        commit('AUTH_FAILURE', err.response.data)
        return { error: err.response.data }
      }
    },
    loginCurrentUser: async ({ commit }, { email, password }) => {
      commit('AUTH_PENDING')

      try {
        const { data } = await axios.post('/login', {
          email,
          password
        })

        commit('AUTH_SUCCESS', {
          id: data.uid,
          name: data.name,
          email: data.email
        })

        return { ...data, error: null }
      } catch (err) {
        commit('AUTH_FAILURE', err.response.data)
        return { error: err.response.data }
      }
    }
  }
})
