import request from '../../../utils/request'

export async function fakeUpdate(params) {

    console.table(params);
    const body = {
        "name": `${params.user.name}`,
        "address": `${params.user.address}`,
        "email": "",
        "phone": `${params.user.phone}`,
        "website": `${params.user.website}`,
        "url": `${params.user.url}`,
        "created_by": "",

    }


    return request(`/company/${params.id}`, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc5OTYxN30.WkQzyQMcky85YEUbyb_5gCxt0Oy-eWFLcIkBGNCQhfw",
            "Content-Type": "Application/json"
        },
        data: body,
    });
}
export async function loadUser(params) {

    return request(`/company/${params.id}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc5OTYxN30.WkQzyQMcky85YEUbyb_5gCxt0Oy-eWFLcIkBGNCQhfw",
            "Content-Type": "Application/json"
        },
    });
}