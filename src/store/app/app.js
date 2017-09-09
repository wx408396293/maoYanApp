import axios from "axios"
import router from "../../router/index.js"
export const LOGIN ="LOGIN"
export const BLUR ="BLUR"
export const REG ="REG"
const app ={
  namespaced: true,
  state:{
    userState:"",
    button: null,
  },
  //Vuex 中的 mutations 非常类似于事件属于同步
  mutations:{
   
  },
  //actions异步
  actions:{
    //登录
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
    },
    //判断用户是否注册
    async BLUR(context,username){
      const {data} = await axios.get('http://localhost:3001/users/isUse', {
        params:{
          username
        }
      })
      if (data) {
        context.state.userState ="用户名重复请重新输入"
        context.state.button = true
      }else {
         context.state.userState ="用户可以注册"
         context.state.button = false
      }
    },
    //注册用户
    async REG(context,{username,password}){
      const {data} = await axios.post('http://localhost:3001/users/reg', {
          username,
          password
      })
    }
  },
  //派生属性
  getters:{
 
  }
}
//
//
export default app