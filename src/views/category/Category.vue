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
      <van-collapse v-model="activevanColNames" accordion>
        <van-collapse-item
            v-for="(collapse, index) in collapses"
            :title="collapse.name"
            :disabled="collapse.children.length < 1"
            :key="collapse.id"
            :name="index">
          <van-sidebar v-model="activeSidebar">
            <van-sidebar-item
                v-for="sidebar in collapse.children"
                :key="sidebar.id"
                :title="sidebar.name" />
          </van-sidebar>
        </van-collapse-item>
      </van-collapse>
    </div>

    <div class="goods-box">
      <div class="ordertab">
        <van-tabs v-model:active="activeTab">
          <van-tab title="销量排序"></van-tab>
          <van-tab title="价格排序"></van-tab>
          <van-tab title="评论排序"></van-tab>
        </van-tabs>
        <hr />
      </div>
      <div class="goods-list"> {{activeTab}} - {{activevanColNames}} - {{activeSidebar}} </div>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { getCategory } from "@network/category.js";

import { ref, onMounted } from "vue";

export default {

setup() {
  
  const collapses = ref([]);
  
  onMounted(()=> {
    getCategory().then(res=> {
      collapses.value = res.categories;
      console.log(collapses.value);
    });
  });
  
  // 标签页选中下标
  const activeTab = ref(0);
  
  // 折叠面板展开的选项
  const activevanColNames = ref(0);
  // 侧边导航选中下标
  const activeSidebar = ref(0);
  
  return {
    activeTab,
    activevanColNames,
    collapses,
    activeSidebar,
  }
},
components: {
  NavBar,
},
}

</script>

<style lang='scss' scoped>
  .category {
    
    .category-mainbox {
      height: 100vh;
      padding-top: 45px;
      padding-bottom: 50px;
      display: flex;
      
      .left-menu {
        flex: 3;
        height: 100%;
        overflow-x: hidden;
        text-align: left;
        padding-top: calc(45px + 24px);
        box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
      }
      
      .goods-box {
        flex: 7;
        
        
        .ordertab {
          
          hr {
            height: 2px;
            margin-bottom: 24px;
            position: relative;
            top: -1px;
            background-color: #dfdfdf;
            border: none;
            border-radius: 3px;
          }
        }
        
        .goods-list {
        }
      }
    }
  }
</style>