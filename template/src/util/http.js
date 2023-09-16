/**
 * 封装统一的ajax请求
 */
import axios from 'axios'

import store from '@/store/index'
import { Message } from 'element-ui';
import common from '@/util/common'

/**
 * axios请求拦截器
 * @param {object} config axios请求配置对象
 * @return {object} 请求成功或失败时返回的配置对象或者promise error对象
 **/

axios.interceptors.request.use(config => { 
  if(store.state.common.partLoading == false)
    store.dispatch('showLoading');
  config.headers['Content-Type'] = 'application/json; charset=utf-8';
  config.headers['X-Requested-With'] = 'XMLHttpRequest';
  if(store.state.user.token){
    config.headers['Authorization'] = `Bearer ${store.state.user.token}`;
  }
  return config
}, error => {
  store.dispatch('closeLoading')
  return Promise.reject(error)
})

/**
 * axios 响应拦截器
 * @param {object} response 从服务端响应的数据对象或者error对象
 * @return {object} 响应成功或失败时返回的响应对象或者promise error对象
 **/
axios.interceptors.response.use(response => {
  store.dispatch('closeLoading')
  return Promise.resolve(response)
}, error => {
  Message.closeAll();
  if (error.code === 'ECONNABORTED'){
    Message.error('请求超时，请重新尝试！')
  }
  let response = error.response || error

  console.log(response)
  let res = response.data||response;
  
  if(res.msg == 'Signature has expired' || res.code == 1001 ){
    res.msg = '用户过期'
    common.delCookie(common.dataKey)
    store.commit('setToken',undefined)
    window.location.href = '/index.html/#/login'
  }
  if(res.msg == 'Wrong number of segments' && common.getCookie(common.dataKey) == null ){
      window.location.href = '/index.html/#/login'
  }

  Message.error(res?.msg|| '服务器错误，请稍后尝试！')

  store.dispatch('closeLoading')
  return Promise.reject(response)
})

/**
 * 请求发出后检查返回的状态码,统一捕获正确和错误的状态码，正确就直接返回response,错误就自定义一个返回对象
 * @param {object} response 响应对象
 * @return {object} 响应正常就返回响应数据否则返回错误信息
 **/
function checkStatus (response, resolve, reject) {
  // 如果状态码正常就直接返回数据,响应正确，code === 0
  if ( response && ( response.code === 0 ) ) {
    return resolve(response) // 直接返回http response响应的data,此data会后端返回的数据数据对象，包含后端自定义的code,message,data属性
  }else{
    console.log(response)
    return reject(res)
  }
}

axios.defaults.timeout = 60000

export default {
  post (url, data) {
    return new Promise((resolve, reject) => {
        axios.post(common.baseUrl + url, data).then(res => {
            return checkStatus(res.data, resolve, reject)
        }).catch((err) => {})
    });
  },
  get (url, params) {
    return new Promise((resolve, reject) => {
      axios.get(common.baseUrl + url, {params}).then(res => {
          return checkStatus(res.data, resolve, reject)
      }).catch((err) => {})
    })
  },
  download(url,params){
    return axios({
        method:'post',
        url: common.baseUrl + url,
        data:params,
        responseType: 'blob'
    }).then((res) => {
        return res.data;
    }).catch(err => {
        Message.closeAll();
        Message.error(err);
    })

  },
  upload(url,param){
    return axios({
      method: 'post',
      url: common.baseUrl + url,
      data:param,
      onUploadProgress:function(e){//添加上传进度监听事件,展示上传进度
          let complete = ((e.loaded / e.total * 100) | 0) + "%";
          complete = "请勿关闭浏览器，已上传" + complete + " 等待响应结果... ";
          store.commit('setLoadType',{type:'full',text:complete});
      }
    }).then((res) => {
      let result = res.response || res.data;
      return checkStatus(result)
    })
  }
}
