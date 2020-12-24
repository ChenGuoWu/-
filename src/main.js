import Vue from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import ElementUI from 'element-ui';
import 'element-ui/lib/theme-chalk/index.css';
Vue.use(ElementUI);
// import 'lib-flexible';
// import { Toast } from "vant";
// Vue.prototype.$Toast = Toast
// import axios from 'axios'
// axios.defaults.baseURL = 'http://192.168.65.29:8085';
Vue.config.productionTip = false;



let vue= new Vue({
  router,
  store,
  render: h => h(App)
}).$mount("#app");

export default vue

