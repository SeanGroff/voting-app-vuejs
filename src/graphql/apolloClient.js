// https://www.npmjs.com/package/apollo-boost
import Vue from 'vue'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { CachePersistor } from 'apollo-cache-persist'
import VueApollo from 'vue-apollo'
import { store } from '@/store'

// Create Apollo Client
export const apolloClient = new ApolloClient({
  // Pass your GraphQL endpoint to uri
  uri:
    process.env.NODE_ENV === 'production'
      ? 'unknown'
      : 'http://localhost:3000/graphql',
  // This function is called on each request
  request: operation => {
    const token = store.getters.userToken
    operation.setContext({
      headers: {
        Authorization: `Bearer ${token}`
      }
    })
  }
})

export const persistor = new CachePersistor({
  cache: new InMemoryCache(),
  storage: localStorage
})

// Install the vue plugin
Vue.use(VueApollo)
