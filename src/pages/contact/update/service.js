import request from '../../../utils/request';

export async function updateContact(params) {
  const body = {
    name: `${params.contact.name}`,
    address: `${params.contact.address}`,
    email: '123@gmail.com',
    phone: `${params.contact.phone}`,
    website: `${params.contact.website}`,
  };

  return request(`/contacts/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}
export async function loadContact(params) {
  return request(`/contacts/${params.id}`, {
    method: 'GET',
  });
}
