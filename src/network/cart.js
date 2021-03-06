import { request } from './request';

// 添加购物车
export function addCart(goodsId, num) {
  return request({
    url: 'api/carts',
    method: 'POST',
    data: {
      goods_id: goodsId,
      num,
    }
  });
}

// 购物车列表
export function getCarts(include) {
  return request({
    url: 'api/carts',
    method: 'GET',
    params: {
      include,
    }
  });
}

// 购物车数量改变
export function modifyCart(cartId, num) {
  return request({
    url: `api/carts/${cartId}`,
    method: 'PUT',
    data: { num }
  });
}

// 移出购物车
export function deleteCart(cartId) {
  return request({
    url: `api/carts/${cartId}`,
    method: 'DELETE',
  });
}

// 购物车改变选中
export function checkedCart(cartIds) {
  return request({
    url: 'api/carts/checked',
    method: 'PATCH',
    data: {
      cart_ids: cartIds,
    }
  });
}

