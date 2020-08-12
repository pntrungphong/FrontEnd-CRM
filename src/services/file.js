import request from '../utils/request';

export async function uploadLink(params) {
  const body = {
    name: params.name,
    url: params.url,
    note: params.note,
    type: 'link',
    touchPointId: params.touchPointId,
    leadId: params.leadId,
  };
  return request(`/file/url`, {
    method: 'POST',
    data: body,
  });
}

export async function uploadFile(params) {
  const body = {
    fileId: params.fileId.toString(),
    note: params.note,
    type: 'file',
    touchPointId: params.touchPointId.toString(),
    leadId: params.leadId.toString(),
  };
  return request(`/file/attachment`, {
    method: 'POST',
    data: body,
  });
}

export async function updateNote(params) {
  return request(`/touchPointFile/${params.id}`, {
    method: 'PUT',
    data: {
      note: params.note,
    },
  });
}
