import request from 'umi-request';

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


    return request('http://api-harmonia.geekup.io/company', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc4OTgwNH0.C0shUr0MneL5PubMBrKiuYY6ZohSGjXE2lcFwf3o6uY",
            "Content-Type": "Application/json"
        },
        data: body,
    });
}