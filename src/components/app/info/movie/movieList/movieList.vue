<template>
	<div>
		<el-table
			highlight-current-row
			@current-change="handleCurrentChange"
		    :data="this.state.data"
		    border
		    style="width: 100%">
		    <el-table-column
		      prop="cName"
		      label="电影名"
		      width="180"
		       >
		    </el-table-column>
		    <el-table-column
		      prop="country"
		      label="国家"
		      width="100">
		    </el-table-column>
		    <el-table-column
		      prop="duration"
		      label="时长"
		      width="100">
		    </el-table-column>
		     <el-table-column
		      prop="eName"
		      label="英文名"
		      width="200">
		    </el-table-column>
		    <el-table-column
		      prop="release"
		      label="上映时间"
		      width="180">
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
		      <template scope="scope" >

		       	
		        <el-button type="text" @click="removeMovie(scope.$index, state)" size="small">移除</el-button>
		        <el-button type="text" @click="updateMovie(scope.$index, state)" size="small">修改</el-button>
		        <el-button type="text" @click="addMovieImg(scope.$index, state)" size="small">添加图片</el-button>
		      </template>
		    </el-table-column>
		</el-table>
		<el-button-group>
		  <el-button type="primary" @click="setLite" icon="arrow-left">上一页</el-button>
		  <el-button type="primary" @click="addLite">下一页<i class="el-icon-arrow-right el-icon--right"></i></el-button>
		</el-button-group>
		<router-view></router-view>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from "axios"
	import router from "../../../../../router/index.js"
	
	export default {
		name:"movie",
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
			this.getMovies()
		},
		methods:{
			addLite(){
				if (this.state.page !== this.state.maxPage) {
					this.state.page +=1
					this.getMovies()
				}
			},
			setLite(){
				if (this.state.page !== 1) {
					this.state.page -=1
					this.getMovies()
				}
			},
			 addMovieImg(index, rows) {
	      	  	const id = rows.data[index]._id
	      		router.push(`/info/movie/img?id=${id}`)
	        },
			handleCurrentChange(val) {
	        	// this.currentRow = val._id;
	      	},
			removeMovie(index, rows) {
				const id = rows.data[index]._id
				axios.get(`http://localhost:3001/movies/removeMovie?id=${id}`)
				this.getMovies()
		    },
			updateMovie(index, rows) {
				const id = rows.data[index]._id
				router.push(`/info/movie/addMovie?id=${id}`)
		    },	
			
			async getMovies() {
				const moviesData =	await axios.get('http://localhost:3001/movies/query', {
					params: {
						page : this.state.page,
						rows :this.state.rows
					}
				})

				this.state.data = moviesData.data.rows
				this.state.count =moviesData.data.total
				this.state.maxPage = Math.ceil(this.state.count/this.state.rows)
				
			}
		}
	}
</script>