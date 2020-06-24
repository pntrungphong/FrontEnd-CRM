import request from 'umi-request';

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


    return request('http://api-harmonia.geekup.io/company', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc4OTgwNH0.C0shUr0MneL5PubMBrKiuYY6ZohSGjXE2lcFwf3o6uY",
            "Content-Type": "Application/json"
        },
        data: body,
    });
}


export async function getCompany() {
    return request('http://api-harmonia.geekup.io/company?order=DESC&page=1&take=50', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5MjkxMzA3Mn0.Bz1hT8d_kajpHXgv7RNnv7HDcXVI5Iw1I8SGqMX09As',
            'Content-Type': 'Application/json',
        },
    });
}