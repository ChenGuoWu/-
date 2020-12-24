<template>
  <el-dialog
    title="新增"
    :visible.sync="$store.state.dialogVisible"
    width="40%"
    :before-close="handleClose"
  >
    <el-form
      :model="ruleForm"
      :rules="rules"
      ref="ruleForm"
      label-width="100px"
      class="demo-ruleForm"
    >
      <el-form-item label="名称" prop="input">
        <el-input
          v-model="ruleForm.input"
          placeholder="请输入名称"
          class="inputs"
        ></el-input>
      </el-form-item>
      <el-form-item label="内容" prop="textarea" v-if="tempTableData">
        <el-input
          type="textarea"
          :rows="2"
          placeholder="请输入内容"
          v-model="ruleForm.textarea"
          class="inputs"
        >
        </el-input>
      </el-form-item>
    </el-form>
    <span slot="footer" class="dialog-footer">
      <el-button @click="cancle">取 消</el-button>
      <el-button type="primary" @click="sure('ruleForm')">确 定</el-button>
    </span>
  </el-dialog>
</template>
<script>
import { mapState } from "vuex";
import { saveList, dirList, changelist } from "@/api/api";
import { mapMutations } from "vuex";
export default {
  mounted() {
  },
  props: {
    parentDir: {
      type: String,
    },
    tempTable: {
      type: Boolean,
    },
  },
  computed: {
    ...mapState(["tableList"]),
  },
  watch: {
    parentDir(n, o) {
      //n为新值,o为旧值;
      this.parentDir = n;
    },
    tempTable(n, o) {
      //n为新值,o为旧值;
      this.tempTableData = n;
    },
  },
  data() {
    return {
      ruleForm: {
        textarea: "",
        input: "",
      },
      rules: {
        textarea: [{ required: true, message: "请输入内容", trigger: "blur" }],
        input: [{ required: true, message: "请输入名称", trigger: "blur" }],
      },
      tempTableData: true,
    };
  },
  methods: {
    ...mapMutations([
      "changedialogVisibleFalse",
      "SetparentDir",
      "SettableData",
    ]),
    handleClose(done) {
      this.$confirm("确认关闭？")
        .then((_) => {
          done();
        })
        .catch((_) => {});
      // this.tempTableData = true;
      this.resizeQuery();

      this.resetForm();
    },
    cancle() {
      this.changedialogVisibleFalse();
      this.resizeQuery();
      // this.tempTableData = true;
      this.resetForm();
    },
    sure(ruleForm) {
      this.$refs[ruleForm].validate((valid) => {
        if (valid) {
          if (this.tempTableData) {
            this.addList();
          } else {
            this.addTableList();
          }

          this.changedialogVisibleFalse();
          // this.tempTableData = true;
        } else {
          console.log("error submit!!");
          return false;
        }
      });
    },
    //新增接口
    addList() {
      const params = {
        parentDir: this.parentDir,
        name: this.ruleForm.input,
        context: this.ruleForm.textarea,
      };
      saveList(params).then((res) => {
        this.$message(res.data.msg);
        //更新数据
        this.resizeQuery();
        //发送请求重新渲染当前页面
        if (this.tableList.length) {
          //说明不在第一层
          const params = this.tableList[this.tableList.length - 1];
          changelist(params).then((res) => {
            //覆盖数据
            this.SetparentDir(res.data.parentDir);
            this.SettableData(res.data.list);
          });
        } else {
          this.$emit("getlists");
        }
      });
    },
    //新增目录接口
    addTableList() {
      const params = {
        parentDir: this.parentDir,
        name: this.ruleForm.input,
      };
      dirList(params).then((res) => {
        this.$message(res.data.msg);
        //更新数据

        this.resizeQuery();
        if (this.tableList.length) {
          //说明不在第一层
          const params = this.tableList[this.tableList.length - 1];
          changelist(params).then((res) => {
            //覆盖数据
            this.SetparentDir(res.data.parentDir);
            this.SettableData(res.data.list);
          });
        } else {
          this.$emit("getlists");
        }
      });
    },
    //重置查询表单
    resizeQuery() {
      Object.keys(this.ruleForm).forEach((key) => {
        this.ruleForm[key] = "";
      });
    },
    resetForm() {
      this.$refs.ruleForm.resetFields();
    },
  },
};
</script>
<style lang="scss" scoped>
.inputs {
  margin: 10px 0;
}
</style>