<template>
  <div>
    <el-breadcrumb separator-class="el-icon-arrow-right">
      <span
        v-for="(item, index) in breadcrumbList"
        :key="index"
        @click="gotoList(index)"
        class="spansbred"
        >{{ item }} >
      </span>
    </el-breadcrumb>
    <el-button type="primary" class="add" @click="goback">返回上一级</el-button>
    <el-input
      class="textare"
      type="textarea"
      :autosize="{ minRows: 2 }"
      placeholder="请输入内容"
      v-model="textarea2"
    >
    </el-input>
    <el-button type="primary" class="add" @click="saveContext">保存</el-button>
  </div>
</template>
<script>
import { saveList, getlist, changelist } from "@/api/api";
import { mapState, mapMutations } from "vuex";
export default {
  created() {
    this.cach();
  },
  mounted() {
    this.textarea2 = this.$route.query.context;
  },
  computed: {
    ...mapState(["breadcrumbList", "parentDir", "tableData", "tableList"]),
  },
  data() {
    return {
      textarea2: "",
    };
  },
  methods: {
    ...mapMutations([
      "popbreadcrumbList",
      "splicebreadcrumbLists",
      "tableListNull",
      "SetparentDir",
      "SettableData",
      "breadcrumbLists",
      "SettableList",
      "splicetableList",
    ]),
    //vuex持久化缓存方案

    beforeunloadHandler() {
      localStorage.setItem(
        "key",
        JSON.stringify({ key: this.breadcrumbList, keytable: this.tableList })
      );
    },
    //vuex持久化缓存方案
    cach() {
      //写在最上面才能监听到
      window.addEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      //vuex持久化缓存方案
      if (this.breadcrumbList.length) {
        return;
      }
      if (localStorage.getItem("key")) {
        this.breadcrumbLists(JSON.parse(localStorage.getItem("key")).key);
        this.SettableList(JSON.parse(localStorage.getItem("key")).keytable);
        localStorage.removeItem("key");
      }

      //   //vuex持久化缓存方案
    },
    //返回上一级
    goback() {
      //跳转至首界面
      this.$router.push({
        path: "/home/dashboard",
        query: { params: "edit", pop: true },
      });
      this.popbreadcrumbList();
    },
    //保存
    saveContext() {
      const params = {
        context: this.textarea2,
        parentDir: this.$route.query.parentDir,
        name: this.$route.query.name,
      };
      saveList(params).then((res) => {
        this.$message(res.data.msg);
        this.$router.push({
          path: "/home/dashboard",
          query: { params: "edit", pop: true },
        });
        this.popbreadcrumbList();
      });
    },
    //面包屑
    gotoList(index) {
      //跳转回原页面
      this.$router.push({
        path: "/home/dashboard",
        query: { params: "edit", index: index },
      });
    },
  },
};
</script>
<style lang="scss" scoped>
.textare {
  margin-bottom: 10px;
  margin-top: 10px;
}
.add {
  margin-top: 10px;
}
.spansbred:hover {
  color: #409eff !important;
  cursor: pointer !important;
}
</style>