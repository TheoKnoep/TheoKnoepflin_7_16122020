import { createRouter, createWebHashHistory } from 'vue-router'
import Home from '../views/Home.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/account',
    name: 'Account',
    component: () => import('../views/Account.vue')
  }, 
  {
    path: '/account/edit', 
    name: 'Modifier les informations du compte', 
    component: () => import('../views/Editaccount.vue')
  },
  {
    path: '/signup', 
    name: 'Signup',
    component: () => import('../views/Signup.vue')
  }, 
  {
    path: '/posts', 
    name: 'Posts', 
    component: () => import('../views/Posts.vue')
  }, 
  {
    path: '/posts/new', 
    name: 'Créer une nouvelle publication', 
    component: () => import('../views/Createpost.vue')
  }, 
  {
    path:'/user/:id', 
    name: 'Infos utilisateur', 
    component: () => import('../views/UserInfos.vue')
  }
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
