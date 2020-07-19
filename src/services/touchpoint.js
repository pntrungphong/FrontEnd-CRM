import request from '../utils/request';

export async function createTouchpoint(params) {
  const body = {
    status: 'In-progress',
    leadId: params,
  };

  return request(`/touchpoint`, {
    method: 'POST',
    data: body,
  });
}

export async function createTaskTouchpoint(params) {
  const body = {
    taskname: params.taskname,
    type: params.type,
    userId: params.pic,
    dueDate: params.duedate,
  };

  return request(`/touchpoint/${params.touchpointId}/task`, {
    method: 'POST',
    data: body,
  });
}

export async function getTask(params) {
  return request(`/touchpoint/${params}`, {
    method: 'GET',
  });
}

export async function updateTouchpoint(params) {
  const scope = params.scope
    ? params.scope.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'scope',
        };
      })
    : [];
  const sla = params.sla
    ? params.sla.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'sla',
        };
      })
    : [];
  const estimation = params.estimation
    ? params.estimation.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'estimation',
        };
      })
    : [];
  const pricing = params.pricing
    ? params.pricing.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'pricing',
        };
      })
    : [];
  const quotation = params.quotation
    ? params.quotation.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'quotation',
        };
      })
    : [];

  const file = scope.concat(sla).concat(estimation).concat(pricing).concat(quotation);
  const body = {
    leadId: params.leadId ? params.leadId : '',
    goal: params.goal,
    note: params.leadId ? params.note : '',
    review: params.review,
    meetingDate: params.meetingdate.format('YYYY-MM-DD HH:mm'),
    file,
  };

  return request(`/touchpoint/${params.touchpointId}`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateTaskTouchpoint(params) {
  const body = {
    taskname: params.taskname,
    type: params.type,
    userId: params.userId,
    dueDate: params.duedate,
  };

  return request(`/touchpoint/${params.touchpointId}/task/${params.id}`, {
    method: 'PUT',
    data: body,
  });
}

export async function getTouchpoint(params) {
  return request(`/touchpoint/${params.id}`, {
    method: 'GET',
  });
}
