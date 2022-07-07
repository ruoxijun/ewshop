<template>
<div class="tab-control">
  <div v-for="(title, index) in titles"
      :key="index"
      @click="clickItem(index)"
      :class="{active: index == activeIndex}" class="tab-control-item">
    <span> {{title}} </span>
  </div>
</div>
</template>

<script>
import { ref } from 'vue';

export default {
  
  props: {
    titles: {
      type: Array,
      // 如果是对象或数组建议使用方法返回值方式设置默认值
      default() {
        return [];
      }
    },
    activeIndex: {
      type: Number,
      default: 0,
    }
  },
  
  setup(props, { emit }){
    // const currentIndex = ref(0);
    
    const clickItem = index=> {
      // currentIndex.value = index;
      emit("clickItem", index);
    }
    
    return {
      // currentIndex,
      clickItem,
    }
  }
}
</script>

<style lang="scss" scoped>
.tab-control {
  height: 40px;
  line-height: 40px;
  font-size: 14px;
  width: 100%;
  background-color: #fff;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
  display: flex;
  text-align: center;
  z-index: 2;
  
  .tab-control-item {
    flex: 1;
    
    span {
      padding: 6px;
    }
  }
  
  .active {
    color: var(--color-tint);
    
    span {
      border-bottom: 3px solid var(--color-tint);
    }
  }
}
.tab-control-fixed {
  position: fixed;
  top: 45px;
}
</style>