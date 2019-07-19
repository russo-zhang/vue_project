// 引入vue实例
import Vue from 'vue'

// 引入路由文件
import VueRouter from 'vue-router'

// 引入单文件组件
import Login from '@/components/login.vue'

// use一下
Vue.use(VueRouter)

const router = new VueRouter({
  routes: [
    {
      name: 'default',
      path: '/',
      redirect: { name: 'login' }
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    }
  ]
})

// 导出
export default router
