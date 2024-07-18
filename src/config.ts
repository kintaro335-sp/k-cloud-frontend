const url = import.meta.env.VITE_API_URL as string;
const url_ws = import.meta.env.VITE_API_URL_WS as string;
const api_prefix = import.meta.env.VITE_API_PREFIX as string || '';
const ws_prefix = import.meta.env.VITE_API_WS_PREFIX as string || '';
const autoConfig = import.meta.env.VITE_API_AUTO;
const port = import.meta.env.VITE_API_PORT as string || '';
const port_ws = import.meta.env.VITE_API_PORT_WS as string || '';
const rawAuto = autoConfig === '1'; // 0 = false, 1 = true

const cPort = port ? `:${port}`: '';
const cPortWS = port_ws ? `:${port_ws}` : '';

const noPortUrl = rawAuto ? window.origin.split(/:[0-9]/)[0] : url;
const noPortwsUrlR =  rawAuto ? window.origin.split(/:[0-9]/)[0] : url_ws;

export const apiUrl = rawAuto ? `${noPortUrl}${cPort}${api_prefix}` : url;
export const wsUrl = rawAuto ? `${noPortwsUrlR}${cPortWS}${ws_prefix}` : url_ws;

export const version = 'v1.0.3';
