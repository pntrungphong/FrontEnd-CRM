import request from 'umi-request';

export async function fakeCreate(params) {

    params = {
        "name": `${params.user.name}`,
        "address": "",
        "email": "",
        "phone": "",
        "website": `${params.user.website}`,
        "url": "",
        "createdBy": "",
        "updatedBy": "",
    };
    console.table(params);

    return request('http://localhost:3000/company', {
        method: 'POST',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc4OTgwNH0.C0shUr0MneL5PubMBrKiuYY6ZohSGjXE2lcFwf3o6uY",
            "Content-Type": "Application/json"
        },
        data: params,
    });
}