const url = import.meta.env.VITE_API_URL as string;
const autoConfig = import.meta.env.VITE_API_AUTO;
const port = import.meta.env.VITE_API_PORT as string;
const uPort = `:${port}`;
const rawAuto = autoConfig === '1';
const noPortUrl = rawAuto ? window.origin.split(/:[0-9]/)[0] : url.split(/:[0-9]/)[0];
const wsUrlR = noPortUrl.split('://')[1];

export const apiUrl = rawAuto ? `${noPortUrl}${uPort}` : url;
export const wsUrl = `ws://${wsUrlR}:5001`;

export const version = 'v1.0.2';
