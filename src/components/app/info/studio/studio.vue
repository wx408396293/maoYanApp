<template>
  <div>
    <h1>影院</h1>
    <el-tabs type="border-card" class="studio">
      <el-tab-pane label="新增影院">
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
  },
  data() {
    return {
      
    }
  },
  methods: {
    
  }
}
</script>

<style scoped>
.studio {
  width: 800px;
}

</style>