<template>
<div class="home-swiper">
  <van-swipe class="swipe" :autoplay="3000" indicator-color="white">
    <van-swipe-item class="swipe-item" v-for="item in banners" :key="item.id">
      <img class="swipe-item-img"
           v-lazy="item.img_url"
           :alt="item.title"
           @click="toDetail(item.id)"
      />
    </van-swipe-item>
  </van-swipe>
</div>
</template>

<script>
import detail from '@mixins/detail';

export default {
  name: "HomeSwiper",
  props: {
    banners: {
      type: Array,
      default() {
        return [];
      }
    },
  },

  setup() {
    // 跳转商品详情页面
    const { toDetail } = detail();

    return {
      toDetail,
    }
  },
}
</script>

<style lang="scss" scoped>
.home-swiper {

  .swipe {

    .swipe-item {

      .swipe-item-img {
        width: 100%;
        height: 160px;
      }
    }
  }
}
</style>