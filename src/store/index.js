import Vue from "vue";
import Vuex from "vuex";

Vue.use(Vuex);

export default new Vuex.Store({
  state: {
    dialogVisible: false,
    tableList: [], //目录列表
    breadcrumbList: [],//面包屑数据
    parentDir:'',//页面分开不得不写在这
    tableData:[],//页面分开不得不写在这
  },
  mutations: {
    
    changedialogVisibleTrue(state, value) {
      state.dialogVisible = true;
    },
    changedialogVisibleFalse(state, value) {
      state.dialogVisible = false;
    },
    //增加数组
    addtableList(state, value) {
      state.tableList.push(value);
    },
    //删除数组最后一个
    poptableList(state, value) {
      state.tableList.pop();
    },
    //删除数组
    splicetableList(state, value){
      state.tableList.splice(value)
    },
    //增加面包屑数组
    addbreadcrumbList(state, value) {
      state.breadcrumbList.push(value);
    },
    //删除面包屑数组最后一个
    popbreadcrumbList(state, value) {
      state.breadcrumbList.pop();
    },
    //赋值面包屑
    breadcrumbLists(state, value) {
      state.breadcrumbList = value;
    },
    //删除面包屑
    splicebreadcrumbLists(state, value){
      state.breadcrumbList.splice(value)
    },
    //清空面包屑
    breadcrumbListsNull(state, value){
      state.breadcrumbList=[];
    },
    //重置目录列表
    tableListNull(state, value) {
      state.tableList = [];
    },
    //赋值parentDir
    SetparentDir(state, value){
      state.parentDir = value;
    },
    //tableData
    SettableData(state, value){
      state.tableData = value;
    },
    //tableList赋值数组
    SettableList(state, value){
      state.tableList = value;
    }
  },
  actions: {},
  modules: {
   
  }
});
