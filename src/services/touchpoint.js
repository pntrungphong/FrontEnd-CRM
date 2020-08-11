import request from '../utils/request';

const User = {
  'chau.dh': '48862ade-6f9a-471f-835a-cff4f3b9a567',
  'tu.tt': '50b0cb2e-3782-4b11-82c0-4e2f6580ab94',
  'khoa.nd': '171ecb82-4daa-43dc-8fec-61878b42d506',
  'nhan.lh': '39d088f6-cc81-4263-ac27-b920983a4eb0',
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
    lane: params.lane,
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
  const body = {
    lane: params.lane,
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
