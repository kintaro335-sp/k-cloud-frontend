/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

import moment from 'moment';

export function fullDateFormat(date: Date | string | number) {
  return moment(date).format('YYYY-MM-DD h:mm A');
}
