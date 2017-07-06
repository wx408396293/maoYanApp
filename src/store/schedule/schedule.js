import axios from "axios"
import router from "../../router/index.js"
export const MOVIE ="MOVIE"
export const STUDIO ="STUDIO"
export const THEATER ="THEATER"
export const CREATE ="CREATE"
export const SXHEDULE="SXHEDULE"
export const REMOVES ="REMOVES"
const app ={
  namespaced: true,
  state:{
     movies: [],
     studios: [], 
     theaters:[],
     schedule:[],
     totals:0,
     // value: 'zhinan',
      // label: '指南',
  },
  //Vuex 中的 mutations 非常类似于事件属于同步
  mutations:{
   
  },
  //actions异步
  actions:{
    async MOVIE(context) {
      const {data} =  await axios.get('http://localhost:3001/schedule/movieQuery', {})
      data.forEach((item)=>{
        context.state.movies.push({
          value:item._id,
          label:item.cName
        })
      })
    },
    async STUDIO(context) {
      const {data} =  await axios.get('http://localhost:3001/schedule/studiosQuery', {})
      data.forEach((item)=>{
        context.state.studios.push({
          value:item._id,
          label:item.name
        })
      })
    },
    async THEATER(context,studioId) {
      const {data} =  await axios.get('http://localhost:3001/schedule/theaterQuery', {
        params: {
            "studioId":studioId
          }
      })

      context.state.theaters=[]
      data.forEach((item)=>{
        context.state.theaters.push({
          value:item._id,
          label:item.name
        })
      })
      // console.log(data)
    },
    async CREATE(context,{
      movieId,showTime,studioId,theaterId,price
    }){
      const {data} = await axios.post('http://localhost:3001/schedule/create',{
          "movieId":movieId,
          "showTime":showTime,
          "studioId":studioId,
          "theaterId":theaterId,
          "price":price,
      })
    },
    async SXHEDULE(context,{
      movieId,studioId,theaterId,page,rows
    }){
      const {data} = await axios.get('http://localhost:3001/schedule/theatersQuery',{
        params: {
          "movieId":movieId,
          "studioId":studioId,
          "theaterId":theaterId,
          "page":page,
          "rows":rows
        }
      })
      context.state.totals= data.total
      context.state.schedule=data.rows
    },
    async REMOVES(context,{scheduleId,movieId,studioId,theaterId,page,rows}){
      const data=  await axios.get('http://localhost:3001/schedule/removes',{
        params:{
          "_id":scheduleId
        }
      })
      context.dispatch("SXHEDULE",{movieId,studioId,theaterId,page,rows})
    }
  },
  //派生属性
  getters:{
     
  }
}

export default app