import request from '../utils/request';

export async function createTouchpoint(params) {
  const body = {
    goal: `${params.touchpoint.goal}`,
    note: `${params.touchpoint.note}`,
    meetingdate: `${params.touchpoint.meetingdate}`,
  };

  return request('/touchpoint', {
    method: 'POST',
    data: body,
  });
}
