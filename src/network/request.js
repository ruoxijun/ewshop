import axios from 'axios'; // 引入 axios
import { Notify, Toast } from 'vant';
import router from '@/router'

export function request(config) {
  const instance = axios.create({
    baseURL: 'https://api.shop.eduwork.cn/',
    timeout: 5000,
  });

  // 请求拦截器
  instance.interceptors.request.use(config=>{
    const wls = window.localStorage;
    if (!wls) {
      Notify("你的浏览器版本较低，请升级后重试");
      return;
    }
    // 请求授权信息
    const token = wls.getItem("token");
    const tokenType = wls.getItem("tokenType");
    if (token && tokenType) {
      config.headers.Authorization = `${tokenType} ${token}`;
    }
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
    } else if (err.response.status == 401){
      // 未授权
      Toast.fail("请登录");
      router.push("/login");
    }
    const errors = err.response.data.errors;
    Notify(errors[Object.keys(errors)[0]][0]);
  });

  // 这里相当于返回了 Axios(config)
  return instance(config);
}