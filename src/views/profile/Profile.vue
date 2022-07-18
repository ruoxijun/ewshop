<template>
<div class='profile'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 个人中心 </div>
    </template>
  </nav-bar>

  <div class="content">
    <van-button class="logout" @click="clickLogout" round type="warning" block> 退出登录 </van-button>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { logout } from "@network/user";
import {useRouter} from "vue-router";
import { useStore } from "vuex";
import { Toast } from 'vant'

export default {

  setup() {

    const router = useRouter();
    const store = useStore();

    // 点击退出登录
    const clickLogout = ()=> {
      logout().then(res=> {
        if(res.status == 204) {
          // 清除登录状态
          window.localStorage.removeItem("token");
          window.localStorage.removeItem("tokenType");

          store.commit("setIsLogin", false);

          Toast.success("退出成功");
          setTimeout(()=> {
            router.replace("/login");
          }, 300);
        }
      });
    }
    
    return {
      clickLogout,
    }
  },

  components: {
    NavBar,
  },
}

</script>

<style lang='scss' scoped>
.profile {
  padding: 45px 0 50px;

  .content {

    .logout {
      margin-top: 10px;
    }
  }

}
</style>