<template>
<div class="address">
  <nav-bar>
    <div> 地址管理 </div>
  </nav-bar>

  <div class="content">
    <van-address-list
        v-model="chosenAddressId"
        :list="list"
        default-tag-text="默认"
        @add="onAdd"
        @edit="onEdit"
    >
      <template #default>
        <van-empty
            v-if="!list.length"
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
            image-size="80"
            description="快来新增一个地址吧！！！"
        />
      </template>
    </van-address-list>

  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { ref } from 'vue';
import { Toast } from 'vant';
import { city } from "@/network/address";
import { useRouter } from "vue-router";

export default {
  name: "Address",

  setup(){

    const router = useRouter();

    const chosenAddressId = ref('1');
    const list = [];
    const onAdd = ()=> {
      router.push(`/addressedit?addressId=`);
    }
    const onEdit = (item, index) => Toast('编辑地址:' + index);

    return {
      list,
      onAdd,
      onEdit,
      chosenAddressId,
    }
  },

  components: {
    NavBar,
  }
}
</script>

<style lang="scss">
.address {
  height: 100vh;
  padding: 45px 0 50px;

  .content {
    height: 100%;

    .van-address-list {

      .van-address-list__bottom {
        z-index: unset;
        bottom: 65px;
      }
    }
  }
}
</style>