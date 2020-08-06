import queryString from 'query-string';
import request from '../utils/request';

const formatOutputData = (params) => {
  const email = params.email ?? [];
  const phone = params.phone ?? [];
  const address = params.address ?? [];
  const website = params.website ?? [];
  // const lead = params.lead
  //   ? params.lead.map((item) => ({
  //       idLead: parseInt(item.key, 10),
  //     }))
  //   : [];
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
  console.table(params);
  const outputData = formatOutputData(params);
  const body = {
    ...outputData,
  };
  console.table(outputData);
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
