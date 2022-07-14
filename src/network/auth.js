import { request } from './request';

export function register(data) {
  return request({
    url: '/api/auth/register',
    method: "POST",
    data,
  });
}