import request from 'umi-request';

export async function fakeCreate(params) {

    const body = {
        "name": `${params.user.name}`,
        "address": "",
        "email": "",
        "phone": "",
        "website": `${params.user.website}`,
        "url": "",
        "created_by": "",
        "updated_by": "",
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
    return request('http://api-harmonia.geekup.io/company?order=ASC&page=1&take=10', {
        method: 'GET',
        headers: {
            'Authorization': 'Bearer ' +
                'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc4OTgwNH0.C0shUr0MneL5PubMBrKiuYY6ZohSGjXE2lcFwf3o6uY',
            'Content-Type': 'Application/json',
        },
    });
}