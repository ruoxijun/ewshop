<template>
<div class="register">
  <nav-bar>
    <template #default>
      <div> 注册账号 </div>
    </template>
  </nav-bar>
  <div class="context">
    <van-form @failed="onFailed">
      <van-cell-group inset>
        <!-- 通过 pattern 进行正则校验 -->
        <van-field
          v-model="data.name"
          name="name"
          label="昵称"
          placeholder="请输入昵称"
          :rules="[{ pattern, message: '请输入正确内容' }]"
        />
        <!-- 通过 validator 进行函数校验 -->
        <van-field
          v-model="data.email"
          name="email"
          label="邮箱"
          placeholder="请输入邮箱"
          :rules="[{ validator, message: '请输入正确内容' }]"
        />
        <!-- 通过 validator 返回错误提示 -->
        <van-field
          v-model="data.password"
          name="password"
          label="密码"
          placeholder="请输入密码"
          :rules="[{ validator: validatorMessage }]"
        />
        <!-- 通过 validator 进行异步函数校验 -->
        <van-field
          v-model="data.password_confirmation"
          name="password_confirmation"
          label="确认密码"
          placeholder="请确认密码"
          :rules="[{ validator: asyncValidator, message: '请输入正确内容' }]"
        />
      </van-cell-group>
      <div style="margin: 16px;">
        <van-button round block type="primary" native-type="submit">
          注册
        </van-button>
      </div>
    </van-form>
  </div>
</div>
</template>

<script>

import NavBar from '@components/common/navbar/NavBar.vue'

import { Toast } from 'vant';
import { ref, reactive } from 'vue';

export default {
  
  setup() {
    
    // 注册表单数据原型
    const data = reactive({
      name: '',
      email: '',
      password: '',
      password_confirmation: '',
    });
    const value1 = ref('');
    const value2 = ref('');
    const value3 = ref('abc');
    const value4 = ref('');
    const pattern = /\d{6}/;

    // 校验函数返回 true 表示校验通过，false 表示不通过
    const validator = (val) => /1\d{10}/.test(val);

    // 校验函数可以直接返回一段错误提示
    const validatorMessage = (val) => `${val} 不合法，请重新输入`;

    // 校验函数可以返回 Promise，实现异步校验
    const asyncValidator = (val) =>
      new Promise((resolve) => {
        Toast.loading('验证中...');

        setTimeout(() => {
          Toast.clear();
          resolve(val === '1234');
        }, 1000);
      });

    const onFailed = (errorInfo) => {
      console.log('failed', errorInfo);
    };

    return {
      data,
      value1,
      value2,
      value3,
      value4,
      pattern,
      onFailed,
      validator,
      asyncValidator,
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
    margin-top: 45px;
    margin-bottom: 50px;
    
  }
}
</style>