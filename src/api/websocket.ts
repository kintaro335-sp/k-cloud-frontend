import { Manager } from 'socket.io-client';
import { wsUrl } from '../config';

const manager = new Manager(wsUrl, { transports: ['websocket'] });

function createNewSocket(access_token: string) {
  const socket = manager.socket('/', { auth: { access_token } });
  return socket;
}

function createAuthSocket(access_token: string) {
  const socket = manager.socket('/', { auth: { access_token } });
  return socket;
}

export { createNewSocket, createAuthSocket };
