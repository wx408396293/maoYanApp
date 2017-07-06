<template>
  <div>
    <h3 class="studi-itle">影院管理</h3>
    <el-tabs type="border-card" class="studio">
      <el-tab-pane label="新增影院" >
        <add-studio />
      </el-tab-pane>
      <el-tab-pane label="影院列表">
        <studioList />
      </el-tab-pane>
    </el-tabs>
  </div>
</template>

<script>
import router from "../../../../router/index.js";
import axios from "axios";
import addStudio from "./addStudio.vue";
import studioList from "./studioList.vue";
export default {
  name: 'studio',
  components: {
    addStudio,
    studioList
  }
}
</script>

<style scoped>
.studio {
  width: 100%;
}
.studi-itle {
  height: 50px;
  line-height: 50px;
  color: #666;
  background-color: #f2f2f2;
  padding-left: 10px;
  margin-bottom: 20px;
}
</style>