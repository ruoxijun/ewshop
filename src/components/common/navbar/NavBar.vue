<template>
  <div class="nav-bar">
    <div class="left" @click="goback">
      <slot name="left"><img src="@assets/img/left.svg" /></slot>
    </div>
    <div class="center"><slot>EWshop</slot></div>
    <div class="right"><slot name="right"></slot></div>
  </div>
</template>

<script>
import { useRouter, useRoute } from 'vue-router';

export default {
  name: "NavBar",

  setup() {
    const router = useRouter();
    const goback = ()=> {
      router.go(-1);
    }

    return {
      goback,
    }
  }
}
</script>

<style lang="scss" scoped>
.nav-bar {
  background-color: var(--color-tint);
  color: #fff;
  display: flex;
  justify-content: space-between;
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  z-index: 9;
  height: 45px;
  line-height: 45px;
  text-align: center;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);

  .left, .right {
    width: 60px;
  }

  .center {
    flex: 1;
  }

  .left {
    img {
      width: 45px;
      padding: 10px;
    }
  }
}
</style>