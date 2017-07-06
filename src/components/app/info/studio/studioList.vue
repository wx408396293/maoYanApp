<template>
  <div>
  	<!-- 影院列表 -->
  	<el-table :data="page.data"  border style="width: 100%">
	    <el-table-column prop="name" label="影院名称" width="300"></el-table-column>
	    <el-table-column prop="address" label="影院地址" min-width="500"></el-table-column>
	    <el-table-column label="操作"  width="250">
	      <template scope="scope">
	        <el-button type="text" size="small" @click="addTheaterBtn(scope.row)">新增放映厅</el-button>
	        <el-button type="text" size="small" @click="updateStudioBtn(scope.row)">修改</el-button>
	        <el-button type="text" size="small" @click="deleteStudio(scope.row)">删除</el-button>
	        <el-button type="text" size="small" @click="getTheaterList(scope.row)">查看放映厅</el-button>
	      </template>
	    </el-table-column>
  	</el-table>
		<!-- 影院分页信息 -->
    <div class="studio-page">
      <el-pagination
        @size-change="setEachpage"
        @current-change="setCurpage"
        :page-sizes="[5, 10]"
        :page-size="~~page.eachPage"
        layout="total, sizes, prev, pager, next"
        :total="page.count">
      </el-pagination>
    </div>
		<!-- 新增影厅 -->
		<el-dialog title="新增影厅" :visible.sync="theaterData.addTheaterState" size="tiny">
      <el-form >
        <el-form-item>
          <el-input placeholder="请输入影厅名称" v-model="theaterData.name" class="input-box" auto-complete="on">
            <template slot="prepend">影厅名称</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn" @click="cancelAddTheater">取 消</el-button>
        <el-button type="primary" size="small" class="btn" @click="addTheater">确 定</el-button>
      </div>
    </el-dialog>
		<!-- 修改影院信息 -->
  	<el-dialog title="修改影院信息" :visible.sync="updateStudioState" size="tiny">
		  <el-form :model="studioData" :rules="rules" ref="studioData">
	      <el-form-item prop="name">
					<el-input placeholder="请输入影院名称" v-model="studioData.name" class="input-box" auto-complete="off">
			      <template slot="prepend">影院名称</template>
			    </el-input>
	      </el-form-item>
	      <el-form-item prop="address">
	      	<el-input placeholder="请输入影院地址" v-model="studioData.address" class="input-box" auto-complete="off">
			      <template slot="prepend">影院地址</template>
			    </el-input>
	      </el-form-item>
	    </el-form>
		  <div slot="footer" class="dialog-footer">
		    <el-button size="small" class="btn" @click="updateStudioState = false">取 消</el-button>
		    <el-button type="primary" size="small" class="btn" @click="updateStudio">确 定</el-button>
		  </div>
		</el-dialog>

		<!-- 查看影厅列表 -->
		<el-dialog title="影厅列表" :visible.sync="theaterData.theaterListState" size="tiny">
      <el-table :data="theaterPage.data"  border style="width: 360px">
        <el-table-column prop="name" label="影厅名称" width="259"></el-table-column>
        <el-table-column label="操作" width="100" >
          <template scope="scope">
            <el-button type="text" size="small" @click="updateTheaterBtn(scope.row)">修改</el-button>
            <el-button type="text" size="small" @click="deleteTheater(scope.row)">删除</el-button>
          </template>
        </el-table-column>
      </el-table>
      <div class="theater-page">
        <el-pagination
          @size-change="setTheaterEachpage"
          @current-change="setTheaterCurpage"
          :page-sizes="[5, 10]"
          :page-size="~~theaterPage.eachPage"
          layout="total, sizes, prev, pager, next"
          :total="theaterPage.count">
        </el-pagination>
      </div>
    </el-dialog>
		<!-- 修改影厅信息 -->
    <el-dialog title="修改影厅信息" :visible.sync="theaterData.updateTheaterState" size="tiny">
      <el-form >
        <el-form-item prop="name">
          <el-input placeholder="请输入影厅名称" v-model="theaterData.name" class="input-box" auto-complete="on">
            <template slot="prepend">影厅名称</template>
          </el-input>
        </el-form-item>
      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button size="small" class="btn" @click="theaterData.updateTheaterState = false">取 消</el-button>
        <el-button type="primary" size="small" class="btn" @click="updateTheater">确 定</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
import router from "../../../../router/index.js";
import axios from "axios";
export default {
  name: 'studioList',
  data() {
  	//新增影院输入框验证规则
  	var validatePass = (rule, value, callback) => {
      if (value === '') {
        callback(new Error('请输入影院名称'));
      } else {
        if (this.studioData.address !== '') {
          this.$refs.studioData.validateField('address');
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
    	//影院数据
    	page: {
				curPage: 1,
				eachPage: 10,
				maxPage: 1,
				count: 1,
				data: []
			},
			//影厅数据
			theaterPage: {
				curPage: 1,
				eachPage: 5,
				maxPage: 1,
				count: 1,
				data: []
			},
			//修改影院弹出框状态
			updateStudioState: false,
			//影院状态值
			studioData: {
        name: '',
        address: '',
        studioId: ""
      },
      //新增影院输入框验证规则
      rules: {
        name: [
          { validator: validatePass, trigger: 'blur' }
        ],
        address: [
          { validator: validatePass2, trigger: 'blur' }
        ],
      },
      //影厅状态值
      theaterData: {     	
      	name: "",
      	theaterId: "",
      	addTheaterState: false,
        theaterListState: false,
        updateTheaterState: false,
      }
    }
  },
  mounted() {
  	this.getStudio()
  },
  methods: {
  	async getStudio() {
  		const {
				data
			} = await axios.get("http://localhost:3001/studio/query", {
				params: {
					page: this.page.curPage,
					rows: this.page.eachPage
				}
			})

			this.page.data = data.rows
			this.page.count = data.total
  	},
  	addTheaterBtn(row) {
  		this.theaterData.addTheaterState = true
  		this.studioData.studioId = row._id
  	},
  	async addTheater() {
      if (this.theaterData.name !== "" && this.studioData.studioId !== "") {
        const {
          data
        } = await axios.post("http://localhost:3001/theater/addTheater", {
          name: this.theaterData.name,
          studioId: this.studioData.studioId
        })
        console.log(data)
        this.theaterData.name = ""
        this.theaterData.addTheaterState = false
      } else {
      	alert('影厅名字不能为空');
      }     
    },
    //新增影厅取消按钮
    cancelAddTheater() {
      this.theaterData.addTheaterState = false,
      this.theaterData.name = ""
    },
  	updateStudioBtn(row) {
  		//显示弹出框
  		this.updateStudioState = true
  		//获取点击行的信息
  		this.studioData.name = row.name
  		this.studioData.address = row.address
  		this.studioData.studioId = row._id		
  	},
  	//修改影院信息
  	async updateStudio() {
  		const data = await axios.get("http://localhost:3001/studio/updateStudio", {
  			params: {
  				name: this.studioData.name,
  				address: this.studioData.address,
  				studioId: this.studioData.studioId
  			}
  		})
  		//隐藏弹出框
  		this.updateStudioState = false
  		//刷新列表
  		this.getStudio()
  	},
  	//删除影院
  	async deleteStudio(row) {
  		this.studioData.studioId = row._id
  		const data = await axios.get("http://localhost:3001/studio/deleteStudio", {
  			params: {
  				studioId: this.studioData.studioId
  			}
  		})
  		this.getStudio()
  	},
  	getTheaterList(row) {
  		this.studioData.studioId = row._id
  		this.theaterData.theaterListState = true
  		this.getTheater()
  	},
    setEachpage(val) {
      this.page.eachPage = val
      this.getStudio()
    },
    setCurpage(val) {
      this.page.curPage = val
      this.getStudio()
    },
    //获取影厅列表
    async getTheater() {
      const {
        data
      } = await axios.get("http://localhost:3001/theater/getTheatersByStudioId", {
        params: {
          page: this.theaterPage.curPage,
          rows: this.theaterPage.eachPage,
          studioId: this.studioData.studioId
        }
      })
      this.theaterPage.count = data.total;
      this.theaterPage.data = data.rows
    },
    updateTheaterBtn(row) {
      //显示弹出框
      this.theaterData.updateTheaterState = true
      this.theaterData.name = row.name,
      this.theaterData.theaterId = row._id
    },
    async updateTheater() {
      this.theaterData.updateTheaterState = false
      const {
        data
      } = await axios.get("http://localhost:3001/theater/updateTheater", {
        params: {
          name: this.theaterData.name,
          theaterId: this.theaterData.theaterId
        }
      })
      this.theaterData.name = ""
      this.getTheater()
    },
    async deleteTheater(row) {
      this.theaterData.theaterId = row._id 
      const {
        data
      } = await axios.get("http://localhost:3001/theater/deleteTheater", {
        params: {
          theaterId: this.theaterData.theaterId,
          studioId: this.studioData.studioId
        }
      })
      this.getTheater()
    },
    setTheaterEachpage(val) {
      this.theaterPage.eachPage = val
      this.getTheater()
    },
    setTheaterCurpage(val) {
      this.theaterPage.curPage = val
      this.getTheater()
    }
  }
}
</script>

<style scoped>
.btn {
  width: 80px;
}
.studio-page {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
.theater-page {
  display: flex;
  justify-content: center;
  margin-top: 10px;
}
</style>