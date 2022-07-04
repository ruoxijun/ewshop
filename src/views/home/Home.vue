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
  <h1>Home 首页</h1>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar"
import RecommendView from "@views/home/ChildComps/RecommendView"

import { ref, reactive, onMounted } from "vue";
import { getHomeAllData } from "@network/home";


export default {

setup() {

  const recommends = ref([]);

  onMounted(()=> {
    getHomeAllData().then(res=> {
      const goods = res.goods;
      recommends.value = goods.data;
    }).catch(err=> {
      console.log(err);
    });
  });

  return {
    recommends,
  }
},

components: {
  NavBar,
  RecommendView,
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