<template>
	<el-row :gutter="20">
		<el-col :span="4">
			<el-tree
			  :data="data"
			  :props="defaultProps"
			  :highlight-current = true
			  accordion
			  @current-change="add">
			</el-tree>
		</el-col>
		<el-col :span="20">
			<router-view></router-view>	
		</el-col>
	</el-row>
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
      handleNodeClick(data) {
      },
      add(data){
      	switch(data.label) {
      		case "新增用户":
      			router.push()
      			break;
      		case "修改用户":
      			router.push()
      			break;
    			case "新增电影":
      			router.push()
      			break;
    			case "修改电影":
      			router.push()
      			break;	
      		case "影院管理":
      			router.push("/info/studio")
      			break;
    			case "新增排片":
      			router.push()
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
</style>
