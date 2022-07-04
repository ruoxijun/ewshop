<template>
<div class='shop-cart'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 购物车 </div>
    </template>
  </nav-bar>
  <h1>ShopCart 购物车</h1>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

export default {
components: {
  NavBar
},
}

</script>

<style lang='less' scoped>

</style>