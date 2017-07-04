<template>
<div class="mingst">
	<div class="maive">
		<div>
			<el-input placeholder="请输入用户" :maxlength= 16 v-model="username">
			    <template slot="prepend" >用户：</template>
			</el-input>
		</div>
		<div>
			<el-input type="password" placeholder="请输入密码" :maxlength= 16 v-model="password">
			    <template slot="prepend">密码：</template>
			</el-input>	
		</div>
		<div>
			<el-button @click="loginst" type="primary">登录</el-button>
			<el-button @click="reg" type="primary">注册</el-button>
		</div>
	</div>
</div>
	

</template>

<script>
	import router from "../../../router/index.js"
	import {mapActions} from "vuex"
	import {LOGIN} from "../../../store/app/app.js"
	import axios from "axios"

	export default {
		name:"login",
		data(){
			return {
				username: this.$route.params.username || "",
				password: ""
			}
		},
		methods:{
			reg(){
				router.push("/reg")
			},
			loginst(){

				this.LOGIN({
					username:this.username,
					password:this.password})
				// router.push("/info")
			},
			...mapActions("app",["LOGIN"]),
		},
	}
</script>

<style scoped>
	.mingst{
		width: 100%;
		min-height: 100vh;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-direction:  row;
		align-items: center;
	}
	.maive{
		width: 300px;
		display: flex;
		flex-wrap: wrap;
		justify-content: center;
		flex-direction:  row;
		align-items: center;

	}
	div{
		margin-bottom: 10px;
	}
</style>