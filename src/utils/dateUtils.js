import moment from 'moment';

export const formatDate = 'DD MMM YYYY';

export const formatLongDate = (input) => moment(input).format(formatDate);
