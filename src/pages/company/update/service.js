import request from '../../../utils/request';

export async function fakeUpdate(params) {
  console.table(params);
  const body = {
    name: `${params.user.name}`,
    address: `${params.user.address}`,
    email: '',
    phone: `${params.user.phone}`,
    website: `${params.user.website}`,
    url: `${params.user.url}`,
    created_by: '',
  };

  return request(`/company/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}
export async function loadUser(params) {
  return request(`/company/${params.id}`, {
    method: 'GET',
  });
}
