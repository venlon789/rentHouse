import axios from 'axios'
import store from '@/store'
const request = axios.create({
  baseURL: 'http://liufusong.top:8080'
})

// Add a request interceptor
request.interceptors.request.use(function (config) {
  if (store.state.user && store.state.user.token) {
    config.headers.authorization = store.state.user.token
  }
  // Do something before request is sent
  return config
}, function (error) {
  // Do something with request error
  return Promise.reject(error)
})
export default request
