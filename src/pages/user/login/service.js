import request from 'umi-request';

export async function fakeAccountLogin(params) {
  return request('http://localhost:3000/auth/login', {
    method: 'POST',
    data: params,
  });
}
export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}
