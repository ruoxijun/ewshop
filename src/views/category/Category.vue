<template>
<div class='category'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书分类 </div>
    </template>
  </nav-bar>
  <div class="category-mainbox">
    <div class="left-menu">
      <van-sidebar class="left-menu-sidebar" v-model="activeSidebar">
        <van-collapse v-model="activevanColNames" accordion>
          <van-collapse-item
              v-for="(collapse, index) in collapses"
              :title="collapse.name"
              :disabled="collapse.children.length < 1"
              :key="collapse.id"
              :name="index">

              <van-sidebar-item
                  v-for="sidebar in collapse.children"
                  @click="sidOrTabChange(sidebar.id)"
                  :key="sidebar.id"
                  :title="sidebar.name" />
          </van-collapse-item>
        </van-collapse>
      </van-sidebar>
    </div>

    <div class="goods-box">
      <div class="ordertab">
        <van-tabs v-model:active="activeTab" @click-tab="sidOrTabChange()">
          <van-tab
            v-for="typeArr in ordertab"
            :title="typeArr[0]"
            ></van-tab>
        </van-tabs>
        <hr />
      </div>
      <div class="goods-list">
        <van-list
          :loading="loading"
          :finished="finished"
          finished-text="没有更多了"
          :error="error"
          error-text="请求失败，点击重新加载"
          @load="onLoadGoodsList"
        >
          <van-card
            v-for="good in goods.list"
            :key="good.id"
            :num="good.comments_count"
            :tag="good.collects_count>0? '流行':'标签'"
            :price="good.price"
            :desc="`${good.updated_at.trim().substr(0,10)}`"
            :title="good.title"
            :thumb="good.cover_url"
          />
        </van-list>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { getCategory, getCategoryGoods } from "@network/category.js";

import { ref, reactive, onMounted, watch } from "vue";

export default {

setup() {

  // 侧边导航选中下标
  const activeSidebar = ref(0);
  // 侧边栏折叠面板展开的选项
  const activevanColNames = ref(0);
  // 侧边栏数据
  const collapses = ref([]);
  // 当前侧边栏选中栏目的 id
  const sidebarId = ref(0);

  onMounted(()=> {
    getCategory().then(res=> {
      collapses.value = res.categories;

      for (let collapsesVal of collapses.value) {
        for (let item of collapsesVal.children) {
          sidebarId.value = item.id; // 记录第一个侧边栏目的 id
          // 初始化书籍列表
          getCategoryGoods(1, sidebarId.value, ordertab[activeTab.value][1]).then(res=> {
            goods.list = res.goods.data;
            loading.value = false; // 加载完成
          });
          return;
        }
      }
    });
  });

  // 排序规则标签页选中下标
  const activeTab = ref(0);
  // 排序规则标签页标签名以及对应的请求参数名
  const ordertab = [
    ["销量排序", "sales"],
    ["价格排序", "price"],
    ["评论排序", "comments_count"],
  ];

  // 分类页面书籍列表
  const goods = reactive({
    page: 1,
    list: []
  });

  // 侧边栏目或者选项卡点击改变时
  const sidOrTabChange = id=> {
    if(id) sidebarId.value !== id?sidebarId.value = id : null;
    goods.page = 0;
    goods.list.splice(0, goods.list.length);
    finished.value = true;
    finished.value = false; // 开启下来加载
    console.log("click", loading.value, finished.value, error.value);
  }
  
  // 上拉加载
  const loading = ref(false); // 是否上拉加载数据中
  const finished = ref(false); // 代表所有数据加载完毕 TRUE 将不再触发加载事件
  const error = ref(false); // 是否出错
  // 上拉加载事件
  const onLoadGoodsList = ()=> {
    console.log(goods.page, sidebarId.value, activeTab.value);
    loading.value = true; // 加载中
    if(sidebarId.value==0) return; // 分类页面首次加载数据
    getCategoryGoods(goods.page+1, sidebarId.value, ordertab[activeTab.value][1]).then(res=> {
      if(!(res.goods.data.length > 0)) {
        loading.value = false; // 加载完成
        finished.value = true; // 无需在加载
        return;
      }
      goods.page++;
      goods.list.push(...(res.goods.data));
      loading.value = false; // 加载完成
      console.log("change", loading.value, finished.value, error.value);
    });
  };

  return {
    activeSidebar,
    activevanColNames,
    collapses,
    sidebarId,
    activeTab,
    ordertab,
    goods,
    sidOrTabChange,
    loading,
    finished,
    error,
    onLoadGoodsList,
  }
},
components: {
  NavBar,
},
}

</script>

<style lang='scss'>
  .category {
    
    .category-mainbox {
      height: 100vh;
      padding-top: 45px;
      padding-bottom: 50px;
      display: flex;
      
      .left-menu {
        flex: 4;
        height: 100%;
        overflow-x: hidden;
        text-align: left;
        padding-top: calc(45px + 24px);
        box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);

        .left-menu-sidebar {
          width: 100%;
        }
      }
      
      .goods-box {
        flex: 7;
        display: flex;
        flex-direction: column;
        
        .ordertab {
          
          hr {
            height: 2px;
            position: relative;
            top: -2px;
            background-color: #dfdfdf;
            border: none;
            border-radius: 3px;
          }
        }
        
        .goods-list {
          flex-grow: 1;
          height: 0;
          overflow-x: hidden;
          padding-top: 24px;
          
          .van-card__title {
            text-align: left;
          }
          
          .van-card__desc {
            text-align: left;
            overflow: unset;
            white-space: unset;
          }
        }
      }
    }
  }
</style>