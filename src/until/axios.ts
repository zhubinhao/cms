'use strict'

import Vue from 'vue'
import axios from 'axios'
import { Message } from 'element-ui'

// Full config:  https://github.com/axios/axios#request-config
// axios.defaults.baseURL = process.env.baseURL || process.env.apiUrl || ''
// axios.defaults.headers.common['Cookie'] = 'MQlhZG1pbglhZG1pbg'
// axios.defaults.headers.post['Content-Type'] = 'application/x-www-form-urlencoded'
// axios.defaults.withCredentials = true
const token = localStorage.getItem('auth') // 获取Cookie
// axios.defaults.headers.common['auth'] = token || 'sensorsdata2015jssdkcross=%7B%22distinct_id%22%3A%221727f7a7e5a228-06d45048cb6177-f7d1d38-2073600-1727f7a7e5b903%22%2C%22first_id%22%3A%22%22%2C%22props%22%3A%7B%22%24latest_traffic_source_type%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_search_keyword%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%2C%22%24latest_referrer%22%3A%22url%E7%9A%84domain%E8%A7%A3%E6%9E%90%E5%A4%B1%E8%B4%A5%22%7D%2C%22%24device_id%22%3A%221727f7a7e5a228-06d45048cb6177-f7d1d38-2073600-1727f7a7e5b903%22%7D; slb_backend_token=eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MjM2QSIsInN1YiI6IntcImlkXCI6XCIyXCIsXCJuaWNrXCI6XCJhZG1pblwiLFwidXNlcm5hbWVcIjpcImFkbWluXCJ9IiwiaWF0IjoxNTkxNjk2MTY1LCJleHAiOjE1OTE5NTUzNjV9.rMjZ7wS3_T2Cp0s13TRcsDLa2ujIXm5Dm-NOBrMP5YM; JSESSIONID=BEC3E3EEFE6745EBB96BAC1E55F3EB07'

axios.defaults.headers.common['Content-Type'] = 'application/json'

const config: object = {
  baseURL: process.env.VUE_APP_URL,
  // timeout: 60 * 1000, // Timeout
  withCredentials: true // Check cross-site Access-Control
}
const _axios = axios.create(config)
_axios.interceptors.request.use(
  function (config) {
    if (config.method === 'get') {
      // get设置Content-Type
      config.data = true
    }
    return config
  },
  function (error) {
    return Promise.reject(error)
  }
)

// Add a response interceptor
_axios.interceptors.response.use(
  function (response) {
    if (response.data.flag === 1) {
      return response.data
    } else {
      Message.error(response.data.msg || '请检查您的网络')
      return Promise.reject(response.data.msg)
    }
    // Do something with response data
  },
  function (error) {
    Message.error(error.response.data.msg || '请检查您的网络')
    return Promise.reject(error)
  }
)
const Plugin: any = {
  install: function (Vue: any) {
    Vue.axios = _axios
    Object.defineProperties(Vue.prototype, {
      axios: {
        get() {
          return _axios
        }
      },
      $axios: {
        get() {
          return _axios
        }
      }
    })
  }
};


Vue.use(Plugin)

export default Plugin

export const http =  _axios;