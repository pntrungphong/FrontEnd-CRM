import queryString from 'query-string';
import request from '../utils/request';

const formatOutputData = (params) => {
  const idCompany = params.company && params.company.length > 0 ? params.company[0].value : '';

  const linkContact = params.contact
    ? params.contact.map((item) => ({
        idContact: item.key,
      }))
    : [];

  const relatedTo = params.relation
    ? params.relation.map((item) => ({
        idContact: item.key,
      }))
    : [];

  const file = params.brief
    ? params.brief.map((item) => {
        return {
          fileId: item.fileId ?? item.id,
          note: item.note,
        };
      })
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

  const rank = params.rank ? params.rank.toString() : '';

  const onHov = params.hov ? 1 : 0;

  const note = params.note
    ? [
        {
          title: 'title',
          content: params.note,
        },
      ]
    : [];

  const rankRevision = params.reason
    ? [
        {
          rank,
          touchPoint: 0,
          reason: params.reason,
        },
      ]
    : [{}];

  const body = {
    name: params.name,
    idCompany,
    onHov,
    linkContact,
    relatedTo,
    rank,
    rankRevision,
    tag,
    file,
    description: params.description ? params.description : '',
    review: '',
    status: 'In-progress',
    note,
  };

  if (params.lane) {
    body.lane = params.lane;
  }

  return body;
};

export async function getLeadById(params) {
  return request(`/lead/${params.id}`, {
    method: 'GET',
  });
}

export async function getAllFile(params) {
  return request(`/lead/${params.id}/file`, {
    method: 'GET',
  });
}

export async function fullCreateLead(params) {
  const outputData = formatOutputData(params);

  return request('/lead', {
    method: 'POST',
    data: outputData,
  });
}

export async function changeRank(params) {
  const body = {
    rank: params.rank,
    rankRevision: [
      {
        reason: params.reason,
        touchPoint: 0,
      },
    ],
  };
  return request(`/lead/${params.id}/rank`, {
    method: 'PUT',
    data: body,
  });
}

export async function changeStatus(params) {
  const body = {
    status: params.status,
    review: params.review,
  };
  return request(`/lead/${params.id}/status`, {
    method: 'PUT',
    data: body,
  });
}
export async function updateLead(params) {
  const linkContact = params.contact
    ? params.contact.map((item) => ({
        idContact: item.key,
      }))
    : [];

  const relatedTo = params.relation
    ? params.relation.map((item) => ({
        idContact: item.key,
      }))
    : [];

  const file = params.brief ? params.brief.map((item) => item.id) : [];

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

  const rank = params.rank !== undefined ? params.rank.toString() : '';

  const note = params.note
    ? [
        {
          title: 'title',
          content: params.note,
        },
      ]
    : [];

  const rankRevision = params.reason
    ? [
        {
          rank,
          touchPoint: 0,
          reason: params.reason,
        },
      ]
    : [{}];

  const body = {
    name: params.name,
    linkContact,
    relatedTo,
    rank,
    rankRevision,
    tag,
    file,
    description: params.description ? params.description : '',
    review: '',
    status: 'In-progress',
    note,
  };

  return request(`/lead/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}

export async function getLead(params) {
  const query = {
    order: 'ASC',
    page: params.page,
    take: 10,
    q: params.searchValue,
    status: params.status,
  };
  const stringified = queryString.stringify(query, { skipEmptyString: true });

  return request(`/lead?${stringified}`, {
    method: 'GET',
  });
}

export async function getListWithLane() {
  return request(`/lead/lane`, {
    method: 'GET',
  });
}

export async function changeLaneHov(params) {
  const body = {
    onHov: params.onHov ? 1 : 0,
  };

  return request(`/lead/${params.id}/onHov`, {
    method: 'PUT',
    data: body,
  });
}

export async function markDeal(params) {
  const body = {
    status: params.status,
    review: params.review,
  };
  return request(`/lead/${params.id}/status`, {
    method: 'PUT',
    data: body,
  });
}
