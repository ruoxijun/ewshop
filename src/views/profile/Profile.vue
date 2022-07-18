<template>
<div class='profile'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 个人中心 </div>
    </template>
  </nav-bar>

  <div class="content">
    <van-button round type="warning" block> 退出登录 </van-button>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

export default {

  setup() {

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

  }

}
</style>