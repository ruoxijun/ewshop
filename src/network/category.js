import { request } from "./request";

// 分类页面侧边栏
export function getCategory() {
  return request({
    url: "/api/goods",
    method: "GET",
  });
}

// 分类页面书籍列表
export function getCategoryGoods(page=1, cid=0, order='sales') {
  return request({
    url: "/api/goods",
    method: "GET",
    params: {
      page, // 页数
      category_id: cid, // 侧边栏分类搜索
      ...JSON.parse(`{"${order}": 1}`), // 排序方式
    }
  });
}