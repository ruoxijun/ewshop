import { request } from "./request";

export function getHomeAllData() {
  return request({
    url: 'api/index',
    method: 'GET',
  });
}

export function getHomeGoods(type="sales", page=1) {
  return request({
    url: 'api/index',
    method: 'GET',
    params: {
      ...JSON.parse(`{"${type}":1}`),
      page,
    },
  });
}