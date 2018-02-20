import Vue from 'vue'
import Router from 'vue-router'
import HelloWorld from '@/components/HelloWorld'
import SignUpForm from '@/components/Registration/SignUpForm'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'is-active',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'HelloWorld',
      component: HelloWorld
    },
    {
      path: '/signup',
      name: 'SignUpForm',
      component: SignUpForm
    }
  ]
})
