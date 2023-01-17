import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'Bacheca',
    component: () => import('@/views/Bacheca.vue')
  },
  {
    path: '/login',
    name: 'Login',
    component: () => import('@/views/Login.vue')
  },
  {
    path: '/profilo',
    name: 'Profilo',
    component: () => import('@/views/Profilo.vue')
  },
  /* {
    path: '/reports',
    name: 'Reports',
    component: () => import('@/views/Reports.vue')
  }, */
]

const router = createRouter({
  history: createWebHashHistory(),
  routes
})

export default router
