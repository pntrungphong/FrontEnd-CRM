import request from '../utils/request';

// export async function createCompany(params) {
//   const body = {
//     name: `${params.company.name}`,
//     address: '',
//     email: '',
//     phone: '',
//     website: `${params.company.website}`,
//     url: '',
//     createdBy: '',
//     updatedBy: '',
//   };

//   return request('/company', {
//     method: 'POST',

//     data: body,
//   });
// }

export async function getCompany() {
  return request('/company?order=ASC&page=1&take=50', {
    method: 'GET',
  });
}

export async function updateCompany(params) {
  console.table(params);
  const body = {
    name: `${params.company.name}`,
    address: `${params.company.address}`,
    email: `${params.company.email}`,
    phone: `${params.company.phone}`,
    website: `${params.company.website}`,
    url: `${params.company.url}`,
    updatedBy: '',
  };

  return request(`/company/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}
export async function getCompanyById(params) {
  return request(`/company/${params.id}`, {
    method: 'GET',
  });
}

export async function getCompanyByName(params) {
  console.log(params);
  return request(`/company?order=ASC&page=1&take=10&q=${params}`, {
    method: 'GET',
  });
}

export async function fullCreateCompany(params) {
  const body = {
    name: `${params.company.name}`,
    address: `${params.company.address}`,
    email: `${params.company.email}`,
    phone: `${params.company.phone}`,
    website: `${params.company.website}`,
    url: `${params.company.url}`,
    createdBy: '',
    updatedBy: '',
  };

  return request('/company', {
    method: 'POST',
    data: body,
  });
}
