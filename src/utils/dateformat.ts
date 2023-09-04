import moment from 'moment';

export function fullDateFormat(date: Date | string | number) {
  return moment(date).format('YYYY-MM-DD h:mm A');
}
