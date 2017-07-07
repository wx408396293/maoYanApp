<template>
  <div class="info">
  		<div class="nav">
  			<el-menu default-active="1" class="el-menu-vertical-demo" @select="handleSelect">
			    <el-submenu index="1">
			      <template slot="title"><i class="el-icon-menu"></i>用户</template>
			        <el-menu-item index="1-1">新增用户</el-menu-item>
			        <el-menu-item index="1-2">修改用户</el-menu-item>
			    </el-submenu>
			    <el-submenu index="2">
			    	<template slot="title"><i class="el-icon-menu"></i>电影</template>
			    		<el-menu-item index="2-1">新增电影</el-menu-item>
			        <el-menu-item index="2-2">修改电影</el-menu-item>
			    </el-submenu>
			    <el-submenu index="3">
			    	<template slot="title"><i class="el-icon-menu"></i>影院</template>
			    		<el-menu-item index="3-1">影院管理</el-menu-item>
			    </el-submenu>
			    <el-submenu index="4">
			    	<template slot="title"><i class="el-icon-menu"></i>排片</template>
			    		<el-menu-item index="4-1">排片管理</el-menu-item>
			    </el-submenu>
			  </el-menu>
  		</div>
		  <div class="warp">
		  	<router-view></router-view>
		  </div>
  </div>
</template>

<script>
	import router from "../../../router/index.js"
	export default {
		name:"info",	
	    methods: {
	      handleSelect(key) {
	        switch(key) {
	      		case "1-1":
	      			// router.push()
	      			break;
	      		case "1-2":
	      			// router.push()
	      			break;
	    			case "2-1":
	      			router.push("/info/movie/addMovie")
	      			break;
	    			case "2-2":
	      			router.push("/info/movie/movieList")
	      			break;	
	      		case "3-1":
	      			router.push("/info/studio")
	      			break;
	    			case "4-1":
	      			router.push("/info/addSchedule")
	      			break;
	      	}
	      }
	    }
	}
</script>

<style scoped>
.info {
	display: flex;
	padding-right: 20px;

}
.nav {
	width: 180px;
	background-color: #eef1f6;
	height: 90vh;
	position: fixed;
	left: 0;
	top: 112px;
}
.warp {
	width: 85%;
	margin-left: 200px;
	margin-top: 120px;
	margin-bottom: 100px;
}
</style>
