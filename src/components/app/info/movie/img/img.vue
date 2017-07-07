<template>
	<div>
		<h1>上传图片</h1>
		  <el-select
		   v-model="value"
		    placeholder="请选择">
		    <el-option
		      v-for="item in options"
		      :key="item.value"
		      :label="item.label"
		      :value="item.value"
		     >
		    </el-option>
		  </el-select>
		<el-upload
		  class="upload-demo"
		  action="http://localhost:3001/files/upload"
		  :data="imgData"
		  :file-list="fileList2"
		  :before-upload="setImgDataType"
		  list-type="picture">
		  <el-button size="small" type="primary">点击上传</el-button>
		  <div slot="tip" class="el-upload__tip">只能上传jpg/png文件，且不超过500kb</div>
		</el-upload>
	</div>

</template>

<script>
	import Vue from 'vue'
	import axios from "axios"
	import router from "../../../../../router/index.js"
	export default {
		name: "img",
		data() {
	      return {
	      	imgData: {
	      		type: "1",
	      		movieId: ""
	      	},      	
	      	id: this.$route.query.id || "",
	        fileList2: [],
			options: [{
	          value: '1',
	          label: '主页图片'
	        }, {
	          value: '2',
	          label: '剧情图片'
	        }],
	        value: '1'
	      };
	    },
	   	mounted(){
			this.valueChange()
		},
	    methods: {
    	  valueChange() {  
	   	  	this.imgData.movieId = this.id
	   	  },
	   	  setImgDataType() {
	   	  	this.imgData.type = this.value
	   	  }
	    }
	}

</script>