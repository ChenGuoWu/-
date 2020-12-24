import axios from 'axios'
import qs from 'qs'
import context from '../main.js'
// import { Notify } from 'vant';
axios.defaults.baseURL = process.env.VUE_APP_BASE_URL;
console.log( axios.defaults.baseURL)
const http = {}
let loading;
var instance = axios.create({
    timeout: 5000,
    // baseURL: process.env.VUE_APP_BASE_URL,
    validateStatus(status) {
        switch (status) {
            case 400:
                context.$message('请求出错');
                break
            case 401:
                context.$message('授权失败，请重新登录');
                return
            case 403:
                context.$message('拒绝访问');
                break
            case 404:
                context.$message('请求错误,未找到该资源');
                break
            case 500:
                context.$message('服务端错误');
                break
        }
        return status >= 200 && status < 300
    }
})
// instance.defaults.headers.post['Content-Type'] = 'application/json;charset=UTF-8';
// instance.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded';
    // 添加请求拦截器
instance.interceptors.request.use(
        function(config) {
            // 展示loading
            loading = context.$loading({
                lock: true,
                text: 'Loading',
                spinner: 'el-icon-loading',
                background: 'rgba(0, 0, 0, 0.7)'
              });
            //   if (config.methods==='get') {
            //     config.data=true;
            //   }
            //   config.headers={
            //     'Content-Type':'application/json;charset=UTF-8'
            //   }
                // 请求头添加token
            // if (window.localStorage.getItem('userToken')) {
            //     config.headers.token =window.localStorage.getItem('userToken')
            // }
            return config
        },
        function(error) {
            return Promise.reject(error)
        }
    )
    // 响应拦截器即异常处理
instance.interceptors.response.use(
    response => {
        // 隐藏设置全局loading
        loading.close();
        return response//这里可以减少一层data 根据后端返回的情况来定
    },
    err => {
        if (err && err.response) {} else {
            err.message = '连接服务器失败'
        }
        return Promise.reject(err.response)
    }
)
http.get = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .get(url, options)
            .then(response => {
                if (response.status === 200) { //这里状态码可能不同不一定是status
                    resolve(response)
                } else {
                    reject(response.msg)//这里看看是msg还是啥
                }
             
            })
            .catch(e => {
                console.log(e)
            })
    })
}
http.post = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .post(url, options)
            .then(response => {
                if (response.status === 200) {//这里状态码可能不同
                    resolve(response)
                } else {
                    reject(response.message)  //这里也是一样
                }
             
            })
            .catch(e => {
                console.log(e)
            })
    })
}
http.put = function(url, options) {
    return new Promise((resolve, reject) => {
        instance
            .put(url, options)
            .then(response => {
                if (response.status === 200) {//这里状态码可能不同
                    resolve(response)
                } else {
                    reject(response.message)  //这里也是一样
                }
             
            })
            .catch(e => {
                console.log(e)
            })
    })
}


export default http