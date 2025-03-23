/*
 * k-cloud-frontend
 * Copyright(c) 2022 Kintaro Ponce
 * MIT Licensed
 */

const url = import.meta.env.VITE_API_URL as string;
const url_ws = import.meta.env.VITE_API_URL_WS as string;
const api_prefix = (import.meta.env.VITE_API_PREFIX as string) || '';
const ws_prefix = (import.meta.env.VITE_API_WS_PREFIX as string) || '';
const autoConfig = import.meta.env.VITE_API_AUTO;
const port = (import.meta.env.VITE_API_PORT as string) || '';
const port_ws = (import.meta.env.VITE_API_WS_PORT as string) || '';
const rawAuto = autoConfig === '1'; // 0 = false, 1 = true

const cPort = port ? `:${port}` : '';
const cPortWS = port_ws ? `:${port_ws}` : '';

const urlOrigin = cPort === '' ? window.origin : window.origin.split(/:[0-9]/)[0];
const urlWSOrigin = cPortWS === '' ? window.origin : window.origin.split(/:[0-9]/)[0];

const noPortUrl = rawAuto ? urlOrigin : url;
const noPortwsUrlR = rawAuto ? urlWSOrigin : url_ws;

export const apiUrl = rawAuto ? `${noPortUrl}${cPort}${api_prefix}` : url;
export const wsUrl = rawAuto ? `${noPortwsUrlR}${cPortWS}${ws_prefix}` : url_ws;

export const version = 'v1.3.0';
