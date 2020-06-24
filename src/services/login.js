import request from '@/utils/request';

export async function getFakeCaptcha(mobile) {
  return request(`/api/login/captcha?mobile=${mobile}`);
}

export async function login(params) {
  return request('/auth/login', {
    method: 'POST',
    data: params,
  });
}
