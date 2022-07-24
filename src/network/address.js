import { request } from "./request";

// 省市县数据
export function city(pid=0) {
    return request({
        url: '/api/city',
        method: 'GET',
        params: {
            pid,
        }
    });
}

// 添加地址
export function addAddress(data) {
    return request({
        url: '/api/address',
        method: 'POST',
        data,
    });
}

// 地址列表
export function getAddress() {
    return request({
        url: '/api/address',
        method: 'GET',
    });
}

// 地址详情
export function address(addressId) {
    return request({
        url: `/api/address/${addressId}`,
        method: 'GET',
    });
}

// 更新地址
export function updateAddress(addressId, data) {
    return request({
        url: `/api/address/${addressId}`,
        method: 'PUT',
        data,
    });
}

// 删除地址
export  function deleteAddress(addressId) {
    return request({
        url: `/api/address/${addressId}`,
        method: 'DELETE',
    });
}

// 设置为默认地址
export function defaultAddress(addressId) {
    return request({
        url: `/api/address/${addressId}/default`,
        method: 'PATCH',
    });
}
