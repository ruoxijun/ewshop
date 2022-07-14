<template>
<div class="recommend">
  <div class="recommend-item" v-for="item in recommends.slice(0,4)" :key="item.id">
    <a href="#" @click.prevent="toDetail(item.id)">
      <img v-lazy="item.cover_url" alt="item.title" />
      <div>{{ item.title }}</div>
    </a>
  </div>
</div>
</template>

<script>
import detail from '@mixins/detail';

export default {
  name: "RecommendView",

  props: {
    recommends: {
      type: Array,
      default(){
        return [];
      },
    }
  },

  setup(props) {

    // 跳转商品详情页面
    const { toDetail } = detail();

    return {
      toDetail,
    }
  }
}
</script>

<style lang="scss" scoped>
.recommend {
  width: 100%;
  display: flex;
  text-align: center;
  padding: 15px 0 30px;
  border-bottom: 8px solid #eee;
  font-size: 12px;

  .recommend-item {
    flex: 1;

    img {
      width: 70px;
      height: 70px;
      margin-bottom: 10px;
      object-fit: cover;
    }
  }
}
</style>