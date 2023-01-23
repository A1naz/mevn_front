import { createRouter, createWebHistory } from 'vue-router'

const routes = [
  {
    path: '/',
    name: 'home',
    
    component: () => import('@/views/HomeView.vue'),
    meta: {
      title: 'Home',
    },
  },
  {
    path: '/about',
    name: 'about',

    component: () => import('@/views/AboutView.vue'),
    meta: {
      title: 'About',
    },
  },
  {
    path: '/cart',
    name: 'cart',

    component: () => import('@/views/CartView.vue'),
    meta: {
      title: 'Cart',
    },
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
})

router.beforeEach((to, from, next) => {
  document.title = `${to.meta.title}`
  next()
})

export default router
