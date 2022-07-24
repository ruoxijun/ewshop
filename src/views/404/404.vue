<template>
<div class="not-found">
  <NavBar>
    <div> 404 </div>
  </NavBar>

  <div class="content">
    <van-image
        width="60%"
        fit="cover"
        position="left"
        :src="notFoundImg"
    />
  </div>
</div>
</template>

<script>
import notFoundImg from "@/assets/img/browser-404.svg";
import NavBar from "@components/common/navbar/NavBar";

export default {
  name: "404",

  setup() {

    return {
      notFoundImg,
    }
  },

  components: {
    NavBar,
  }
}
</script>

<style lang="scss" scoped>
.not-found {
  height: 100vh;
  padding-top: 45px;
  padding-bottom: 50px;

  .content {
    height: 100%;
    overflow: hidden;
    display: flex;
    align-items: center;

    .van-image {
      margin: 0 auto;
    }
  }
}

</style>