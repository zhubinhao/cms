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
axios.defaults.headers.common['auth'] = token || 'eyJhbGciOiJIUzI1NiJ9.eyJqdGkiOiI1MjM2QSIsInN1YiI6IntcImlkXCI6XCIyXCIsXCJuaWNrXCI6XCJhZG1pblwiLFwidXNlcm5hbWVcIjpcImFkbWluXCJ9IiwiaWF0IjoxNTkxOTMzMjUxLCJleHAiOjE1OTIxOTI0NTF9.J-VpYY1hUyXChoWFlB-xjSYFu5fGpZZsE9wcWzYV3N4'
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