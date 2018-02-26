// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import VueApollo from 'vue-apollo'
import Vuelidate from 'vuelidate'
import App from '@/App'
import router from '@/router'
import { store } from '@/store'
import { apolloClient } from '@/graphql/apolloClient'

Vue.use(Vuelidate)

const apolloProvider = new VueApollo({
  defaultClient: apolloClient
})

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  provide: apolloProvider.provide(),
  router,
  store,
  components: { App },
  template: '<App/>'
})
