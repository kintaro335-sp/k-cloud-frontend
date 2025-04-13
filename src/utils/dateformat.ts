/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import dayjs from 'dayjs';

export const formatDate = (date: string | Date) => {
  return dayjs(date).format('YYYY-MM-DD h:mm A');
};
