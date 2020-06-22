import request from 'umi-request';
import { method } from 'lodash';

export async function fakeUpdate(params) {

    console.table(params);
    var body = {
        "name": `${params.user.name}`,
        "address": `${params.user.address}`,
        "email": "",
        "phone": `${params.user.phone}`,
        "website": `${params.user.website}`,
        "url": `${params.user.url}`,
        "created_by": "",
        "updated_by": ""
    }


    return request(`http://localhost:3000/company/${params.id}/update`, {
        method: 'PUT',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc5OTYxN30.WkQzyQMcky85YEUbyb_5gCxt0Oy-eWFLcIkBGNCQhfw",
            "Content-Type": "Application/json"
        },
        data: body,
    });
}
export async function loadUser(params) {

    return request(`http://localhost:3000/company/${params.id}`, {
        method: 'GET',
        headers: {
            "Authorization": "Bearer " + "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6ImI2ZjBmNjc5LTQxODktNGQwMi05OWQ2LWM5NjBmMjM4YzlmNyIsImlhdCI6MTU5Mjc5OTYxN30.WkQzyQMcky85YEUbyb_5gCxt0Oy-eWFLcIkBGNCQhfw",
            "Content-Type": "Application/json"
        },
    });
}