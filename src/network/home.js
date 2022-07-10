import { request } from "./request";

export function getHomeAllData() {
  return request({
    url: 'api/index',
    method: 'GET',
  });
}

// 首页书籍列表
export function getHomeGoods(type="sales", page=1) {
  return request({
    url: 'api/index',
    method: 'GET',
    params: {
      ...JSON.parse(`{"${type}":1}`), // 选项卡分类
      page,
    },
  });
}