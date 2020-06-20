import request from 'umi-request';

export async function fakeUpdate(params) {

    return request('/api/company', {
        method: 'PUT',
        data: params,
    });
}