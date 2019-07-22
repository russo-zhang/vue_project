import Vue from 'vue'
import App from './App.vue'

// 引入路由模块
import router from '@/router/index.js'

// 引入element-ui
import ElementUI from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

// 引入公共样式
import '@/styles/index.less'
Vue.config.productionTip = false

// 让vue使用element-ui
Vue.use(ElementUI)

router.beforeEach((to,from,next)=>{
var token =  localStorage.getItem("vue_project_token_user_key")
  if(token||to.path=="/login"){
    next()
  }else{
    next({name:"login"})
  }
})

new Vue({
  router,
  render: h => h(App)
}).$mount('#app')
