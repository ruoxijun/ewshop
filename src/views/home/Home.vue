<template>
<div class='home'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书商城 </div>
    </template>
  </nav-bar>

  <div class="banners">
    <img src="@assets/img/demo.png" alt="临时站位图" />
  </div>

  <recommend-view :recommends="recommends"></recommend-view>
  
  <tab-control :titles="titles" @clickItem="clickItem"></tab-control>
  <goods-list :goods="goods"></goods-list>
  
</div>
</template>

<script>
import RecommendView from "@views/home/ChildComps/RecommendView"
import NavBar from "@components/common/navbar/NavBar"
import TabControl from "@components/content/tabControl/TabControl"
import GoodsList from "@components/content/goods/GoodsList"

import { ref, reactive, onMounted } from "vue";
import { getHomeAllData, getHomeGoods } from "@network/home";

export default {

setup() {

  // 首页横向推荐书籍
  const recommends = ref([]);

  onMounted(()=> {
    // 请求首页所有书籍，挑选推荐数据提供给横向推荐书籍列表使用
    getHomeAllData().then(res=> {
      const goods = res.goods;
      recommends.value = goods.data;
    }).catch(err=> {
      console.log(err);
    });
    
    // 首页选项卡书籍列表数据初始化
    getHomeGoods().then(res=> {
      goods.page = res.goods.current_page;
      goods.list = res.goods.data;
    }).catch(err=> {
      console.log(err);
    });
  });
  
  // 首页选项卡选择类型
  const titles = ref(["畅销", "推荐", "新书"]);
  const titlesMap = ref(["sales", "recommend", "new"]);
  const goods = reactive({
    page: 0,
    list: [], 
  });
  
  // 点击不同类型的选项卡
  const clickItem = index=> {
    // 首页不同选项卡书籍列表数据
    getHomeGoods(titlesMap.value[index]).then(res=> {
      goods.page = res.goods.current_page;
      goods.list = res.goods.data;
    }).catch(err=> {
      console.log(err);
    });
  }

  return {
    recommends,
    titles,
    clickItem,
    goods,
  }
},

components: {
  NavBar,
  RecommendView,
  TabControl,
  GoodsList,
},
}
</script>

<style lang='scss' scoped>
.banners {
  width: 100%;
  height: 200px;
  overflow: hidden;

  img {
    width: 100%;
    height: auto;
    margin-top: 45px;
  }
}
</style>