import queryString from 'query-string';
import request from '../utils/request';

const formatOutputData = (params) => {
  const email = params.email ?? [];
  const phone = params.phone ?? [];
  const address = params.address ?? [];
  const website = params.website ?? [];
  const contact = params.contact
    ? params.contact.map((item) => ({
        idContact: parseInt(item.key, 10),
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
    phone,
    url: params.url ? params.url : '',
    address,
    email,
    website,
    contact,
    tag,
  };
};

export async function getCompany(params) {
  const query = {
    order: 'DESC',
    page: params.page,
    take: 10,
    q: params.searchValue,
  };
  const stringified = queryString.stringify(query, { skipEmptyString: true });

  return request(`/company?${stringified}`, {
    method: 'GET',
  });
}

export async function updateCompany(params) {
  const outputData = formatOutputData(params);

  const body = {
    ...outputData,
  };

  return request(`/company/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}

export async function getDetail(params) {
  return request(`/company/${params.id}`, {
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

export async function createCompany(params) {
  const outputData = formatOutputData(params);

  const body = {
    ...outputData,
  };

  return request('/company', {
    method: 'POST',
    data: body,
  });
}
