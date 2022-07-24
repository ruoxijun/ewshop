<template>
<div class='profile'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 个人中心 </div>
    </template>
  </nav-bar>

  <div class="content">
    <div class="header">
      <div class="avatar">
        <van-image
          width="60"
          height="60"
          lazy-load
          fit="cover"
          :src="user.avatar_url"
        />
      </div>
      <div class="user-msg">
        <p class="name"> {{user.name}} </p>
        <p class="email"> 邮箱： {{user.email}} </p>
      </div>
    </div>
    
    <div class="versatility">
      <van-cell title="我的收藏" is-link to="/collect" icon="like-o" />
      <van-cell title="我的订单" is-link to="/order" icon="balance-list-o" />
      <van-cell title="账号管理" is-link to="/setuser" icon="contact" />
      <van-cell title="地址管理" is-link to="/address" icon="location-o" />
      <van-cell title="关于我们" is-link to="/about" icon="info-o" />
    </div>

    <div class="logout-div">
      <van-button class="logout" @click="clickLogout" round type="success" block>
        退出登录
      </van-button>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { logout, getUser } from "@network/user";
import { useRouter } from "vue-router";
import { useStore } from "vuex";
import { Toast } from 'vant';

import { ref, reactive, toRefs } from 'vue';

export default {

  setup() {

    const router = useRouter();
    const store = useStore();
    
    const status = reactive({
      user: {},
    });

    // 用户信息
    getUser().then(res=> {
      status.user = res;
    });

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
      ...toRefs(status),
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
  height: 100vh;
  padding: 45px 0 50px;

  .content {
    height: 100%;
    background-color: #f1f1f1;
    text-align: left;
    
    .header {
      padding: 16px 16px 8px;
      background-color: #fff;
      display: flex;
      
      .avatar {
        border-radius: 4px;
        margin-right: 8px;
        overflow: hidden;
      }
      
      .user-msg {
        display: flex;
        flex-direction: column;
        justify-content: space-between;
        padding: 6px 0;
        
        .name {
          text-align: left;
          font-size: 24px;
          font-weight: bold;
        }
        .email {
          color: #707070;
          font-size: 14px;
        }
      }
    }
    
    .versatility {
      margin-top: 8px;

      .van-cell {
        padding: 12px;
        font-size: 16px;

        --van-padding-base: 8px;
      }

      .van-cell:nth-child(2) {
        margin-top: 8px;
      }
      .van-cell:last-child {
        margin-top: 8px;
      }

    }

    .logout-div {
      padding: 0 16px;

      .logout {
        margin-top: 10px;
      }
    }

  }

}
</style>