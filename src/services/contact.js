import queryString from 'query-string';
import request from '../utils/request';

const formatOutputData = (params) => {
  const email = params.email
    ? params.email.map((item) => ({
        type: item.type,
        url: item.url,
      }))
    : [];
  const phone = params.phone
    ? params.phone.map((item) => ({
        type: item.type,
        number: item.number,
      }))
    : [];
  const address = params.address ?? [];
  const website = params.website
    ? params.website.map((item) => ({
        type: item.type,
        url: item.url,
      }))
    : [];
  const company = params.company
    ? params.company.map((item) => ({
        idCompany: parseInt(item.key, 10),
      }))
    : [];
  const referral = params.referral
    ? params.referral.map((item) => ({
        idTarget: parseInt(item.key, 10),
        hashtag: [],
      }))
    : [];
  const tag = params.tag
    ? params.tag.map((item) =>
        item.value === item.label
          ? { tag: item.label }
          : {
              id: parseInt(item.key, 10),
              tag: item.label,
            },
      )
    : [];
  return {
    name: params.name,
    title: params.title ?? '',
    phone,
    address,
    company,
    email,
    website,
    referral,
    tag,
  };
};

export async function updateContact(params) {
  const outputData = formatOutputData(params);
  const body = {
    ...outputData,
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
  const outputData = formatOutputData(params);
  const body = {
    ...outputData,
  };
  return request('/contact', {
    method: 'POST',
    data: body,
  });
}

export async function quickCreateContact(params) {
  const body = {
    name: `${params.name}`,
  };
  return request('/contact', {
    method: 'POST',
    data: body,
  });
}

export async function getContact(params) {
  const query = {
    order: 'DESC',
    page: params.page,
    take: 10,
    q: params.searchValue,
  };
  const stringified = queryString.stringify(query, { skipEmptyString: true });

  return request(`/contact?${stringified}`, {
    method: 'GET',
  });
}
