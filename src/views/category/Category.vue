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
              :name="index"
          >
              <van-sidebar-item
                  v-for="sidebar in collapse.children"
                  @click="sidOrTabChange(sidebar.id)"
                  :key="sidebar.id"
                  :title="sidebar.name"
              />
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
        <van-pull-refresh
          v-model="refreshLoading"
          success-text="刷新成功"
          @refresh="onRefresh"
        >
          <van-list
            ref="goodsList"
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
              @click="toDetail(good.id)"
              :num="good.comments_count"
              :tag="good.collects_count>0 ? '流行':'标签'"
              :price="good.price"
              :desc="`${good.updated_at.trim().substr(0,10)}`"
              :title="good.title"
              :thumb="good.cover_url"
              :lazy-load="true"
            />
          </van-list>
        </van-pull-refresh>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { getCategory, getCategoryGoods } from "@network/category";

import { ref, reactive, onMounted, nextTick } from "vue";
import detail from '@mixins/detail';

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
  const activeTab = ref(1);
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
  
  // 下拉刷新
  const refreshLoading = ref(false);
  const onRefresh = ()=> {
    refreshLoading.value = true; // 下拉刷新进行中
    sidOrTabChange();
  }

  // 侧边栏目或者选项卡点击改变时
  const sidOrTabChange = id=> {
    loading.value = true; // 数据加载中（load 无法执行）
    finished.value = false; // 表示需要加载新数据
    goods.list.splice(0); // 清空数组
    if(id) sidebarId.value !== id?sidebarId.value = id : null; // 左侧选中栏目的 id
    goods.page = 0; // 重置页数

    /**
     * 因为我们清空了数组但是此时 Dom 可能还没有更新，如果此时 finished 直接设置为 false
     * 会导致 onLoadGoodsList 无法执行。
     * 在数据更新后 nextTick 能在 Dom 渲染完成后自动调用。
     *
     * 此外官方还提供了 check（推荐使用） 方法结合 ref 使用来触发 load
     */
    nextTick(()=> {
      // goodsList.value.check(); // 触发 load
      loading.value = false; // 表示数据已加载完成，load 方法能够执行
    });
  }
  
  // 上拉加载
  const goodsList = ref(null); // van-list 组件实例
  const loading = ref(false); // 是否在加载数据中
  const finished = ref(false); // 代表所有数据是否加载完毕 TRUE 将不再触发 load 事件
  const error = ref(false); // 是否出错
  // 上拉加载事件
  const onLoadGoodsList = ()=> {
    loading.value = true; // 加载中
    if(sidebarId.value==0) return; // 分类页面首次加载数据
    getCategoryGoods(goods.page+1, sidebarId.value, ordertab[activeTab.value][1]).then(res=> {
      loading.value = false; // 加载完成
      refreshLoading.value = false; // 下拉刷新完成
      if(!(res.goods.data.length > 0)) {
        finished.value = true; // 无需在加载数据（load 无法执行）
        return;
      }
      goods.page++;
      goods.list.push(...(res.goods.data));
    });
  };

  // 跳转商品详情页面
  const { toDetail } = detail();

  return {
    activeSidebar,
    activevanColNames,
    collapses,
    sidebarId,
    activeTab,
    ordertab,
    goods,
    goodsList,
    refreshLoading,
    onRefresh,
    sidOrTabChange,
    loading,
    finished,
    error,
    onLoadGoodsList,
    toDetail,
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
          
          .van-pull-refresh {
            min-height: 100%;
            
            .van-list {
              margin-top: 24px;
              
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
    }
  }
</style>