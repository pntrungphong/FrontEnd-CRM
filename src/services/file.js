// import request from '../utils/request';
import moment from 'moment';

export async function uploadLink(params) {
  const body = {
    name: params.name,
    url: params.url,
    note: params.note,
  };

  console.table(body);
  await new Promise((resolve) => setTimeout(resolve, 1500));
  return {
    originalname: 'Cau Hoi On Tap.pdf',
    order: 1,
    id: '490',
    createdAt: moment(Date.now()).format('DD-MM-YYYY'),
    createdBy: 'Admin',
    note: '123',
    old: false,
    fileType: 'link',
    fileUrl: 'https://fb.com',
  };
  // return request(`/lead/${params.id}/rank`, {
  //   method: 'PUT',
  //   data: body,
  // });
}
