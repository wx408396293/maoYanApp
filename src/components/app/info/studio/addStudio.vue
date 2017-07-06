<template>
	<div>
		<el-form :model="ruleForm" :rules="rules" ref="ruleForm">
      <el-form-item prop="name">
				<el-input placeholder="请输入影院名称" v-model="ruleForm.name" class="input-box" auto-complete="on">
		      <template slot="prepend">影院名称</template>
		    </el-input>
      </el-form-item>
      <el-form-item prop="address">
      	<el-input placeholder="请输入影院地址" v-model="ruleForm.address" class="input-box" auto-complete="on">
		      <template slot="prepend">影院地址</template>
		    </el-input>
      </el-form-item>
      <el-form-item>
        <el-button type="primary" size="small" class="btn" @click="submitForm('ruleForm')">提 交</el-button>
        <el-button size="small" class="btn" @click="resetForm">重 置</el-button>
      </el-form-item>
    </el-form>
	</div> 
</template>

<script>
import router from "../../../../router/index.js";
import axios from "axios";

export default {
  name: 'addStudio',
	data() {
    var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入影院名称'));
      } else {
        if (this.ruleForm.address !== '') {
          this.$refs.ruleForm.validateField('address');
        }
        callback();
      }
    };
    var validatePass2 = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入影院地址'));
      } else {
      	callback();
      }
    };
    return {
      ruleForm: {
        name: '',
        address: '',
      },
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        address: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      }
    };
  },
  methods: {
  	async submitForm() {
      if (this.ruleForm.name !== "" && this.ruleForm.address !== "") {
        const {
          data
        } = await axios.post("http://localhost:3001/studio/addStudio", {    
          name: this.ruleForm.name,
          address: this.ruleForm.address
        });
        if (data) {
          this.ruleForm.name = "";
          this.ruleForm.address = ""
          alert('新增成功');
        } else {
          alert('新增失败');
        }
      } else {
        alert('请输入完整信息');
      } 		
    },
    resetForm() {
      this.ruleForm = {
        name: "",
        address: ""
      }
    }
  }
}
</script>

<style scoped>
.input-box {
  width: 400px;
}
.btn {
  width: 80px;
}
</style>