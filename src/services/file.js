// import request from '../utils/request';

export async function uploadLink(params) {
  const body = {
    name: params.name,
    url: params.url,
    note: params.note,
  };

  console.table(body);
  // return request(`/lead/${params.id}/rank`, {
  //   method: 'PUT',
  //   data: body,
  // });
}
