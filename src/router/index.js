import Vue from 'vue'
import Router from 'vue-router'

import login from "../components/app/login/login.vue"
import reg from "../components/app/reg/reg.vue"
import info from "../components/app/info/info.vue"
import addSchedule from "../components/app/info/schedule/addSchedule.vue"
import studio from "../components/app/info/studio/studio.vue"
import movie from "../components/app/info/movie/movie.vue"
import addMovie from "../components/app/info/movie/addMovie/addMovie.vue"
import movieList from "../components/app/info/movie/movieList/movieList.vue"
import img from "../components/app/info/movie/img/img.vue"


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
    },{
    	path: '/login/:username',
      	name: 'login',
      	component: login
    },{
      	path: '/reg',
      	name: 'reg',
      	component: reg
    },{
      	path: '/info',
      	name: 'info',
      	component: info,
      	beforeEnter: (to, from, next) => {
        	if (eval(localStorage.isLogin)) {
        		next()
        	}else {
        		next(false)
        	}
      	},
  	    children:[{
  	    	path:"/info/addSchedule",
  	    	name:"addSchedule",
  	    	component: addSchedule
  	    },{
          path: "/info/studio",
          name: "studio",
          component: studio
        },{
        path:"/info/movie",
        name:"movie",
        component:movie,
        children:[{
          path:"/info/movie/addMovie",
          name:"addMovie",
          component:addMovie
        }, {
          path:'/info/movie/addMovie/:id',
          name:"addMovie",
          component:addMovie
        }, {
          path:"/info/movie/movieList",
          name:"movieList",
          component:movieList
        }]
        }, {
          path:"/info/movie/img",
          name:"img",
          component:img
        }, {
          path:"/info/movie/img/:id",
          name:"img",
          component:img
        }]
    }]
})


