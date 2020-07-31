import request from '@/utils/request';

export async function query() {
  return request('/api/users');
}
export async function queryCurrent() {
  return request('/auth/me');
}
export async function queryNotices() {
  return request('/api/notices');
}
export async function getUsers() {
  return request('/users/users?order=ASC&page=1&take=10');
}
