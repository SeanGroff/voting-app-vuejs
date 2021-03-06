import Vue from 'vue'
import Router from 'vue-router'
import Polls from '@/components/Polls'
import MyPolls from '@/components/MyPolls'
import SignUpForm from '@/components/SignUpForm'
import Login from '@/components/LoginForm'
import NewPoll from '@/components/NewPoll'
import PollDetail from '@/components/PollDetail'

Vue.use(Router)

export default new Router({
  linkExactActiveClass: 'is-active',
  linkActiveClass: 'is-active',
  routes: [
    {
      path: '/',
      name: 'Polls',
      component: Polls
    },
    {
      path: '/signup',
      name: 'SignUpForm',
      component: SignUpForm
    },
    {
      path: '/login',
      name: 'Login',
      component: Login
    },
    {
      path: '/new',
      name: 'NewPoll',
      component: NewPoll
    },
    {
      path: '/polls/*',
      name: 'PollDetail',
      component: PollDetail
    },
    {
      path: '/mypolls',
      name: 'MyPolls',
      component: MyPolls
    }
  ]
})
