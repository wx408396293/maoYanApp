<template>
	<el-row :gutter="20">
		<el-col :xs="8" :sm="6" :md="4" :lg="3">
			<el-tree
			  :data="data"
			  :props="defaultProps"
			  :highlight-current = true
			  accordion
			  @current-change="add">
			</el-tree>
		</el-col>
		<el-col :xs="16" :sm="18" :md="20" :lg="21">
			<router-view></router-view>
		</el-col>
	</el-row>
	<!-- <div class="mingst">
		<ul>
		    <li><router-link :to="'/info/student'">学生信息</router-link></li>
		   	<li><router-link :to="'/info/teacher'">老师信息</router-link></li>
		</ul>
		
		<div class="content">
			<router-view></router-view>	
		</div>
	</div> -->
</template>

<script>
	import router from "../../../router/index.js"

	export default {
		name:"info",
		data() {
	      return {
	        data: [{
	          label: '用户',
	          children: [{
	            label: '新增用户',
	          }, {
	            label: '修改用户',
	          }]
	        },{
	          label: '电影',
	          children: [ {
	            label: '新增电影',
	          }, {
	            label: '修改电影',
	          }]
	        },{
	          label: '影院',
	          children: [{
	            label: '影院管理'
	          }, {
	            label: '影厅管理',
	          }]
	        },{
	          label: '排片',
	          children: [{
	            label: '新增排片',
	          }]
	        }],
	        defaultProps: {
	          children: 'children',
	          label: 'label'
	        }
	    };
    },
    methods: {
      add(data){
      	switch(data.label) {
      		case  "新增排片":
      			router.push("/info/addSchedule")
      			break;
      	}
      }
    }
	}
</script>

<style scoped>
	.mingst{
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-wrap: nowrap;
		justify-content: flex-basis;
		flex-direction:  row;
		align-items: flex-start;
	}
	.maive{
		width: 300px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-direction:  row;
		align-items: center;

	}
	ul{
		width: 150px;
	}
	.content{
		margin-top: 30px;
	}
</style>
