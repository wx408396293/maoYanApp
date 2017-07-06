import Vue from 'vue'
import Vuex from "vuex"

import app from "./app/app.js"
import schedule from "./schedule/schedule.js"

Vue.use(Vuex)

const store = new Vuex.Store({
	modules: {
		app,
		schedule
	}
})


export default store;