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
  console.table(params);
  const email = [];
  if (params.contact.email !== undefined) {
    params.contact.email.forEach((element) => {
      email.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const phone = [];
  if (params.contact.phone !== undefined) {
    params.contact.phone.forEach((element) => {
      phone.push({
        type: element.type,
        number: element.number,
      });
    });
  }

  const address = [];
  if (params.contact.address !== undefined) {
    params.contact.address.forEach((element) => {
      address.push(element);
    });
  }

  const website = [];
  if (params.contact.website !== undefined) {
    params.contact.website.forEach((element) => {
      console.table(element);
      website.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const company = [];
  if (params.contact.company !== undefined) {
    params.contact.company.forEach((element) => {
      company.push({
        idCompany: element.key,
        // title:"String"
      });
    });
  }

  const referral = [];
  if (params.contact.referral !== undefined) {
    params.contact.referral.forEach((element) => {
      referral.push({
        idTarget: element.key,
        hastag: [],
      });
    });
  }

  const tag = [];
  if (params.contact.tag !== undefined) {
    params.contact.tag.forEach((element) => {
      if (element.value === element.key) {
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
    name: `${params.contact.name}`,
    title: params.contact.title !== undefined ? params.contact.title : '',
    phone,
    address,
    company,
    email,
    website,
    referral,
    tag,
  };

  console.table(body);

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
  const email = [];
  if (params.contact.email !== undefined) {
    params.contact.email.forEach((element) => {
      email.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const phone = [];
  if (params.contact.phone !== undefined) {
    params.contact.phone.forEach((element) => {
      phone.push({
        type: element.type,
        number: element.number,
      });
    });
  }

  const address = [];
  if (params.contact.address !== undefined) {
    params.contact.address.forEach((element) => {
      address.push(element);
    });
  }

  const website = [];
  if (params.contact.website !== undefined) {
    params.contact.website.forEach((element) => {
      console.table(element);
      website.push({
        type: element.type,
        url: element.url,
      });
    });
  }

  const company = [];
  if (params.contact.company !== undefined) {
    params.contact.company.forEach((element) => {
      company.push({
        idCompany: element.key,
        // title:"String"
      });
    });
  }

  const referral = [];
  if (params.contact.referral !== undefined) {
    params.contact.referral.forEach((element) => {
      referral.push({
        idTarget: element.key,
        hastag: [''],
      });
    });
  }

  const tag = [];
  if (params.contact.tag !== undefined) {
    params.contact.tag.forEach((element) => {
      if (element.value === element.key) {
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
    name: `${params.contact.name}`,
    title: params.contact.title !== undefined ? params.contact.title : '',
    phone,
    address,
    company,
    email,
    website,
    referral,
    tag,
  };
  console.table(body);
  return request('/contact', {
    method: 'POST',
    data: body,
  });
}

export async function getContact(params) {
  if (params.searchValue !== '') {
    return request(`/contact?order=DESC&page=${params.page}&take=10&q=${params.searchValue}`, {
      method: 'GET',
    });
  }
  return request(`/contact?order=DESC&page=${params.page}&take=10`, {
    method: 'GET',
  });
}
