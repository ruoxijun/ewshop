import { createRouter, createWebHistory } from 'vue-router'

import store from '@/store';
import { Notify } from 'vant';

const Home = () => import('@views/home/Home.vue');
const Category = () => import('@views/category/Category.vue'); // 分类
const Detail = () => import('@views/detail/Detail.vue'); // 图书详情
const Profile = () => import('@views/profile/Profile.vue'); // 个人中心
const ShopCart = () => import('@views/shopcart/ShopCart.vue'); // 购物车
const Login = () => import('@views/auth/Login.vue'); // 登录
const Register = () => import('@views/auth/Register.vue'); // 注册
const Address = () => import('@/views/address/Address'); // 地址管理
const AddressEdit = () => import('@/views/address/AddressEdit'); // 新增/编辑地址
const NotFound = () => import('@views/404/404');

const routes = [
  {
    path: '/',
    name: 'home',
    component: Home,
    meta: {
      title: '图书商城',
    },
    alias: ['/home', '/index', '/index.html']
  },
  {
    path: '/login',
    name: 'login',
    component: Login,
    meta: {
      title: '登录',
    }
  },
  {
    path: '/register',
    name: 'register',
    component: Register,
    meta: {
      title: '注册账号',
    }
  },
  {
    path: '/category',
    name: 'Category',
    component: Category,
    meta: {
      title: '图书分类',
    }
  },
  {
    path: '/detail/:goodsId',
    name: 'Detail',
    meta: {
      title: '图书详情',
    },
    component: Detail,
  },
  {
    path: '/shopcart',
    name: 'ShopCart',
    component: ShopCart,
    meta: {
      title: "购物车",
      isAuthRequired: true,
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "个人中心",
      isAuthRequired: true, // 需要检查是否已登录
    },
  },
  {
    path: '/address',
    name: 'Address',
    component: Address,
    meta: {
      title: "地址管理",
      isAuthRequired: true,
    }
  },
  {
    path: '/addressedit',
    name: 'AddressEdit',
    component: AddressEdit,
    meta: {
      isAuthRequired: true,
    }
  },
  {
    path: '/:pathMatch(.*)*',
    name: 'NotFound',
    component: NotFound,
    meta: {
      title: "404",
    }
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from)=>{
  document.title = to.meta.title;
  if(to.meta.isAuthRequired && !store.state.user.isLogin) {
    Notify("请登录后重试");
    return "/login";
  }
});

export default router
