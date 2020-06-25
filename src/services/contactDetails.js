import request from '@/utils/request';

export async function queryContactProfile() {
  return request('/contacts/1', {
    method: 'GET',
  });
}
