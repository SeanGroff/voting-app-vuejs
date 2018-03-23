import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'
import createPersistedState from 'vuex-persistedstate'

axios.defaults.baseURL =
  process.env.NODE_ENV === 'production' ? 'unknown' : 'http://localhost:3000'

Vue.use(Vuex)

export const store = new Vuex.Store({
  plugins: [createPersistedState()],
  state: {
    loggedIn: false,
    user: {
      id: '',
      name: '',
      email: '',
      ip: ''
    },
    error: '',
    loading: false,
    token: ''
  },
  getters: {
    user: state => state.user,
    userId: state => state.user.id,
    userIp: state => state.user.ip,
    username: state => state.user.email,
    userToken: state => state.token,
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
      state.loggedIn = false
      state.loading = false
    },
    AUTH_SUCCESS: (state, payload) => {
      state.user = payload
      state.loggedIn = true
      state.error = ''
      state.loading = false
    },
    IP_PENDING: state => {
      state.loading = true
    },
    IP_SUCCESS: (state, payload) => {
      state.user.ip = payload
      state.error = ''
      state.loading = false
    },
    IP_FAILURE: (state, payload) => {
      state.error = 'Failed to fetch IP address'
      state.loading = false
    },
    setErrorMessage: (state, payload) => {
      state.error = payload
    },
    setToken: (state, payload) => {
      state.token = payload
    }
  },
  actions: {
    updateErrorMessage: ({ commit }, payload) => {
      commit('setErrorMessage', payload)
      return payload
    },
    updateIpAddress: async ({ commit }) => {
      commit('IP_PENDING')
      try {
        const { data } = await axios.get('/ip')
        commit('IP_SUCCESS', data.ip)
      } catch (err) {
        commit('IP_FAILURE')
        return { error: err.response.data }
      }
    },
    updateToken: ({ commit }, payload) => {
      commit('setToken', payload)
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
          email: data.email,
          ip: data.ip
        })

        return { ...data, error: '' }
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
          email: data.email,
          ip: data.ip
        })

        return { ...data, error: '' }
      } catch (err) {
        commit('AUTH_FAILURE', err.response.data)
        return { error: err.response.data }
      }
    },
    checkAuthorization: async ({ commit, state }, token) => {
      commit('AUTH_PENDING')

      try {
        const { data } = await axios.get('/secret', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        })

        commit('AUTH_SUCCESS', {
          ...state.user
        })

        return { authorized: data.authorized, error: '' }
      } catch (err) {
        commit('AUTH_FAILURE', 'Not Authorized')
        return { error: 'Not Authorized' }
      }
    }
  }
})
