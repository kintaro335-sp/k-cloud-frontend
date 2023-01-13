const url = import.meta.env.VITE_API_URL as string;
const autoConfig = import.meta.env.VITE_API_AUTO as boolean;
const port = import.meta.env.VITE_API_PORT as string;
const uPort = `:${port}`;

const noPortUrl = window.origin.split(/:[0-9]/)[0];

export const apiUrl = autoConfig ? `${noPortUrl}${uPort}` : url;
