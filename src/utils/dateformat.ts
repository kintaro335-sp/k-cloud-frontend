/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import dayjs from 'dayjs';

export const fullDateFormat = (date: string | Date | number) => {
  return dayjs(date).format('YYYY-MM-DD h:mm A');
};
