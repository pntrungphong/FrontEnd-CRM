import { getToken } from './authority';

export const downloadFile = (fileinfo) => {
  const headers = new Headers();
  headers.append('Content-Type', 'application/json');
  headers.append('Authorization', `Bearer ${getToken()}`);
  fetch(`https://api-harmonia.geekup.io/file/${fileinfo.id}`, {
    method: 'GET',
    headers,
  }).then((response) => {
    response.blob().then((blob) => {
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = fileinfo.originalname;
      a.click();
    });
  });
};
