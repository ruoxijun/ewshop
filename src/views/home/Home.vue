<template>
<div class='home'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书商城 </div>
    </template>
  </nav-bar>

  <div ref="wrapper" class="wrapper">
    <div class="content">
      <div class="banners">
        <img src="@assets/img/demo.png" alt="临时站位图" />
      </div>

      <recommend-view :recommends="recommends"></recommend-view>

      <tab-control :titles="titles" @clickItem="clickItem"></tab-control>

      <goods-list :goods="goods"></goods-list>
    </div>
  </div>

</div>
</template>

<script>
import RecommendView from "@views/home/ChildComps/RecommendView"
import NavBar from "@components/common/navbar/NavBar"
import TabControl from "@components/content/tabControl/TabControl"
import GoodsList from "@components/content/goods/GoodsList"

import { ref, reactive, onMounted, watchEffect, nextTick } from "vue";
import { getHomeAllData, getHomeGoods } from "@network/home";
import BetterScroll from 'better-scroll';

export default {

setup() {

  // 首页横向推荐书籍
  const recommends = ref([]);

  // 选项卡上拉加载相关变量
  let bs = null;
  let wrapper = ref(null); // 获取 wrapper 元素

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

    // 选项卡内容滚动
    bs = new BetterScroll(wrapper.value, {
      click: true, // 内容区域点击是否生效
      pullUpLoad: true, // 开启上拉加载更多
      probeType: 3, // 触发滚动事件模式 1：懒惰、2：实时、3：敏感
    });
    // 滚动监听
    bs.on('scroll', position=> {});
    // 上拉到底部监听
    bs.on('pullingUp', ()=> {
      bs.refresh(); // 刷新需要滚动的内容区域高度
      // 上拉到底部时请求下一页数据
      getHomeGoods(currentType.value, ++goods.page).then(res=> {
        let data = res.goods.data;
        // 防止页数不停自增
        goods.page = data.length ? res.goods.current_page : --res.goods.current_page;
        // 新数据拼接到之前的数据当中
        goods.list.push(...data);
        // 上拉刷新成功后必须让新数据展示出来并刷新内容区域高度
        bs.finishPullUp();
        bs.refresh();
      }).catch(err=> {
        console.log(err);
      });
    });
  });
  
  // 首页选项卡选择类型
  const currentType = ref("sales");
  const titles = ref(["畅销", "推荐", "新书"]);
  const titlesMap = ref(["sales", "recommend", "new"]);
  const goods = reactive({
    page: 0,
    list: [], 
  });
  
  // 点击不同类型的选项卡
  const clickItem = index=> {
    // 首页不同选项卡书籍列表数据
    currentType.value = titlesMap.value[index];
    getHomeGoods(currentType.value).then(res=> {
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
    wrapper, // ref获取元素变量也需要返回
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
.home {
  height: 100vh;
  position: relative;

  .wrapper {
    position: absolute;
    top: 45px;
    bottom: 50px;
    left: 0;
    right: 0;
    overflow: hidden;

    .content {

      .banners {
        width: 100%;
        height: 200px;
        overflow: hidden;

        img {
          width: 100%;
          height: auto;
        }
      }
    }
  }
}
</style>