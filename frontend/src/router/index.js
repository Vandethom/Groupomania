import Vue from 'vue'
import VueRouter from 'vue-router'

Vue.use(VueRouter)

const routes = [
  {
    path: '/authentication',
    name: 'Authentication',
    component: () => import('../views/SignIn.vue')
  },
  {
    path: '/createAccount',
    name: 'CreateAccount',
    component: () => import('../views/SignUp.vue')
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  },
  {
    path: '/account_modify',
    name: 'AccountOnChange',
    component: () => import('../views/AccountOnChange.vue')
  },
  {
    path: '/',
    name: 'Home',
    component: () => import('../views/Home.vue')
  }
]

const router = new VueRouter({
  routes
})

export default router
