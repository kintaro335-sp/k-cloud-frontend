const url = import.meta.env.VITE_API_URL as string;
const autoConfig = import.meta.env.VITE_API_AUTO;
const port = import.meta.env.VITE_API_PORT as string;
const uPort = `:${port}`;

const noPortUrl = window.origin.split(/:[0-9]/)[0];
const wsUrlR = noPortUrl.split('://')[1]

const rawAuto = autoConfig === '1';
console.log(rawAuto)
export const apiUrl = rawAuto ? `${noPortUrl}${uPort}` : url;
export const wsUrl = `ws://${wsUrlR}:5001`
