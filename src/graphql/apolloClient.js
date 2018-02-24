// https://www.npmjs.com/package/apollo-boost
import Vue from 'vue'
import ApolloClient, { InMemoryCache } from 'apollo-boost'
import { CachePersistor } from 'apollo-cache-persist'
import VueApollo from 'vue-apollo'

import { defaults, resolvers } from '@/graphql/resolvers'

// Create Apollo Client
export const apolloClient = new ApolloClient({
  // Pass your GraphQL endpoint to uri
  uri: 'http://localhost:3000/graphql',
  // This function is called on each request
  // request: operation => {
  //   const token = localStorage.getItem('token')
  //   operation.setContext({
  //     headers: {
  //       authorization: `Bearer ${token}`
  //     }
  //   })
  // },
  // Pass Apollo-Link-State
  clientState: {
    defaults,
    resolvers
  }
})

export const persistor = new CachePersistor({
  cache: new InMemoryCache(),
  storage: localStorage
})

// Install the vue plugin
Vue.use(VueApollo)
