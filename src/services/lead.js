import request from '../utils/request';

export async function createLead(params) {
  const body = {
    name: `${params.lead.name}`,
    address: '',
    email: '',
    phone: '',
    website: `${params.lead.website}`,
    url: '',
    createdBy: '',
    updatedBy: '',
  };

  return request('/lead', {
    method: 'POST',

    data: body,
  });
}

export async function getLead() {
  return request('/lead?order=ASC&page=1&take=50', {
    method: 'GET',
  });
}

export async function updateLead(params) {
  console.table(params);
  const body = {
    name: `${params.lead.name}`,
    address: `${params.lead.address}`,
    email: `${params.lead.email}`,
    phone: `${params.lead.phone}`,
    website: `${params.lead.website}`,
    url: `${params.lead.url}`,
    updatedBy: '',
  };

  return request(`/lead/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}
export async function getLeadById(params) {
  return request(`/lead/${params.id}`, {
    method: 'GET',
  });
}

export async function getLeadByName(params) {
  console.log(params);
  return request(`/lead?order=ASC&page=1&take=10&q=${params}`, {
    method: 'GET',
  });
}

export async function fullCreateLead(params) {
  const body = {
    name: `${params.lead.name}`,
    address: `${params.lead.address}`,
    email: `${params.lead.email}`,
    phone: `${params.lead.phone}`,
    website: `${params.lead.website}`,
    url: `${params.lead.url}`,
    createdBy: '',
    updatedBy: '',
  };

  return request('/lead', {
    method: 'POST',
    data: body,
  });
}
