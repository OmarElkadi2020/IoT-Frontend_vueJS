import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SickForm from './views/SickForm.vue'

const routes = [
  {
    path: '/',
    name: 'Home',
    component: Home
  },
  {
    path: '/about',
    name: 'About',
    component: About
  },
  {
    path: '/SickForm',
    name: 'SickForm',
    component: SickForm
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
