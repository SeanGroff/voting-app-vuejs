import Vue from 'vue'
import { ApolloClient } from 'apollo-client'
import { withClientState } from 'apollo-link-state'
import { CachePersistor } from 'apollo-cache-persist'
import { ApolloLink } from 'apollo-link'
import { HttpLink } from 'apollo-link-http'
import { InMemoryCache } from 'apollo-cache-inmemory'
import VueApollo from 'vue-apollo'

import defaultState from './defaultState'
import resolvers from './resolvers'

const httpLink = new HttpLink({
  // You should use an absolute URL here
  uri: 'http://localhost:3000/graphql'
})

const cache = new InMemoryCache()

export const persistor = new CachePersistor({
  cache,
  storage: localStorage
})

const stateLink = withClientState({
  cache,
  resolvers,
  defaults: defaultState
})

const link = ApolloLink.from([stateLink, httpLink])

// Create the apollo client
export const apolloClient = new ApolloClient({
  link,
  cache,
  connectToDevTools: true
})

// Install the vue plugin
Vue.use(VueApollo)
