<template>
	<div>
    <el-row style="margin-bottom: 20px;">
       <el-col :span="8">
         <span class="demonstration">电影</span>
          <el-select v-model="movievalue" placeholder="选择电影" @change="scheduleList">
            <el-option
              size="mini"
              v-for="item in movies"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </el-col>
       <el-col :span="8">
         <span class="demonstration">影院</span>
          <el-select v-model="studiosvalue" placeholder="选择影院" @change="getTheater">
            <el-option
              v-for="item in studios"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
       </el-col>
       <el-col :span="8">
         <span class="demonstration">影厅</span>
          <el-select v-model="theatersvalue" placeholder="选择影厅"  @change="scheduleList">
            <el-option
              v-for="item in theaters"
              :key="item.value"
              :label="item.label"
              :value="item.value">
            </el-option>
          </el-select>
      </el-col>
    </el-row>
    <el-row>
       <el-col :span="8">
         <span class="demonstration">上映时间</span>
          <el-date-picker
            v-model="time"
            type="datetime"
            placeholder="选择日期时间">
          </el-date-picker>
       </el-col>
       <el-col :span="8">
         <span class="demonstration">价格</span>
          <el-input class="input" placeholder="请输入价格" v-model="money">
            <template slot="append">￥</template>
          </el-input>
       </el-col>
       <el-col :span="8">
         <el-button type="primary" @click="AddSchedules">提交</el-button>
       </el-col>
    </el-row>
    <el-row>
      <el-col :span="24">
        <el-table
          highlight-current-row
            :data="schedule"
            border
            style="width: 100%">
            <el-table-column
              prop="movieId.cName"
              label="电影名称">
            </el-table-column>
            <el-table-column
              prop="studioId.name"
              label="放映影院">
            </el-table-column>
            <el-table-column
              prop="theaterId.name"
              label="上映影厅">
            </el-table-column>
            <el-table-column
              prop="show_time"
              label="上映时间">
            </el-table-column>
            <el-table-column
              prop="price"
              label="价格">
            </el-table-column>
            <el-table-column prop="_id" label="操作">
              <template scope="scope">
                <el-button
                  size="small"
                  @click="seatings(scope)" >查看售票</el-button>
                <el-button
                  size="small"
                  type="danger"
                  @click="removes(scope)">删除</el-button>
              </template>
            </el-table-column>
        </el-table>
      </el-col>
      <el-col :span="24">
        <el-pagination
          @size-change="handleSizeChange"
          @current-change="handleCurrentChange"
          :current-page="currentPage4"
          :page-sizes="paging"
          :page-size="rows"
          layout="total, sizes, prev, pager, next, jumper"
          :total="totals">
        </el-pagination>
      </el-col>
    </el-row>
	</div>
</template>
<script>
  import {mapActions, mapState} from "vuex"
  import seatingList from "./seatingList.vue"
  import {MOVIE,STUDIO,THEATER,CREATE,SXHEDULE,REMOVES} from "../../../../store/schedule/schedule.js"
  export default {
    name:"addSchedule",
    components:{
      seatingList
    },
    data() {
      return {
        movievalue:"",
        studiosvalue:"",
        theatersvalue:"",
        time: '',
        money :"",
        page: 1,
        rows: 10,
        currentPage4:1,
        paging:[5,10,15,20,25,30,35,40,45,50,55,60,65,70,75,80,85,90,95,100]
      }; 
    },
    created(){
      this.MOVIE()
      this.STUDIO()
    },
    mounted(){
      this.getTheater()
      this.scheduleList()
    },
    beforeUpdate(){
      // this.scheduleList()
    },
    computed:{
      ...mapState("schedule",["movies","studios","theaters","schedule","totals"])
    },
    methods: {
     ...mapActions("schedule",["MOVIE","STUDIO","THEATER","CREATE","SXHEDULE","REMOVES"]),
     getTheater(){
        this.THEATER(this.studiosvalue)
        this.scheduleList()
     },
     AddSchedules(){
      this.CREATE({
        movieId:this.movievalue,
        showTime:this.time,
        studioId:this.studiosvalue,
        theaterId:this.theatersvalue,
        price:this.money
      })
      this.scheduleList()
     },
     //表格
      scheduleList(){
      if (this.movievalue ===""||this.studiosvalue ==="" || this.theatersvalue ==="") {
        return
      }else{
        this.SXHEDULE({
          movieId:this.movievalue,
          studioId:this.studiosvalue,
          theaterId:this.theatersvalue,
          page:this.page,
          rows:this.rows
        })
      }
     },
     seatings(scheduleId){
       this.$alert(`seatingList`, '购票情况', {
          confirmButtonText: '确定',
        });
      console.log(scheduleId.row.id)
     },
     removes(scheduleId){
       this.REMOVES({
        scheduleId:scheduleId.row.id,
        movieId:this.movievalue,
        studioId:this.studiosvalue,
        theaterId:this.theatersvalue,
        page:this.page,
        rows:this.rows
      })
     },
     handleSizeChange(val){
      this.rows = val
      this.scheduleList()
     },
     handleCurrentChange(val){
      this.page = val
      this.scheduleList()
     }
    }
  };
</script>

<style scoped>
  .input{
    width: 224px;
  }
</style>