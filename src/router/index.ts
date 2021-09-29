import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import storage from '@/utils/storage'
const Login = () =>
  import(/* webpackChunkName: "login" */ '../views/login/login.vue')
const Home = () =>
  import(/* webpackChunkName: "home" */ '../views/home/home.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    redirect: '/home',
  },
  {
    path: '/home',
    name: 'home',
    component: Home,
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
  },
]

const router = createRouter({
  history: createWebHashHistory(),
  routes,
})

router.beforeEach((to) => {
  if (to.fullPath !== '/login') {
    const token = storage.getItem('token')
    if (!token) {
      return '/login'
    }
  }
})

export default router
