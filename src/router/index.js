import { createRouter, createWebHistory } from 'vue-router'
import HomeView from '../views/HomeView.vue'
function load(component) {
  // '@' is aliased to src/components
  return () => import(`@/views/${component}.vue`)
}

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
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue')
    },
    {
      path: '/new',
      name: "new",
      component: () => import('../views/resources/New.vue'),
      meta: {
        requiresAuth: false,
        userLogin: false
      },
    },
    {
      path: '/login',
      name: "login",
      component: () => import('../views/Login.vue'),
      meta: {
        requiresAuth: false,
        userLogin: false
      },
    },
  ]
})

export default router
