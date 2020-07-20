import request from '../utils/request';

export async function getLeadById(params) {
  return request(`/lead/${params.id}`, {
    method: 'GET',
  });
}
export async function fullCreateLead(params) {
  let companyId = '';
  if (params.company !== undefined && params.company.length) {
    companyId = params.company[0].value;
  }
  const contact = [];
  if (params.contact !== undefined) {
    params.contact.forEach((element) => {
      contact.push({
        idContact: element.key,
      });
    });
  }
  const relation = [];
  if (params.relation !== undefined) {
    params.relation.forEach((element) => {
      relation.push({
        idContact: element.key,
      });
    });
  }
  const file = [];
  if (params.listFile !== undefined) {
    params.listFile.forEach((element) => {
      file.push(element.response.id);
    });
  }

  const tag = [];
  if (params.tag !== undefined) {
    params.tag.forEach((element) => {
      if (element.value === element.key) {
        tag.push({
          tag: element.label,
        });
      } else {
        tag.push({
          id: element.key,
          tag: element.label,
        });
      }
    });
  }

  const body = {
    name: `${params.name}`,
    createdBy: 'string',
    updatedBy: 'string',
    rank: `${params.rank}`,
    idCompany: companyId,
    linkContact: contact,
    relatedTo: relation,
    tag,
    file,
    description: `${params.description}`,
    note: [],
    status: '',
  };
  return request('/lead', {
    method: 'POST',
    data: body,
  });
}

export async function changeRank(params) {
  const body = {
    rank: params.rank,
    rankRevision: [
      {
        reason: params.reason,
        touchpoint: 0,
      },
    ],
  };
  return request(`/lead/${params.id}/changerank`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateLead(params) {
  const contact = [];
  if (params.contact !== undefined) {
    params.contact.forEach((element) => {
      contact.push({
        idContact: element.key,
      });
    });
  }

  const relation = [];
  if (params.relation !== undefined) {
    params.relation.forEach((element) => {
      relation.push({
        idContact: element.key,
      });
    });
  }

  const file = [];
  if (params.brief !== undefined) {
    params.brief.forEach((element) => {
      file.push(element.id);
    });
  }

  const tag = [];
  if (params.tag !== undefined) {
    params.tag.forEach((element) => {
      if (element.value === element.label) {
        tag.push({
          tag: element.label,
        });
      } else {
        tag.push({
          id: element.key,
          tag: element.label,
        });
      }
    });
  }

  const rank = params.rank.rank ? params.rank.rank.toString() : params.rank.toString();

  const note = params.rank.rank
    ? [
        {
          title: 'Change rank',
          content: params.rank.reason,
        },
      ]
    : [];

  const body = {
    name: `${params.name}`,
    idCompany: params.company !== undefined ? params.company.key.toString() : '',
    linkContact: contact,
    relatedTo: relation,
    tag,
    rank,
    file,
    description: `${params.description}`,
    note,
    status: 'string',
  };

  return request(`/lead/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}
export async function getLead(params) {
  if (params.searchValue !== '') {
    return request(`/lead?order=DESC&page=${params.page}&take=10&q=${params.searchValue}`, {
      method: 'GET',
    });
  }
  return request(`/lead?order=DESC&page=${params.page}&take=10`, {
    method: 'GET',
  });
}
