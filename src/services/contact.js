import request from '../utils/request';

export async function createContact(params) {
  const body = {
    name: `${params.contact.name}`,
    phone: [`${params.contact.phone}`],
    address: [''],
    email: [''],
    company: [''],
    website: [''],
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
    company.push({
      companyId: element.key,
    });
  });

  const email = [];
  if (params.contact.email !== undefined) {
    params.contact.email.forEach((element) => {
      email.push(element);
    });
  }

  const phone = [];
  if (params.contact.phone !== undefined) {
    params.contact.phone.forEach((element) => {
      phone.push(element);
    });
  }
  const website = [];
  if (params.contact.website !== undefined) {
    params.contact.website.forEach((element) => {
      website.push(element);
    });
  }

  const body = {
    name: `${params.contact.name}`,
    phone,
    address: ['string'],
    company,
    email,
    website,
  };
  console.table(body);

  return request('/contact', {
    method: 'POST',
    data: body,
  });
}

export async function getContact(params) {
  if (params.searchValue !== '') {
    return request(`/contact?order=ASC&page=${params.page}&take=10&q=${params.searchValue}`, {
      method: 'GET',
    });
  }
  return request(`/contact?order=ASC&page=${params.page}&take=10`, {
    method: 'GET',
  });
}
