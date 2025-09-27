import axios from 'axios';
import { getToken } from './tool';
import { baseURL, TIMEOUT } from './config';
const request = axios.create({
    baseURL: baseURL,
    timeout: TIMEOUT
});

  const server =new Map()
// 添加请求拦截器
request.interceptors.request.use(function (config) {
    const control =new AbortController()
     config.signal = control.signal
     if(server.get(config.url)){
        server.get(config.url).abort()
          alert('重复请求')
        server.delete(config.url)
     }
       server.set(config.url,control)
    // 在发送请求之前做些什么
    const token = getToken();
    if(token){
       config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  }, function (error) {
    // 对请求错误做些什么
    return Promise.reject(error);
  });

// 添加响应拦截器
request.interceptors.response.use(function (response) {  //先是拦截器给出请求，但是呢，服务器没有给出响应，之后再次请求就会重复请求了
     server.delete(response.config.url);
    return response;
  }, function (error) {
    // 超出 2xx 范围的状态码都会触发该函数。
    // 对响应错误做点什么
    if(error.config?.url){
      server.delete(error.config.url)
    }
    console.log(error);
    return Promise.reject(error);
  });
export default request;