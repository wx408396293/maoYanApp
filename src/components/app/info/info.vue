<template>
	<div class="mingst">
		<ul>
		    <li><router-link :to="'/info/student'">学生信息</router-link></li>
		   	<li><router-link :to="'/info/teacher'">老师信息</router-link></li>
		   	<li><router-link :to="'/info/studio'">影院管理</router-link></li>
		   	<li><router-link :to="'/info/theater'">影厅管理</router-link></li>
		</ul>
		<div>
			<router-view></router-view>	
		</div>
	</div>
</template>

<script>
	import router from "../../../router/index.js"

	export default {
		name:"info",
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