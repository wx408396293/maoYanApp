import axios from "axios"
import router from "../../router/index.js"
export const LOGIN ="LOGIN"
const app ={
  namespaced: true,
  state:{
    
  },
  //Vuex 中的 mutations 非常类似于事件属于同步
  mutations:{
   
  },
  //actions异步
  actions:{
    async LOGIN(context,{username,password}) {
        const {data} =  await axios.post('http://localhost:3001/users/login', {
          "username" :username,
          "password" : password,
        })
          if (data) {
            localStorage.isLogin = true
            router.push("/info")
          }else {
            localStorage.isLogin = false
          }
      }
  },
  //派生属性
  getters:{
     
  }
}

export default app