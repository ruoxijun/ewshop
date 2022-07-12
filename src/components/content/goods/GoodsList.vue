<template>
  <div class="goods">
    <goods-list-item v-for="item in goods.list" :item="item" :key="item.id"></goods-list-item>
  </div>
</template>

<script>
  import GoodsListItem from './GoodsListItem';
  
  export default {
    props: {
      goods: {
        type: Object,
        default(){
          return {page: 0, list: []}
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
    justify-content: space-around;
    padding: 4px;
  }
</style>