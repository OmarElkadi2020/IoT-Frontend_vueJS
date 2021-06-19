import { createWebHistory, createRouter } from 'vue-router'
import Home from './views/Home.vue'
import About from './views/About.vue'
import SickForm from './views/SickForm.vue'
import CoronaStat from './views/CoronaStat.vue'

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
  },
  {
    path: '/CoronaStat',
    name: 'CoronaStat',
    component: CoronaStat
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})

export default router
