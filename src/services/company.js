import request from '../utils/request';

export async function getCompany(params) {
  if (params.searchValue !== '') {
    return request(`/company?order=DESC&page=${params.page}&take=10&q=${params.searchValue}`, {
      method: 'GET',
    });
  }
  return request(`/company?order=DESC&page=${params.page}&take=10`, {
    method: 'GET',
  });
}

export async function updateCompany(params) {
  const email = [];
  if (params.email !== undefined) {
    params.email.forEach((element) => {
      email.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const phone = [];
  if (params.phone !== undefined) {
    params.phone.forEach((element) => {
      phone.push({
        type: element.type,
        number: element.number,
      });
    });
  }

  const address = [];
  if (params.address !== undefined) {
    params.address.forEach((element) => {
      address.push(element);
    });
  }

  const website = [];
  if (params.website !== undefined) {
    params.website.forEach((element) => {
      website.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const contact = [];
  if (params.contact !== undefined) {
    params.contact.forEach((element) => {
      contact.push({
        idContact: parseInt(element.key, 10),
      });
    });
  }

  const tag = [];
  if (params.tag !== undefined) {
    params.tag.forEach((element) => {
      if (element.label === element.key) {
        tag.push({
          tag: element.label,
        });
      } else {
        tag.push({
          id: parseInt(element.key, 10),
          tag: element.label,
        });
      }
    });
  }

  const body = {
    name: `${params.name}`,
    email,
    phone,
    address,
    url: params.url !== undefined ? params.url : '',
    website,
    contact,
    tag,
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
  return request(`/company?order=ASC&page=1&take=10&q=${params}`, {
    method: 'GET',
  });
}

export async function quickCreateCompany(params) {
  const body = {
    name: `${params.name}`,
  };
  return request('/company', {
    method: 'POST',
    data: body,
  });
}

export async function fullCreateCompany(params) {
  const email = [];
  if (params.email !== undefined) {
    params.email.forEach((element) => {
      email.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const phone = [];
  if (params.phone !== undefined) {
    params.phone.forEach((element) => {
      phone.push({
        type: element.type,
        number: element.number,
      });
    });
  }

  const address = [];
  if (params.address !== undefined) {
    params.address.forEach((element) => {
      address.push(element);
    });
  }

  const website = [];
  if (params.website !== undefined) {
    params.website.forEach((element) => {
      website.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const contact = [];
  if (params.contact !== undefined) {
    params.contact.forEach((element) => {
      contact.push({
        idContact: parseInt(element.key, 10),
      });
    });
  }

  const tag = [];
  if (params.tag !== undefined) {
    params.tag.forEach((element) => {
      if (element.label === element.key) {
        tag.push({
          tag: element.label,
        });
      } else {
        tag.push({
          id: parseInt(element.key, 10),
          tag: element.label,
        });
      }
    });
  }

  const body = {
    name: `${params.name}`,
    email,
    phone,
    address,
    url: params.url ? params.url : '',
    website,
    contact,
    tag,
  };

  return request('/company', {
    method: 'POST',
    data: body,
  });
}
