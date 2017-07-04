<template>
	<div>
		<el-table
			highlight-current-row
			@current-change="handleCurrentChange"
		    :data="this.state.data"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="username"
		      label="账号"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="password"
		      label="密码"
		      width="180">
		    </el-table-column>
		    <el-table-column
		      prop="state"
		      label="状态"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="_id"
		      label="id"
		      width="250">
		    </el-table-column>
		    <el-table-column
		      fixed="right"
		      label="操作"
		      width="180">
		      <template scope="scope">
		        <el-button type="text"  @click="selected" size="small">移除</el-button>
		        <el-button type="text" size="small">修改</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-button-group>
		  <el-button type="primary" @click="setLite" icon="arrow-left">上一页</el-button>
		  <el-button type="primary" @click="addLite">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
		</el-button-group>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from "axios"
	//引入element-ui样式
	// import 'element-ui/lib/theme-default/index.css'
	//引入全的不的element-ui插件
	// import ElementUI from 'element-ui'
	// Vue.use(ElementUI)
	/*//单独引入
	import {Button} from 'element-ui'
	Vue.use(Button)*/

	// import Vue from 'vue'
	// import ElementUI from 'element-ui'
	// import 'element-ui/lib/theme-default/index.css'
	export default {
		name:"student",
		data(){
			return{
				state : {
					page: 1,
					rows: 10,
					count: 0,
					maxPage: 5,
					data: []
				},
				currentRow: null
			}
		},
		// 生命周期
			mounted(){
					this.getEmpByPage()
				},
		methods:{
			addLite(){
				if (this.state.page !== this.state.maxPage) {
					this.state.page +=1
					this.getEmpByPage()
				}
			},
			setLite(){
				if (this.state.page !== 1) {
					this.state.page -=1
					this.getEmpByPage()
				}
			

			},
			handleCurrentChange(val) {
	        	this.currentRow = val._id;
	      	},
	      	selected (){
				console.log(this.currentRow)
			},
			async getEmpByPage() {
				const stdata=	await axios.get('http://localhost:3001/users/getEmpByPage', {
					params: {
						page : this.state.page,
						rows :this.state.rows
					}
				})
				this.state.data = stdata.data.rows
				this.state.count =stdata.data.total
				this.state.maxPage = Math.ceil(this.state.count/this.state.rows)
			}
		}
	}
</script>