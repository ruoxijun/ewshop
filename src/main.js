import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

import '@assets/css/base.css'; // 添加全局公共样式
import '@assets/css/iconfont/iconfont.css'; // 引入阿里图标

import 'vant/es/notify/style'; // vant notify 样式
import 'vant/es/toast/style';


// 引入 Vant 组件
import {
  Swipe, SwipeItem,
  Lazyload,
  Badge,
  Collapse, CollapseItem,
  Tab, Tabs,
  Divider,
  Sidebar, SidebarItem,
  Card,
  Image as VanImage,
  Button,
  Form, Field, CellGroup,
  SubmitBar,
  Checkbox, CheckboxGroup,
  Stepper,
  SwipeCell,
  Empty,
  Cell,
  AddressList,AddressEdit,
  } from 'vant';

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
// 使用 Vant 折叠面板
.use(Collapse)
.use(CollapseItem)
// 使用 Vant 标签页
.use(Tab)
.use(Tabs)
// 使用 Vant 分割线
.use(Divider,{ hairline: false, })
// 使用 Vant 侧边导航
.use(Sidebar)
.use(SidebarItem)
// 使用 Vant 商品卡片
.use(Card)
// 使用 Vant 图片组件
.use(VanImage)
// 使用 Vant 按钮组件
.use(Button)
// 使用 Vant 表单组件
.use(Form)
.use(Field)
.use(CellGroup)
// 使用 Vant 提交订单栏
.use(SubmitBar)
// 使用 Vant 复选框
.use(Checkbox)
.use(CheckboxGroup)
// 使用 Vant 步进器
.use(Stepper)
// 使用 Vant 滑动单元格
.use(SwipeCell)
// 使用 Vant 空状态
.use(Empty)
// 使用 Vant 单元格
.use(Cell)
// 使用 Vant 地址列表/地址编辑
.use(AddressList).use(AddressEdit)

.mount('#app');
