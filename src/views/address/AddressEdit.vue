<template>
<div class="address-edit">
  <nav-bar>
    <div> {{ pageType }} </div>
  </nav-bar>

  <div class="content">
    <van-address-edit
        :area-list="areaList"
        show-postal
        show-delete
        show-set-default
        show-search-result
        :search-result="searchResult"
        :area-columns-placeholder="['请选择', '请选择', '请选择']"
        @save="onSave"
        @delete="onDelete"
        @change-detail="onChangeDetail"
    />
  </div>
</div>
</template>

<script>
// Vant 官方提供了一份默认的中国省市区数据： npm i @vant/area-data
import { areaList } from '@vant/area-data';
import NavBar from "@components/common/navbar/NavBar";

import { city } from "@/network/address";
import { useRouter, useRoute } from "vue-router";
import { ref, onActivated } from 'vue';

export default {
  name: "AddressEdit",

  /*
  name	是	string	收货人姓名
  address	是	string	详细地址 addressDetail
  phone	是	string	收货手机 tel
  province	是	string	省份 province
  city	是	string	城市 city
  county	是	string	区县 county
  is_default	否	int	是否默认， 值为1是默认， 不传就不设置默认 isDefault

  */

  setup() {

    const router = useRouter();
    const route = useRoute();

    let pageType = ref("新增地址"); // 页面类型
    // 组件激活时
    onActivated(()=> {
      if (route.query.addressId){
        pageType.value = "编辑地址";
      }
      window.document.title = pageType.value;
    });

    const searchResult = ref([]);
    const onSave = (content) => {
      console.log(content)
    }
    const onDelete = () => Toast('delete');
    const onChangeDetail = (val) => {
      if (val) {
        searchResult.value = [
          {
            name: '黄龙万科中心',
            address: '杭州市西湖区',
          },
        ];
      } else {
        searchResult.value = [];
      }
    };

    return {
      pageType,
      onSave,
      onDelete,
      areaList,
      searchResult,
      onChangeDetail,
    }
  },

  components: {
    NavBar,
  }
}
</script>

<style lang="scss" scoped>

.address-edit {
  height: 100vh;
  padding: 45px 0 50px;

  .content {
    height: 100%;
  }

}

</style>