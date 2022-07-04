import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@assets/css/base.css'; // 添加全局公共样式
import '@assets/css/iconfont/iconfont.css'; // 引入阿里图标

createApp(App).use(store).use(router).mount('#app')
