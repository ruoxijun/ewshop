<template>
<div class="goods-item" @click="toDetail(item.id)">
  <img v-lazy="item.cover_url" :alt="item.title" />
  <div class="goods-info">
    <p>{{item.title}}</p>
    <span class="price"><span>&yen;</span> {{item.price}} </span>
    <span class="collect"> {{item.collects_count}} </span>
  </div>
</div>
</template>

<script>
import detail from '@mixins/detail';
  
export default {
  props: {
    item: {
      type: Object,
      default() {
        return {};
      }
    }
  },

  setup() {

    // 跳转商品详情页面
    const { toDetail } = detail();

    return {
      toDetail,
    }

  }
}
</script>

<style lang="scss" scoped>
.goods-item {
  width: 45%;
  padding-bottom: 40px;
  position: relative;
  
  img {
    width: 100%;
    border-radius: 5px;
    object-fit: cover;
  }
  
  .goods-info {
    font-size: 12px;
    position: absolute;
    bottom: 5px;
    left: 0;
    right: 0;
    overflow: hidden;
    text-align: center;
    
    p {
      overflow: hidden;
      text-overflow: ellipsis;
      white-space: nowrap;
      margin-bottom: 3px;
    }
    .price {
      color: red;
      margin-right: 20px;
    }
    .collect {
      position: relative;
      
      &::before {
        content: "";
        width: 14px;
        height: 14px;
        background: url("@assets/img/collect.svg") 0 0/14px 14px no-repeat;
        position: absolute;
        top: -1px;
        left: -15px;
      }
    }
  }
}
</style>