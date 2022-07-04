<template>
<div class='profile'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 个人中心 </div>
    </template>
  </nav-bar>
  <h1>Profile 个人中心</h1>
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