import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/app/login/login.vue"
import reg from "../components/app/reg/reg.vue"
import info from "../components/app/info/info.vue"
import studio from "../components/app/info/studio/studio.vue"

Vue.use(Router)
//调用element-ui
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)

export default new Router({
  routes: [{
    path: '/',
    name: 'login',
    component: login
  }, {
    path: '/login/:username',
    name: 'login',
    component: login
  }, {
    path: '/reg',
    name: 'reg',
    component: reg
  }, {
    path: '/info',
    name: 'info',
    component: info,
    beforeEnter: (to, from, next) => {
      if (eval(localStorage.isLogin)) {
        next()
      } else {
        next(false)
      }
    },
    children: [{
      path: "/info/studio",
      name: "studio",
      component: studio
    }]
  }]
})


