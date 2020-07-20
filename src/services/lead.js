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

  const review = '';
  const status = '';
  let rank = '';
  if (params.rank) rank = params.rank.toString();

  const note = [];
  if (params.note !== undefined) {
    note.push({
      title: 'title',
      content: params.note,
    });
  }

  const rankRevision = [];
  if (params.reason !== undefined) {
    rankRevision.push({
      rank,
      touchpoint: 0,
      reason: params.reason,
    });
  }

  const body = {
    name: `${params.name}`,
    createdBy: 'string',
    updatedBy: 'string',
    idCompany: companyId,
    linkContact: contact,
    relatedTo: relation,
    rank,
    rankRevision,
    tag,
    file,
    description: `${params.description}`,
    review,
    status,
    note,
  };
  return request('/lead', {
    method: 'POST',
    data: body,
  });
}

export async function updateLead(params) {
  console.table(params);
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
