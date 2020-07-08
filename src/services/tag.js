import request from '../utils/request';

export async function getTag() {
  return request('/tag', {
    method: 'GET',
  });
}
