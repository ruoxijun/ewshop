import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@assets/css/base.css'; // 添加全局公共样式
import '@assets/css/iconfont/iconfont.css'; // 引入阿里图标

// 引入 Vant 组件
import { Swipe, SwipeItem, Lazyload, Badge, } from 'vant';

createApp(App)
.use(store).use(router)

// 安装 Vant 轮播图 组件
.use(Swipe).use(SwipeItem)
// Vant 实现懒加载
.use(Lazyload, {
    loading: require('./assets/img/loading.gif'),
    error: require('./assets/img/404.svg'),
})
// 使用 Vant 徽标
.use(Badge)

.mount('#app');
