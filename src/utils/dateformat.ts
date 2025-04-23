/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import dayjs from 'dayjs';

export const fullDateFormat = (date: string | Date | number) => {
  return dayjs(date).format('YYYY-MM-DD h:mm A');
};

export const getFromToDateISO = (from?:Date, to?: Date) => {
  const fromISO = from ? from.toISOString() : '';
  const toISO = to ? to.toISOString() : '';
  const query = fromISO && toISO ? `from=${fromISO}&to=${toISO}&` : '';
  return query;
}
