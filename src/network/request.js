import axios from 'axios'; // 引入 axios
import { Notify } from 'vant';

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(config=>{
    // 暂时直接放行
    return config;
  }, err=>{

  });

  // 响应拦截器
  instance.interceptors.response.use(res=>{
    return res.data || res;
  }, err=>{
    if ((err.request.responseURL.lastIndexOf('api/auth/login')>0)
        && err.response.status == 401){
      Notify("用户名或密码错误");
      return Promise.reject("用户名或密码错误");
    }
    const errors = err.response.data.errors;
    Notify(errors[Object.keys(errors)[0]][0]);
  });

  // 这里相当于返回了 Axios(config)
  return instance(config);
}