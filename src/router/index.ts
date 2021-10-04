import { createRouter, createWebHashHistory, RouteRecordRaw } from 'vue-router'
import storage from '@/utils/storage'
import store from '@/store'
import { loadRoutes } from '@/utils/utils'
const Login = () => import(/* webpackChunkName: "login" */ '../views/login/login.vue')
const Home = () => import(/* webpackChunkName: "home" */ '../views/home/home.vue')
const Welcome = () =>
  import(/* webpackChunkName: "welcome" */ '../views/welcome/welcome.vue')

const routes: Array<RouteRecordRaw> = [
  {
    path: '/',
    name: 'home',
    component: Home,
    redirect: '/welcome',
    children: [
      {
        path: '/welcome',
        name: 'welcome',
        component: Welcome,
      },
    ],
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
    const userInfo = storage.getItem('userInfo')
    if (!userInfo) {
      return '/login'
    }
  }
})
if (router.currentRoute.value.fullPath !== '/login') {
  loadRoutes(router, store.state.menus)
}

export default router
