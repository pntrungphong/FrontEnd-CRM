import request from '../utils/request';

export async function createTouchpoint(params) {
  console.table(params);
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
