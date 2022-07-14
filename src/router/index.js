import { createRouter, createWebHistory } from 'vue-router'

const Home = () => import('@views/home/Home.vue');
const Category = () => import('@views/category/Category.vue'); // 分类
const Detail = () => import('@views/detail/Detail.vue'); // 图书详情
const Profile = () => import('@views/profile/Profile.vue'); // 个人中心
const ShopCart = () => import('@views/shopcart/ShopCart.vue'); // 购物车
const Login = () => import('@views/auth/Login.vue'); // 登录
const Register = () => import('@views/auth/Register.vue'); // 注册

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
    },
  },
  {
    path: '/profile',
    name: 'Profile',
    component: Profile,
    meta: {
      title: "个人中心",
    },
    redirect: '/register',
  },
]

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes
});

router.beforeEach((to, from)=>{
  document.title = to.meta.title;
});

export default router
