<template>
<div class='detail'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书详情 - {{goodsId}} </div>
    </template>
  </nav-bar>
  <h1>Detail 商品详情</h1>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { ref, reactive, toRefs, onMounted } from 'vue';
import { useRoute } from 'vue-router';
import { getDetail } from '@network/detail';

export default {
  name: "Detail",

  setup() {
    const route = useRoute(); // 获取 route（当前路由对象）

    const goodsId = ref(null);// 获取书籍商品 id
    goodsId.value = route.params.goodsId;
    const book = reactive({
      detail: {}, // 商品详情
      likeGoods: [], // 相似商品
    });

    onMounted(()=> {
      getDetail(goodsId.value).then(res=> {
        console.log(res);
        book.detail = res.goods;
        book.likeGoods = res.like_goods;
      });
    });

    return {
      goodsId,
      ...toRefs(book),
    }
  },

  components: {
    NavBar,
  },
}

</script>

<style lang='less' scoped>

</style>