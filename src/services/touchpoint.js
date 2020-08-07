import request from '../utils/request';

const User = {
  'chau.dh': '48862ade-6f9a-471f-835a-cff4f3b9a567',
  'tu.tt': '50b0cb2e-3782-4b11-82c0-4e2f6580ab94',
  'khoa.nd': '171ecb82-4daa-43dc-8fec-61878b42d506',
  'nhan.lh': '39d088f6-cc81-4263-ac27-b920983a4eb0',
};

const lane = {
  'Product Consulting': 'PC',
  'Lead Management': 'LM',
  'Proposal Handling': 'PH',
};

const taskFormat = (listTask) => {
  return listTask.map((element) => ({
    taskName: element.taskName,
    type: 'PIC',
    userId: User[element.pic],
    dueDate: element.dueDate !== '' ? element.dueDate.format('YYYY-MM-DD') : '',
  }));
};

export async function createTouchPoint(params) {
  const body = {
    lane: lane[params.lane],
    goal: params.goal,
    review: params.recap,
    status: 'Undone',
    task: params.task ? taskFormat(params.task) : [],
    meetingDate: params.meetingdate.format('YYYY-MM-DD HH:mm'),
    leadId: params.leadId,
  };

  return request(`/touchPoint`, {
    method: 'POST',
    data: body,
  });
}

export async function createTaskTouchpoint(params) {
  const body = {
    taskName: params.taskname,
    type: 'PIC',
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
  };

  return request(`/touchpoint/${params}/markDone`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateTouchPoint(params) {
  // const scope = params.scope
  //   ? params.scope.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'scope',
  //       order: file.order,
  //     };
  //   })
  //   : [];
  // const sla = params.sla
  //   ? params.sla.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'sla',
  //       order: file.order,
  //     };
  //   })
  //   : [];
  // const estimation = params.estimation
  //   ? params.estimation.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'estimation',
  //       order: file.order,
  //     };
  //   })
  //   : [];
  // const pricing = params.pricing
  //   ? params.pricing.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'pricing',
  //       order: file.order,
  //     };
  //   })
  //   : [];
  // const quotation = params.quotation
  //   ? params.quotation.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'quotation',
  //       order: file.order,
  //     };
  //   })
  //   : [];
  // const proposal = params.proposal
  //   ? params.proposal.map((file) => {
  //     return {
  //       fileId: file.id,
  //       note: file.note ? file.note : '',
  //       type: 'proposal',
  //       order: file.order,
  //     };
  //   })
  //   : [];

  // const file = scope
  //   .concat(sla)
  //   .concat(estimation)
  //   .concat(pricing)
  //   .concat(quotation)
  //   .concat(proposal)
  //   .filter((it) => it.order === params.order);

  const body = {
    lane: lane[params.lane],
    goal: params.goal ? params.goal : '',
    review: params.recap,
    task: params.task ? taskFormat(params.task) : [],
    meetingDate: params.meetingdate.format('YYYY-MM-DD HH:mm'),
  };

  return request(`/touchpoint/${params.touchPointId}`, {
    method: 'PUT',
    data: body,
  });
}

export async function updateTaskTouchpoint(params) {
  const body = {
    taskName: params.taskname,
    type: 'PIC',
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
