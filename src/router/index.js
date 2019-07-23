// 引入vue实例
import Vue from 'vue'

// 引入路由文件
import VueRouter from 'vue-router'

// 引入单文件组件
import Login from '@/components/login.vue'
import Home from '@/components/home.vue'
import Welcome from '@/components/welcome.vue'
import Users from '@/components/users/users.vue'

// 测试组件
import Demo1 from '@/components/demo/demo1.vue'


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
      name: 'demo1',
      path: '/demo1',
      component: Demo1
    },
    {
      name: 'login',
      path: '/login',
      component: Login
    },
    {
      name: "home",
      path: "/home",
      component: Home,
      redirect: { name: "welcome" },
      children: [
        {
          name: "welcome",
          path: "/welcome",
          component: Welcome
        }, {
          name: "users",
          path: "/users",
          component: Users
        }
      ]
    }
  ]
})

// 导出
export default router
