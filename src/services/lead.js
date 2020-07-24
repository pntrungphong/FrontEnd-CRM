import request from '../utils/request';

export async function getLeadById(params) {
    return request(`/lead/${params.id}`, {
        method: 'GET',
    });
}

export async function getAllFile(params) {
    return request(`/lead/${params.leadId}/file`, {
        method: 'GET',
    });
}

export async function fullCreateLead(params) {
    let companyId = '';
    if (params.company !== undefined && params.company.length) {
        companyId = params.company[0].value;
    }
    const contact = [];
    if (params.contact !== undefined) {
        params.contact.forEach((element) => {
            contact.push({
                idContact: element.key,
            });
        });
    }
    const relation = [];
    if (params.relation !== undefined) {
        params.relation.forEach((element) => {
            relation.push({
                idContact: element.key,
            });
        });
    }
    const file = [];
    if (params.listFile !== undefined) {
        params.listFile.forEach((element) => {
            file.push(element.response.id);
        });
    }

    const tag = [];
    if (params.tag !== undefined) {
        params.tag.forEach((element) => {
            if (element.value === element.key) {
                tag.push({
                    tag: element.label,
                });
            } else {
                tag.push({
                    id: element.key,
                    tag: element.label,
                });
            }
        });
    }

    const review = '';
    const status = 'In-progress';
    let rank = '';
    if (params.rank) rank = params.rank.toString();

    const note = [];
    if (params.note !== undefined) {
        note.push({
            title: 'title',
            content: params.note,
        });
    }

    const rankRevision = [];
    if (params.reason !== undefined) {
        rankRevision.push({
            rank,
            touchPoint: 0,
            reason: params.reason,
        });
    }

    const body = {
        name: `${params.name}`,
        createdBy: 'string',
        updatedBy: 'string',
        idCompany: companyId,
        linkContact: contact,
        relatedTo: relation,
        rank,
        rankRevision,
        tag,
        file,
        description: `${params.description}`,
        review,
        status,
        note,
    };
    return request('/lead', {
        method: 'POST',
        data: body,
    });
}

export async function changeRank(params) {
    const body = {
        rank: params.rank,
        rankRevision: [{
            reason: params.reason,
            touchPoint: 0,
        },],
    };
    return request(`/lead/${params.id}/rank`, {
        method: 'PUT',
        data: body,
    });
}

export async function changeStatus(params) {
    const body = {
        status: params.status,
        review: params.review,
    };
    return request(`/lead/${params.id}/status`, {
        method: 'PUT',
        data: body,
    });
}
export async function updateLead(params) {
    const contact = [];
    if (params.contact !== undefined) {
        params.contact.forEach((element) => {
            contact.push({
                idContact: element.key,
            });
        });
    }

    const relation = [];
    if (params.relation !== undefined) {
        params.relation.forEach((element) => {
            relation.push({
                idContact: element.key,
            });
        });
    }

    const file = [];
    if (params.brief !== undefined) {
        params.brief.forEach((element) => {
            file.push(element.id);
        });
    }

    const tag = [];
    if (params.tag !== undefined) {
        params.tag.forEach((element) => {
            if (element.value === element.label) {
                tag.push({
                    tag: element.label,
                });
            } else {
                tag.push({
                    id: element.key,
                    tag: element.label,
                });
            }
        });
    }

    const rank = params.rank.rank ? params.rank.rank.toString() : params.rank.toString();

    const rankRevision = params.rank.rank ? [{
        rank,
        touchPoint: 0,
        reason: params.rank.reason,
    },] : [{
        rank: 0,
        touchPoint: 0,
        reason: 'Not update',
    },];

    const note = [];

    const body = {
        name: `${params.name}`,
        idCompany: params.company !== undefined ? params.company.key.toString() : '',
        linkContact: contact,
        relatedTo: relation,
        rankRevision,
        review: '',
        tag,
        rank,
        file,
        description: `${params.description}`,
        note,
        status: 'In-progress',
    };

    return request(`/lead/${params.id}`, {
        method: 'PUT',
        data: body,
    });
}
export async function getLead(params) {
    if (params.status === '') {
        if (params.searchValue !== '') {
            return request(`/lead?order=ASC&page=${params.page}&take=10&q=${params.searchValue}`, {
                method: 'GET',
            });
        }
        return request(`/lead?order=ASC&page=${params.page}&take=10`, {
            method: 'GET',
        });
    }
    if (params.searchValue !== '') {
        return request(
            `/lead?order=ASC&page=${params.page}&take=10&q=${params.searchValue}&status=${params.status}`,
            {
                method: 'GET',
            },
        );
    }
    return request(`/lead?order=ASC&page=${params.page}&take=10&status=${params.status}`, {
        method: 'GET',
    });
}
