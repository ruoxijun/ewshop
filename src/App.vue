<template>
<div class="app">
  <router-view v-slot="{ Component }">
    <transition name="fade">
      <keep-alive exclude="Detail">
        <component :is="Component" />
      </keep-alive>
    </transition>
  </router-view>

  <nav>
    <router-link to="/" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-shouye-shouye"></i></div>
      <div>首页</div>
    </router-link>
    <router-link to="/category" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-fenlei"></i></div>
      <div>分类</div>
    </router-link>
    <router-link to="/shopcart" class="tab-bar-item">
      <div class="icon">
        <van-badge :content="$store.state.carts.count?$store.state.carts.count:null" max="99">
          <i class="iconfont icon-gouwuche"></i>
        </van-badge>
      </div>
      <div>购物车</div>
    </router-link>
    <router-link to="/profile" class="tab-bar-item">
      <div class="icon"><i class="iconfont icon-wode"></i></div>
      <div>我的</div>
    </router-link>
  </nav>
</div>
</template>

<script>
import { useStore } from 'vuex';

export default {
  setup() {

    const store = useStore();

    // 购物车数量
    store.dispatch("setCartCount");

    return {
    }
  }
}
</script>

<style lang="scss">
#app {
  width: 100vw;
  height: 100vh;
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}

nav {
  background-color: #fcfcfc;
  display: flex;
  position: fixed;
  right: 0;
  left: 0;
  bottom: 0;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
  
  a {
    color: var(--color-text);

    &.router-link-exact-active {
      color: var(--color-high-text);
    }
  }

  .tab-bar-item {
    flex: 1;
    text-align: center;
    height: 50px;
    font-size: var(--font-size);
    
    .icon {
      width: 24px;
      height: 24px;
      margin-top: 3px;
      vertical-align: middle;
      display: inline-block;
    }
  }
}

.fade-enter-active, .fade-leave-active {
    transition: opacity .3s
}
.fade-enter, .fade-leave-to {
    opacity: 0
}
</style>
