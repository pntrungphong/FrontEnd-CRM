import request from '@/utils/request';

export async function getContracts(params) {
  return request('/property_contracts', {
    method: 'GET',
    params,
  });
}
