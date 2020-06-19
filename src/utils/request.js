/**
 * request
 * Ref: https://github.com/umijs/umi-request
 */
import { extend } from 'umi-request';
import { notification } from 'antd';
import api from '../../config/api';
import { getToken } from './authority';

const { REACT_APP_ENV } = process.env;

/**
 * Error handling
 */

const errorHandler = (error) => {
  const { response } = error;

  if (response && response.status) {
    const errorText = response.statusText;
    const { status, url } = response;
    notification.error({
      message: `Error ${status}: ${url}`,
      description: errorText,
    });
  } else if (!response) {
    notification.error({
      description: 'Your network is abnormal and cannot connect to the server',
      message: 'Network is down',
    });
  }

  return response;
};

/**
 * request
 */
const token = getToken();
const request = extend({
  prefix: api[REACT_APP_ENV || 'dev'].baseUrl,
  errorHandler,
  headers: {
    'Content-Type': 'application/json',
    Authorization: `Bearer ${token}`,
  },
  credentials: 'include', // Default send cookie
});
export default request;
