<template>
	<div>
		<h1>电影管理</h1>
		<router-view></router-view>	
	</div>

</template>

<script>
	import router from "../../../../router/index.js"
	export default {
		name:"movie",
		created() {
			router.push("/info/movie/movieList")
		}
	}
</script>