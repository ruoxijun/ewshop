<template>
  <div class="login">
    <nav-bar>
      <template #default>
        <div> 登录 </div>
      </template>
    </nav-bar>

    <div class="content">
      <van-image
          round
          lazy-load
          fit="cover"
          width="10rem"
          height="10rem"
          src="https://fastly.jsdelivr.net/npm/@vant/assets/cat.jpeg"
      >
        <template v-slot:loading>
          <van-loading type="spinner" size="20" />
        </template>
      </van-image>

      <van-form @submit="onSubmit">
        <van-cell-group inset>
          <van-field
              v-model="email"
              name="email"
              label="邮箱"
              placeholder="请输入邮箱"
              type="email"
              :rules="[{ required: true, message: '请输入邮箱' }]"
          />
          <van-field
              v-model="password"
              name="password"
              label="密码"
              placeholder="请输入密码"
              type="password"
              :rules="[{ required: true, message: '请输入密码' }]"
          />
        </van-cell-group>
        <div style="margin: 16px;">
          <van-button block round type="success" native-type="submit">
            登录
          </van-button>
          <router-link
              class="register-text"
              :to="{replace:true, path:'/register'}"
          > 没有账号，立即注册 > </router-link>
        </div>
      </van-form>
    </div>
  </div>
</template>

<script>
import NavBar from '@components/common/navbar/NavBar';

import { login } from '@network/user';

import { Notify, Toast } from 'vant';
import { reactive, toRefs } from "vue";
import { useRouter } from "vue-router";
import { useStore } from "vuex"

export default {

  setup(){

    const router = useRouter();
    const store = useStore();

    // 注册表单数据原型
    const data = reactive({
      email: 'jjjjjj@qq.com',
      password: 'jjjjjj',
    });

    const onSubmit = () => {
      login(data).then(res=> {
        if (!window.localStorage) {
          Notify("浏览器版本较低请升级后重试");
        }

        // 保存登录状态
        data.email = '';
        data.password = '';

        window.localStorage.setItem("token", res.access_token);
        window.localStorage.setItem("tokenType", res.token_type);

        store.commit("setIsLogin", true);

        Toast.success("登录成功");
        setTimeout(()=> {
          router.go(-1);
        },300);
      });
    };

    return {
      ...toRefs(data),
      onSubmit,
    }

  },

  components: {
    NavBar,
  }
}

</script>

<style lang="scss">
.login {

  .content {
    height: 100vh;
    padding-bottom: 50px;
    padding-top: 15px + 45px;

    .van-form {
      margin: 3vh 4vw 0;

      .register-text {
        color: #42b983;
        font-size: 14px;
        margin-top: 15px;
        text-align: right;
        float: right;
      }
    }
  }

}
</style>