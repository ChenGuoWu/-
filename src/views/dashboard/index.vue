<template>
  <div>
    <div class="tables">
      <el-breadcrumb separator-class="el-icon-arrow-right">
        <span
          v-for="(item, index) in breadcrumbList"
          :key="index"
          @click="gotoList(index)"
          class="spansbred"
          >{{ item }} >
        </span>
      </el-breadcrumb>
      <el-button
        type="primary"
        class="add"
        @click="goback"
        v-if="tableList.length"
        >返回上一级</el-button
      >
      <el-button type="primary" class="add" @click="addList"
        >新增文件</el-button
      >
      <el-button type="primary" class="add" @click="addListTable"
        >新增目录</el-button
      >
      <el-table :data="tableData"  style="width: 100%" :default-sort = "{prop: 'name', order: 'descending'}" :header-cell-style="{padding: '0',height:'30px'}"  :cell-style="{padding: '0',height:'30px'}">
        <el-table-column prop="name" label="名称"  sortable>
        </el-table-column>
        <el-table-column prop="type" label="类型" width="150"  sortable>
          <template slot-scope="scope">
            <div>{{ scope.row.type == "dir" ? "目录" : "文件" }}</div>
          </template>
        </el-table-column>
        <el-table-column prop="changeTime" label="日期" width="250"  sortable>
        </el-table-column>
        <el-table-column label="操作" width="260">
          <template slot-scope="scope">
            <el-button
              @click="handleClick(scope.row)"
              type="text"
              size="small"
              v-if="scope.row.type == 'file'"
              >编辑</el-button
            >

            <el-button
              type="text"
              size="small"
              @click="changeClick(scope.row)"
              v-if="scope.row.type == 'dir'"
              >切换</el-button
            >
            <el-button type="text" size="small" @click="deleteLists(scope.row)"
              >删除</el-button
            >
          </template>
        </el-table-column>
      </el-table>
    </div>

    <dialogs
      :parentDir="parentDir"
      v-on:getlists="cache"
      :tempTable="tempTable"
    >
    </dialogs>
  </div>
</template>
<script>
import { mapMutations, mapState } from "vuex";
import dialogs from "../../components/dialog.vue";
import axios from "axios";
import { getlist, changelist, editList, deleteList } from "@/api/api";
export default {
  components: {
    dialogs,
  },
  computed: {
    ...mapState(["tableList", "breadcrumbList", "parentDir", "tableData"]),
  },
  methods: {
    ...mapMutations([
      "changedialogVisibleTrue",
      "addtableList",
      "poptableList",
      "addbreadcrumbList",
      "popbreadcrumbList",
      "tableListNull",
      "splicebreadcrumbLists",
      "SetparentDir",
      "SettableData",
      "breadcrumbLists",
      "SettableList",
      "splicetableList",
      "breadcrumbListsNull",
    ]),
    //获取初始数据
    getlists() {
      if (this.$route.query.params) {
        //说明从编辑页面跳转
        if (this.tableList.length) {
          let params;

          if (this.$route.query.pop) {
            //说明是编辑页面点击返回上一级跳转过来
            params = this.tableList[this.tableList.length - 1];
          } else {
            params = this.tableList[this.$route.query.index - 1];
          }
          if (this.$route.query.index == 0) {
            if (this.$route.query.index == 0) {
              //说明点击的最大层级 这块有点乱
              getlist().then((res) => {
                this.SetparentDir(res.data.parentDir);
                this.SettableData(res.data.list);
                this.tableListNull();
                this.breadcrumbListsNull();
                return;
              });
            }
          }
          //这儿有问题  编辑之后返回层级变了  解决返回第一层的问题 编辑页 点返回
          else if (this.$route.query.pop) {
            if (!this.tableList.length) {
              //说明编辑点击的只有一层了
              getlist().then((res) => {
                this.SetparentDir(res.data.parentDir);
                this.SettableData(res.data.list);
                this.tableListNull();
                this.breadcrumbListsNull();
                return;
              });
            }
          }
          //这儿有问题
          else {
            changelist(params).then((res) => {
              //覆盖数据
              this.SetparentDir(res.data.parentDir);
              this.SettableData(res.data.list);
              //删除面包屑
              if (this.$route.query.pop) {
                this.poptableList();
              } else {
                this.splicebreadcrumbLists(this.$route.query.index);
                this.splicetableList(this.$route.query.index);
              }
            });
          }
        } else {
          //如果数组不存在长度那么直接渲染初始数据
          getlist().then((res) => {
            alert(11)
            this.SetparentDir(res.data.parentDir);
            this.SettableData(res.data.list);
            if (!this.$route.query.pop) {
              this.splicebreadcrumbLists(this.$route.query.index);
            }

            this.tableListNull();
          });
        }
      } else {
        getlist().then((res) => {
          this.SetparentDir(res.data.parentDir);
          this.SettableData(res.data.list);
          this.tableListNull();
          this.breadcrumbListsNull();
        });
      }
    },
    handleClick(row) {
      this.addbreadcrumbList(row.name);
      const params = {
        parentDir: this.parentDir,
        name: row.name,
      };
      editList(params).then((res) => {
        const params = {
          context: res.data.context,
          parentDir: this.parentDir,
          name: row.name,
        };

        //跳转至编辑界面
        this.$router.push({ path: "/home/edit", query: params });
      });
    },
    //新增数据
    addList() {
      //打开弹出框
      this.tempTable = true;
      this.changedialogVisibleTrue();
    },
    //切换目录
    changeClick(row) {
      const params = {
        parentDir: this.parentDir,
        name: row.name,
        type: row.type,
      };
      this.paramses = params;
      this.addtableList(params);
      this.addbreadcrumbList(row.name);
      changelist(params).then((res) => {
        //覆盖数据
        this.SetparentDir(res.data.parentDir);
        this.SettableData(res.data.list);
      });
    },
    //返回上一级
    goback() {
      this.poptableList();
      this.popbreadcrumbList();
      if (this.tableList.length) {
        //拿到数组倒数第二个数据并且删除最后一个数据
        let params = this.tableList[this.tableList.length - 1];
        changelist(params).then((res) => {
          //覆盖数据
          this.SetparentDir(res.data.parentDir);
          this.SettableData(res.data.list);
          //做缓存 把上一级传的参数缓存起来 
          this.paramses=params;
        });
      } else {
        this.getlists();
      }
    },
    //删除文件
    deleteLists(row) {
      this.$confirm("此操作将永久删除该文件, 是否继续?", "提示", {
        confirmButtonText: "确定",
        cancelButtonText: "取消",
        type: "warning",
      })
        .then(() => {
          const params = {
            parentDir: this.parentDir,
            name: row.name,
            type: row.type,
          };
          deleteList(params).then((res) => {
            this.$message(res.data.msg);
            //刷新页面
            if (this.tableList.length) {
          //说明不在第一层
          const params = this.tableList[this.tableList.length - 1];
          changelist(params).then((res) => {
            //覆盖数据
            this.SetparentDir(res.data.parentDir);
            this.SettableData(res.data.list);
          });
        } else {
             getlist().then((res) => {
          this.SetparentDir(res.data.parentDir);
          this.SettableData(res.data.list);
        
        });
        }
          });
        })
        .catch(() => {
          this.$message({
            type: "info",
            message: "已取消删除",
          });
        });
    },
    gotoList(index) {
      if (index == 0) {
        //删除面包屑
        this.splicebreadcrumbLists(index);
        //如果数组不存在长度那么直接渲染初始数据
        getlist().then((res) => {
          this.SetparentDir(res.data.parentDir);
          this.SettableData(res.data.list);
        });
        //清空数组tableList
        this.tableListNull();
      } else {
        const params = this.tableList[index - 1];
        changelist(params).then((res) => {
          //覆盖数据
          this.SetparentDir(res.data.parentDir);
          this.SettableData(res.data.list);
          //删除面包屑
          this.splicebreadcrumbLists(index);
          this.splicetableList(index);
        });
      }
    },
    //新增目录
    addListTable() {
      //打开弹出框
      this.tempTable = false;
      this.changedialogVisibleTrue();
    },
    //刷新时 缓存当前页面

    beforeunloadHandler() {
      if (
        this.breadcrumbList.length &&
        this.tableList.length &&
        this.paramses.name
      ) {
        localStorage.setItem(
          "keys",
          JSON.stringify({
            key: this.breadcrumbList,
            keytable: this.tableList,
            paramses: this.paramses,
          })
        );
      }
    },
    //缓存
    cache() {
      //说明有点击过切换
      //写在最上面才能监听到
      window.addEventListener("beforeunload", (e) =>
        this.beforeunloadHandler(e)
      );
      if (localStorage.getItem("keys")) {
        if (JSON.parse(localStorage.getItem("keys")).paramses.name) {
          this.breadcrumbLists(JSON.parse(localStorage.getItem("keys")).key);
          this.SettableList(JSON.parse(localStorage.getItem("keys")).keytable);
          this.paramses = JSON.parse(localStorage.getItem("keys")).paramses;
          localStorage.removeItem("keys");
          changelist(this.paramses).then((res) => {
            //覆盖数据
            this.SetparentDir(res.data.parentDir);
            this.SettableData(res.data.list);
          });
        }
      } else {
        this.getlists();
      }
    },
  },

  created() {
    this.cache();
  },
  data() {
    return {
      tempTable: true, //是否显示内容输入框
      paramses: {}, //是否有过点击切换
    };
  },
};
</script>
<style lang="scss" scoped>
.add {
  margin-bottom: 10px;
  margin-top: 10px;
}
.tables {
  height: calc(100vh - 160px);
}
.spansbred:hover {
  color: #409eff !important;
  cursor: pointer !important;
}




</style>