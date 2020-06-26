import request from '../utils/request';

export async function createContact(params) {
  const body = {
    name: `${params.contact.name}`,
    phone: `${params.contact.phone}`,
    address: '',
    email: '1@abc.com',
    website: '',
  };

  return request('/contact', {
    method: 'POST',
    data: body,
  });
}

export async function updateContact(params) {
  const body = {
    name: `${params.contact.name}`,
    address: `${params.contact.address}`,
    email: `${params.contact.email}`,
    phone: `${params.contact.phone}`,
    website: `${params.contact.website}`,
  };

  return request(`/contact/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}

export async function getContactById(params) {
  return request(`/contact/${params.id}`, {
    method: 'GET',
  });
}

export async function fullCreateContact(params) {
  const company = [];
  params.contact.company.forEach((element) => {
    company.push(element.key);
  });

  const body = {
    name: `${params.contact.name}`,
    phone: `${params.contact.phone}`,
    address: `${params.contact.address}`,
    company,
    email: `${params.contact.email}`,
    website: `${params.contact.website}`,
  };
  console.table(body);

  // return request('/contact', {
  //     method: 'POST',
  //     data: body,
  // });
}

export async function getContact() {
  return request('/contact?order=ASC&page=1&take=50', {
    method: 'GET',
  });
}
