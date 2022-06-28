import Vue from 'vue'
import VueRouter from 'vue-router'
import Layoutpage from '@/views/Layoutpage'
Vue.use(VueRouter)

const routes = [
  {
    path: '/',
    component: Layoutpage,
    redirect: '/home',
    children: [
      {
        path: '/home',
        component: () => import('@/views/HomePage')
      },
      {
        path: '/findhouse',
        component: () => import('@/views/FindHousePage')
      },
      {
        path: '/new',
        component: () => import('@/views/NewPage')
      },
      {
        path: '/my',
        component: () => import('@/views/MyPage')
      }
    ]
  },
  {
    path: '/login',
    component: () => import('@/views/LoginPage')
  },
  {
    path: '/city',
    component: () => import('@/views/CityPage')
  }
]

const router = new VueRouter({
  routes
})

export default router
