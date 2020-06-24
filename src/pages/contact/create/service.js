import request from '../../../utils/request';

export async function createContact(params) {
  const body = {
    name: `${params.contact.name}`,
    phone: `${params.contact.phone}`,
    address: `${params.contact.address}`,
    email: `${params.contact.email}`,
    website: `${params.contact.website}`,
  };
  console.table(body);

  return request('/contacts', {
    method: 'POST',
    data: body,
  });
}
