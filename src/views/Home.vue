<template>
  <el-container style="height: 100vh; border: 1px solid #eee">
    <!-- <el-aside width="200px" style="background-color: rgb(238, 241, 246)">
      <el-menu   default-active="1-1">
        <el-menu-item  index="1-1">首页</el-menu-item>
      </el-menu>
    </el-aside> -->

    <el-container>
      <el-header style="text-align: right; font-size: 12px">
        <el-dropdown>
          <el-dropdown-menu>
            <i class="el-icon-setting" style="margin-right: 15px"></i>
          </el-dropdown-menu>
        </el-dropdown>
        <span>内部专用</span>
      </el-header>

      <el-main>
        <router-view></router-view>
      </el-main>
    </el-container>
  </el-container>
</template>
<script>
import { mapMutations } from "vuex";
export default {
  created() {
   
  },
  methods: {
  },
  destroyed() {
    // localStorage.removeItem("keys");
    //  window.addEventListener("beforeunload", (e) => this.beforeunloadHandler(e));
  },
};
</script>
<style lang="scss" scoped>
.el-header {
  background-color: #b3c0d1;
  color: #333;
  line-height: 60px;
}

.el-aside {
  color: #333;
}
</style>>


