import { createRouter, createWebHistory } from 'vue-router'
import ProductsList from '../views/ProductsList.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/:id(.*)',
      name: 'home',
      component: ProductsList,
    },
  ],
})

export default router
