<template>
<div class='shop-cart'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 购物车 </div>
    </template>
  </nav-bar>
  <div class="content">
    <div class="carts-list">
      <div class="cart-item" v-for="i in 50">
        <van-checkbox></van-checkbox>
        <van-card
          price="2.00"
          thumb="https://fastly.jsdelivr.net/npm/@vant/assets/ipad.jpeg"
        >
          <template #title>
            <div class="cart-title">              
              <span>商品标题</span>
              <span>×18</span>
            </div>
          </template>
          <template #num>
            <van-stepper v-model="value" min="1" max="99" integer />
          </template>
        </van-card>
      </div>
    </div>
    <div class="carts-submit-bar">
      <van-submit-bar :price="3050" button-text="提交订单" @submit="onSubmit">
        <van-checkbox v-model="checkedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { ref } from 'vue';

export default {
  
  setup() {
    
    const checkedAll = ref(false);
    const onSubmit = ()=> {};
    
    return {
      checkedAll,
      onSubmit,
    }
  },
  
  components: {
    NavBar
  },
}

</script>

<style lang='scss'>
.shop-cart {
  height: 100vh;
  padding: 45px 0 50px;
  
  .content {
    height: 100%;
    background-color: #f1f1f1;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
    
    .carts-list {
      padding-top: 8px;
      flex-grow: 1;
      overflow-x: hidden;
      
      .cart-item {
        margin: 0 6px 8px;
        border-radius: 8px;
        background-color: #fff;
        overflow: hidden;
        display: flex;
        align-items: center;
        
        .van-checkbox {
          margin-left: 8px;
        }
        
        .van-card {
          flex-grow: 1;
          background-color: #fff;
          
          .van-card__content {
            padding: 5px;

            .cart-title {
              font-size: 16px;
              display: flex;
              justify-content: space-between;
            }
            .van-card__bottom {
              display: flex;
              align-items: center;
              justify-content: space-between;
              
              .van-card__price {
                color: red;
                font-size: 18px;
                font-weight: bold;
                
                .van-card__price-integer {
                  margin: 0 2px;
                  font-size: 20px;
                }
              }
              .van-card__num {
                float: unset;
              }
            }
          }
        }
      }
    }
    
    .carts-submit-bar {
      
      .van-submit-bar{
        position: unset;
      }
    }
  }
}
</style>