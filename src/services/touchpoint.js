import request from '../utils/request';

export async function createTouchPoint(params) {
  const body = {
    status: 'In-progress',
    leadId: params,
  };

  return request(`/touchPoint`, {
    method: 'POST',
    data: body,
  });
}

export async function createTaskTouchpoint(params) {
  const body = {
    taskName: params.taskname,
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

export async function markDoneTouchpoint(params) {
  const body = {
    status: 'Done',
    review: params.review,
    actualDate: params.actualDate,
  };

  return request(`/touchpoint/${params.touchPointId}/markDone`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateTouchpoint(params) {
  const scope = params.scope
    ? params.scope.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'scope',
          order: file.order,
        };
      })
    : [];
  const sla = params.sla
    ? params.sla.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'sla',
          order: file.order,
        };
      })
    : [];
  const estimation = params.estimation
    ? params.estimation.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'estimation',
          order: file.order,
        };
      })
    : [];
  const pricing = params.pricing
    ? params.pricing.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'pricing',
          order: file.order,
        };
      })
    : [];
  const quotation = params.quotation
    ? params.quotation.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'quotation',
          order: file.order,
        };
      })
    : [];
  const proposal = params.proposal
    ? params.proposal.map((file) => {
        return {
          fileId: file.id,
          note: file.note ? file.note : '',
          type: 'proposal',
          order: file.order,
        };
      })
    : [];

  const file = scope
    .concat(sla)
    .concat(estimation)
    .concat(pricing)
    .concat(quotation)
    .concat(proposal)
    .filter((it) => it.order === params.order);
  const body = {
    leadId: params.leadId ? params.leadId : '',
    goal: params.goal,
    note: params.leadId ? params.note : '',
    review: params.review,
    meetingDate: params.meetingdate.format('YYYY-MM-DD'),
    file,
  };

  return request(`/touchpoint/${params.touchpointId}`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateTaskTouchpoint(params) {
  const body = {
    taskName: params.taskname,
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
