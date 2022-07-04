<template>
<div class='detail'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书详情 - {{shopId}} </div>
    </template>
  </nav-bar>
  <h1>Detail 商品详情</h1>
</div>
</template>

<script>
import { ref } from 'vue';
import { useRoute } from 'vue-router';

import NavBar from "@components/common/navbar/NavBar";

export default {
  setup() {
    const route = useRoute();
    const shopId = ref(route.query.id || 0);

    return {
      shopId,
    }
  },

  components: {
    NavBar,
  },
}

</script>

<style lang='less' scoped>

</style>