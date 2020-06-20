import request from 'umi-request';

export async function fakeCreate(params) {

    return request('/api/company', {
        method: 'POST',
        data: params,
    });
}