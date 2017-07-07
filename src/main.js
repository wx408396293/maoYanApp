// The Vue build version to load with the `import` command
// (runtime-only or standalone) has been set in webpack.base.conf with an alias.
import Vue from 'vue'
import router from './router/index.js'
import 'element-ui/lib/theme-default/index.css'
import ElementUI from 'element-ui'
Vue.use(ElementUI)
import index from "./components/app/index"

Vue.config.productionTip = false

import store from "./store/index.js"
//引入CSS文件
import "./css/index.css"
/* eslint-disable no-new */
new Vue({
  el: '#app',
  router,
  template: `
    <div>
      <index />
    </div>
  `,
  store,
  components: {
    index
  }
})