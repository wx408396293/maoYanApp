<template>
	<div>
		<el-form :model="ruleForm2" :data="this.state.data"  ref="ruleForm2" label-width="100px" class="demo-ruleForm">
		  <el-form-item label="电影名称" prop="cName" >
		    <el-input v-model.number="ruleForm2.cName"></el-input>
		  </el-form-item>
		  <el-form-item label="英文名称" prop="eName">
		    <el-input v-model.number="ruleForm2.eName"></el-input>
		  </el-form-item>
		  <el-form-item label="影片类型" prop="type">
		    <el-input v-model.number="ruleForm2.type"></el-input>
		  </el-form-item>
		  <el-form-item label="国家" prop="country">
		    <el-input v-model.number="ruleForm2.country"></el-input>
		  </el-form-item>
		  <el-form-item label="时长" prop="duration">
		    <el-input v-model.number="ruleForm2.duration"></el-input>
		  </el-form-item>
		  <el-form-item label="日期" prop="release">
		    <el-input v-model.number="ruleForm2.release"></el-input>
		  </el-form-item>
		  <el-form-item label="摘要" prop="synopsis">
		    <el-input v-model.number="ruleForm2.synopsis"></el-input>
		  </el-form-item>
		  <el-form-item>
		    <el-button type="primary" @click="submitForm('ruleForm2')">提交</el-button>
		    <el-button @click="resetForm('ruleForm2')">重置</el-button>
		  </el-form-item>
		</el-form>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from "axios"
	import router from "../../../../../router/index.js"
	export default {
		name:"addMovie",
		data() {
      		return {
	      	id: this.$route.query.id || "",
	        ruleForm2: {},
	        movieId: "",
	        state : {
				page: 1,
				rows: 10,
				count: 0,
				maxPage: 5,
				data: [],
			}
	      };
	    },
    mounted(){
		this.dataQuery()
	},
    methods: {
      submitForm(formName) {
      	this.state.data = this.getMovieData(formName)
      	 if (this.id) {
		  	this.alterMovie(this.id, this.state.data)
		  	
		  } else {
		  	this.addMovie(this.state.data)
		  }
		  router.push("/info/movie/movieList")
      },

	  async addMovie(data) {	
		 const addMovieData = await axios.post('http://localhost:3001/movies/addMovie', data)
		 this.movieId = addMovieData.data._id
		
	  },
	   async alterMovie(id, data) {
	   	const movieData = data;
	   	movieData.movieId = id
		const moviesData = await axios.get('http://localhost:3001/movies/alterMovie', {
			params: movieData
		})
	  },
      getMovieData(formName) {
      	var data = {}
      	const movieAttr = this.$refs[formName].fields.map((item) => item.fieldValue)
		data.cName = movieAttr[0]
		data.eName = movieAttr[1]
		data.type = movieAttr[2]
		data.country = movieAttr[3]
		data.duration = movieAttr[4]
		data.release = movieAttr[5]
		data.synopsis = movieAttr[6]
		data.imgs = []
		return data
	 },
	 async dataQuery(formName) {
	 	
	 	if (this.id) {
	 		const id = this.id
	 		const data = await axios.get(`http://localhost:3001/movies/dataQuery?id=${id}`)
	 		this.state.data = data.data
	 		this.ruleForm2.cName = this.state.data[0].cName
	 		this.ruleForm2.eName = this.state.data[0].eName
	 		this.ruleForm2.type = this.state.data[0].type
	 		this.ruleForm2.country = this.state.data[0].country
	 		this.ruleForm2.duration = this.state.data[0].duration
	 		this.ruleForm2.release = this.state.data[0].release
	 		this.ruleForm2.synopsis = this.state.data[0].synopsis
	 	}		
	},
      resetForm(formName) {
        this.$refs[formName].resetFields();
      }
    }
  }

</script>