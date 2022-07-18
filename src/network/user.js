import { request } from './request';

export function register(data) {
  return request({
    url: '/api/auth/register',
    method: "POST",
    data,
  });
}

export function login(data) {
  return request({
    url: '/api/auth/login',
    method: "POST",
    data,
  });
}

export function logout() {
  return request({
    url: '/api/auth/logout',
    method: 'POST',
  });
}