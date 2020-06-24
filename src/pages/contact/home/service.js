import request from '../../../utils/request';

export async function createContact(params) {
  const body = {
    name: `${params.contact.name}`,
    phone: `${params.contact.phone}`,
    address: '',
    email: '@',
    website: '',
    referral: '',
    createdBy: '',
    updatedBy: '',
  };

  return request('/contacts', {
    method: 'POST',
    data: body,
  });
}

export async function getContact() {
  return request('/contacts?order=ASC&page=1&take=10', {
    method: 'GET',
  });
}
