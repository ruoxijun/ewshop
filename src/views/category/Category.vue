<template>
<div class='category'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 图书分类 </div>
    </template>
  </nav-bar>
  <h1>Category 分类</h1>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

export default {
components: {
  NavBar,
},
}

</script>

<style lang='less' scoped>

</style>