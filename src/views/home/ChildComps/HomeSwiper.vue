<template>
<div class="home-swiper">
  <!-- 手动滑动时触发 click,stop-propagation 设置为 false 可避免 -->
  <van-swipe class="swipe"
             :autoplay="3000"
             indicator-color="white"
             :stop-propagation="false"
  >
    <van-swipe-item class="swipe-item"
                    v-for="item in banners"
                    :key="item.id"
                    @click.stop="toDetail(item.id)"
    >
      <img class="swipe-item-img" v-lazy="item.img_url" :alt="item.title" />
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
        object-fit: cover;
      }
    }
  }
}
</style>