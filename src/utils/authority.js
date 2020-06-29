import { reloadAuthorized } from './Authorized'; // use localStorage to store the authority info, which might be sent from server in actual project.

export function getAuthority(str) {
  const authorityString =
    typeof str === 'undefined' && localStorage ? localStorage.getItem('harmonia-authority') : str; // authorityString could be admin, "admin", ["admin"]

  let authority;

  try {
    if (authorityString) {
      authority = JSON.parse(authorityString);
    }
  } catch (e) {
    authority = authorityString;
  }

  if (typeof authority === 'string') {
    return [authority];
  }

  if (!authority && ANT_DESIGN_PRO_ONLY_DO_NOT_USE_IN_YOUR_PRODUCTION === 'site') {
    return ['admin'];
  }

  return authority;
}

export function setAuthority(authority) {
  const proAuthority = typeof authority === 'string' ? [authority] : authority;
  localStorage.setItem('harmonia-authority', JSON.stringify(proAuthority)); // auto reload

  reloadAuthorized();
}

export function getToken() {
  return localStorage.getItem('harmonia-token');
}

export function setToken(token) {
  localStorage.setItem('harmonia-token', token);
}

export function removeToken() {
  localStorage.removeItem('harmonia-token');
  localStorage.removeItem('harmonia-authority');
}

