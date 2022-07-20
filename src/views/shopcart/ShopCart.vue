<template>
<div class='shop-cart'>
  <nav-bar>
    <template v-slot:left></template>
    <template v-slot:default>
      <div> 购物车 (<span> {{$store.state.carts.count}} </span>) </div>
    </template>
  </nav-bar>
  <div class="content">
    <div class="carts-list">
      <van-checkbox-group v-model="result" @change="groupChange" ref="checkboxGroup">
        <van-swipe-cell v-for="cart in list" :key="cart.id">
          <div class="cart-item">
            <van-checkbox :name="cart.id"></van-checkbox>
            <van-card
                :price="cart.goods.price.toFixed(2)"
                :thumb="cart.goods.cover_url"
                @click-thumb="toDetail(cart.goods.id)"
            >
              <template #title>
                <div class="cart-title">
                  <span>{{ cart.goods.title }}</span>
                  <span>× {{ cart.goods.stock }}</span>
                </div>
              </template>
              <template #num>
                <van-stepper
                    v-model="cart.num"
                    :name="cart.id"
                    @change="cartNumChange"
                    min="1" :max="cart.goods.stock"
                    integer theme="round"
                />
              </template>
            </van-card>
          </div>
          <template #right>
            <van-button @click="deleteGood(cart.id)" square text="删除" type="danger" class="delete-button" />
          </template>
        </van-swipe-cell>
      </van-checkbox-group>

      <div class="empty" v-if="list.length < 1">
        <van-empty
            image="https://fastly.jsdelivr.net/npm/@vant/assets/custom-empty-image.png"
            image-size="80"
            description="购物车空空如也"
        >
          <van-button round type="primary" @click="$router.push('/')"> 前往选购 </van-button>
        </van-empty>
      </div>
    </div>

    <div class="carts-submit-bar">
      <van-submit-bar :price="allPrice * 100" button-text="提交订单" @submit="onSubmit">
        <van-checkbox @click="clickCheckAll" v-model="checkedAll">全选</van-checkbox>
      </van-submit-bar>
    </div>
  </div>
</div>
</template>

<script>
import NavBar from "@components/common/navbar/NavBar";

import { getCarts, modifyCart, checkedCart, deleteCart } from '@network/cart';
import { Toast } from 'vant';

import detail from '@mixins/detail';
import { useRouter } from 'vue-router';
import { nextTick, reactive, ref, toRefs, onMounted, computed } from 'vue';

export default {

  setup() {
    
    const router = useRouter();

    // 到商品详情页面
    const { toDetail } = detail();

    // 购物车列表
    const carts = reactive({
      list: [],
      result: [], // 选中的商品
    });
    const init = ()=> {
      Toast.loading({
        message: '加载中...',
        duration: 0,
        forbidClick: true,
      });
      getCarts("goods").then(res=> {
        console.log(res.data);
        carts.list = res.data;
        // 购物车多选框
        carts.result = res.data.filter(c=> c.is_checked === 1 ).map(c=> c.id);
        checkedAll.value = carts.list.length===carts.result.length;

        nextTick(()=> {
          Toast.clear();
        });
      });
    }
    onMounted(()=> {
      init();
    });

    // 购物车数量商品数量改变时
    const cartNumChange = (value, detail)=> {
      Toast.loading({
        message: '修改中...',
        duration: 0,
        forbidClick: true,
      });

      const cartId = detail.name;
      modifyCart(cartId, value).then(res=> {
        if (res.status = 204) {
          Toast.clear();
        }
      });
    }

    // 商品复选框组改变时
    const groupChange = result=> {
      Toast.loading({
        message: '选择中...',
        duration: 0,
        forbidClick: true,
      });

      checkedCart(carts.result).then(res=> {
        if(res.status == 204){
          checkedAll.value = carts.list.length===carts.result.length;
          
          // 同步购物车列表 is_checked 值
          carts.list.forEach(c=>{
            if(result.indexOf(c.id) != -1) {
              c.is_checked = 1; // 选中
              return;
            }
            c.is_checked = 0;
          });
          Toast.clear();
        }
      });
    }
    
    // 是否全选
    const checkedAll = ref(false);
    const checkboxGroup = ref(null);
    const clickCheckAll = e=> {
      checkboxGroup.value.toggleAll(checkedAll.value);
    }
    
    // 删除购物车
    const deleteGood = id=> {
      deleteCart(id).then(res=> {
        init();
      });
    }
    
    // 总价
    const allPrice = computed(()=> {
      if(carts.list.length) {
        return carts.list.filter(cart=> cart.is_checked===1)
          .reduce((previousValue, c)=>  previousValue + (c.num * c.goods.price), 0);
      }
      return 0;
    });
    
    // 提交订单
    const onSubmit = ()=> {
      if(carts.result.length < 1) {
        Toast.fail("请选择要结算的商品");
        return;
      }
      router.push('/profile');
    };

    return {
      toDetail,
      ...toRefs(carts),
      cartNumChange,
      groupChange,
      checkedAll,
      checkboxGroup,
      clickCheckAll,
      deleteGood,
      allPrice,
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

      .van-swipe-cell {
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

        .van-button {
          height: 100%;
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