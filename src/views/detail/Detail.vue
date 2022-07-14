<template>
<div class='detail'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书详情 - {{goodsId}} </div>
    </template>
  </nav-bar>
  
  <div class="content">
    <van-image
      width="100vw"
      fit="cover"
      lazy-load
      :src="detail.cover_url"
    />
    
    <van-card
      :num="detail.stock"
      :price="detail.price"
      :desc="detail.description"
      :title="detail.title"
    >
      <template #tags>
        <van-tag v-if="detail.collects_count>0" plain type="danger">热门</van-tag>
        <van-tag v-if="detail.is_recommend==1" plain type="danger">推荐</van-tag>
      </template>
      <template #footer>
        <van-button type="warning">加入购物车</van-button>
        <van-button type="danger">立即购买</van-button>
      </template>
    </van-card>
    
    <van-tabs v-model:active="active" scrollspy sticky offset-top="45px">
      <van-tab v-for="(tabTitle, index) in detailTabs" :title="tabTitle">
        <div class="details"
             v-if="index == 0"
             v-html="detail.details"
        ></div>
        
        <!-- 热评暂时略过 -->
        <div v-if="index == 1">
          {{detail.comments}}
        </div>
        
        <goods-list
          v-if="index == 2"
          :goods="likeGoods"
        ></goods-list>
      </van-tab>
    </van-tabs>


  </div>
  
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";
import GoodsList from "@components/content/goods/GoodsList";

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
      // 获取商品信息
      getDetail(goodsId.value).then(res=> {
        console.log(res);
        book.detail = res.goods;
        book.likeGoods = res.like_goods;
      });
    });
    
    const detailTabs = reactive(["概述", "热评", "相关图书"]);

    return {
      goodsId,
      ...toRefs(book),
      detailTabs,
    }
  },

  components: {
    NavBar,
    GoodsList,
  },
}

</script>

<style lang='scss'>
.detail {
  position: fixed;
  top: 45px;
  bottom: 50px;
  left: 0;
  right: 0;
  overflow-x: hidden;
  
  .content {

    .van-card__content {
      text-align: left;
    }

    .details{
      img {
        width: 100vw;
        height: auto;
      }
    }
    
  }
}
</style>