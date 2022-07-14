<template>
  <div class="goods">
    <goods-list-item v-for="item in goods" :item="item" :key="item.id"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';
  
  export default {
    props: {
      goods: {
        type: Array,
        default(){
          return [];
        }
      }
    },
    components: {
      GoodsListItem,
    }
  }
</script>

<style lang="scss" scoped>
  .goods {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
    padding: 4px;
  }
</style>