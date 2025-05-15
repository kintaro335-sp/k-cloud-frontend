/*
 * k-cloud-frontend
 * Copyright(c) Kintaro Ponce
 * MIT Licensed
 */

import dayjs from 'dayjs';

export const fullDateFormat = (date: string | Date | number) => {
  return dayjs(date).format('YYYY-MM-DD h:mm A');
};

export const getFromToDateISO = (from?: Date, to?: Date) => {
  const fromISO = from ? from.toISOString() : '';
  const toISO = to ? to.toISOString() : '';
  const query = fromISO && toISO ? `from=${fromISO}&to=${toISO}&` : '';
  return query;
};

export const formatTime = (time: number) => {
  const hours = Math.floor(time / 3600);
  const minutes = Math.floor(time / 60) - hours * 60;
  const seconds = Math.floor(time % 60);
  return `${hours === 0 ? '' : hours.toString().padStart(2, '0') + ':'}${minutes.toString().padStart(2, '0')}:${seconds
    .toString()
    .padStart(2, '0')}`;
};
