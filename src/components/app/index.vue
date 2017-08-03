<template>
	<div>		
		<h1 id="head">猫眼电影后台管理</h1>   	    
		<router-view></router-view>	
		<div id="foot">
      <p>&copy;2016&nbsp;猫眼电影&nbsp;maoyan.com&nbsp;京ICP证160733号&nbsp;京ICP备16022489号-1&nbsp;京公网安备&nbsp;11010502030881号&nbsp;网络文化经营许可证&nbsp;电子公告服务规则</p>
      <p>北京猫眼文化传媒有限公司</p>
    </div>
	</div>
</template>

<script>
	export default {
		name:"index",
	}
</script>

<style scoped>
#head{
	width: 100%;
	padding: 30px 0;
    background: #262426;
    font-size: 40px;
    color: #666;
    text-align: center;
    position: fixed;
    left: 0;
    top: 0;
    z-index: 10;  
}
#foot{
	width: 100%;
    padding: 20px 0;
    background: #262426;
    font-size: 12px;
    color: #666;
    line-height: 20px;
    text-align: center;
    position: fixed;
    left: 0;
    bottom: 0;
    z-index: 10;
}
</style>