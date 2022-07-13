<template>
<div @click="clickBackTop" class="back-top">
  <img class="back-top-img" src="@assets/img/backtop.svg" alt="返回顶部" />
</div>
</template>

<script>

export default {
  setup(props, {emit}) {
    const clickBackTop = ()=> {
      emit("clickBackTop");
    }
    
    return {
      clickBackTop,
    }
  }
}
</script>

<style lang="scss" scoped>
.back-top {
  width: 45px;
  height: 45px;
  padding: 10px;
  border-radius: 5px;
  box-shadow: 0px 0px 6px rgba(0, 0, 0, .12);
  position: fixed;
  right: 15px;
  bottom: calc(50px + 15px);
  background-color: #fff;
  opacity: .8;
  
  .back-top-img {
    width: 100%;
    height: 100%;
  }
}
</style>