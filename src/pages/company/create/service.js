import request from '../../../utils/request'

export async function createCompany(params) {

    const body = {
        "name": `${params.company.name}`,
        "address": `${params.company.address}`,
        "email": `${params.company.email}`,
        "phone": `${params.company.phone}`,
        "website": `${params.company.website}`,
        "url": `${params.company.url}`,
        "createdBy": "",
        "updatedBy": ""
    }


    return request('/company', {
        method: 'POST',
        data: body,
    });
}