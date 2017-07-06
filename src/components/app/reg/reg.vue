<template>
	<div class="mingst">
		<div class="maive">
			<el-form :model="users" :rules="rules" ref="users" label-width="100px" class="demo-ruleForm">
			  	<el-form-item label="用户名" prop="username">
			    	<el-input v-model="users.username" @blur="blurName" ></el-input>
			    </el-form-item>
			    <el-form-item label="密码" prop="password">
			    	<el-input type="password" v-model="users.password"></el-input>
			    </el-form-item>
			</el-form-item>
			<el-form-item>
			    <el-button :disabled="button" type="primary" @click="login">注册</el-button>
			    <el-button type="primary" @click="cancel">取消</el-button>
			</el-form-item>
			</el-form>
		</div>
	</div>
	

</template>

<script>
	import router from "../../../router/index.js"
	export default {
		name:"reg",
		data(){
			return {
				users:{
					username:"",
					password:"",
				},
		        rules: {
		          username: [
		            { required: true, message: '请输入密码', trigger: 'blur' },
		            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
		          ],
		          password: [
		            { required: true, message: '请输入密码', trigger: 'blur' },
		            { min: 6, max: 16, message: '长度在 6 到 16 个字符', trigger: 'blur' }
		          ],
		        }
			}
		},
		methods:{
			login(){
				if (this.users.username.trim() !=="") {
					localStorage.isLogin = true
					router.push(`/login/${this.users.username}`)
				}
			},
		}
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
</style>