import request from '../../../utils/request'
export async function createCompany(params) {

    const body = {
        "name": `${params.company.name}`,
        "address": "",
        "email": "",
        "phone": "",
        "website": `${params.company.website}`,
        "url": "",
        "createdBy": "",
        "updatedBy": ""
    };


    return request('/company', {
        method: 'POST',

        data: body,
    });
}


export async function getCompany() {
    return request('/company?order=DESC&page=1&take=50', {
        method: 'GET',

    });
}