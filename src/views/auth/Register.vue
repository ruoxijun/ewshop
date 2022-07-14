<template>
<div class="register">
  <nav-bar>
    <template #default>
      <div> 注册账号 </div>
    </template>
  </nav-bar>
  <div class="context">
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
          v-model="name"
          name="name"
          label="用户名"
          placeholder="请输入用户名"
          type="text"
          :rules="[{ required: true, message: '请输入用户名' }]"
        />
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
        <van-field
          v-model="password_confirmation"
          name="password_confirmation"
          label="确认密码"
          placeholder="请确认密码"
          type="password"
          :rules="[{ required: true, message: '请确认密码' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button block round type="success" native-type="submit">
          注册
        </van-button>
        <router-link
            class="login-text"
            :to="{path: '/login', replace: true}"
        > 已有账号，立即登录 > </router-link>
      </div>
    </van-form>
  </div>
</div>
</template>

<script>

import NavBar from '@components/common/navbar/NavBar.vue'

// Notify
import { Notify, Toast } from 'vant';

import { register } from '@network/user'
import {ref, reactive, toRefs} from 'vue';
import { useRouter } from 'vue-router';

export default {
  
  setup() {

    const router = useRouter();

    // 注册表单数据原型
    const data = reactive({
      name: '',
      email: '@qq.com',
      password: '',
      password_confirmation: '',
    });

    const onSubmit = () => {
      if (data.password !== data.password_confirmation) {
        Notify("两次输入密码不一致!!!" );
        return;
      }

      Toast.loading({
        message: '注册中...',
        forbidClick: true,
      });
      register(data).then((res)=> {
        if(res && res.status=='201') {
          Toast.clear();
          data.password = '';
          data.password_confirmation = '';

          Toast.success('注册成功');

          setTimeout(()=> {
            router.replace("/login");
          }, 300);
        }
      });
    };

    return {
      ...toRefs(data),
      onSubmit,
    };
  },
  
  components: {
    NavBar,
  },
}

</script>

<style lang="scss">
.register {

  .context {
    height: 100vh;
    padding-bottom: 50px;
    padding-top: 15px + 45px;

    .van-form {
      margin: 3vh 4vw 0;

      .login-text {
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