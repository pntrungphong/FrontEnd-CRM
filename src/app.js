import { setLocale } from 'umi';
import moment from 'moment';

moment.locale('en-US');
setLocale('en-US');

export function onRouteChange() {
  if (window.swUpdate) {
    // Refresh when then there is new update
    window.location.reload(true);
  }
}
