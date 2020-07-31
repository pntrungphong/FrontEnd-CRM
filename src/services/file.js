import request from '../utils/request';

export async function uploadLink(params) {
  const body = {
    name: params.name,
    url: params.url,
    note: params.note,
    type: 'link',
    touchPointId: params.touchPointId.toString(),
    leadId: params.leadId.toString(),
  };
  return request(`/file/url`, {
    method: 'POST',
    data: body,
  });
}

export async function updateNote(params) {
  return request(`/noteFile/${params.id}`, {
    method: 'PUT',
    data: {
      note: params.note,
    },
  });
}
