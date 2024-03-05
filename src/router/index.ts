/**
 * Configures routing for the Vue application.
 * Defines navigation paths and the associated Vue components.
 * Employs lazy loading for improved performance.
 */

import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'home',
      component: HomeView
    },
    {
      path: '/about',
      name: 'about',

      component: () => import('../views/HomeView.vue')
    }
  ]
})

export default router
