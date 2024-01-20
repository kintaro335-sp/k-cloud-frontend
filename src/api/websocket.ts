import { Manager } from 'socket.io-client';
import { wsUrl } from '../config';

const manager = new Manager(wsUrl, { transports: ['websocket'] });

function createNewSocket() {
  const socket = manager.socket('/');
  return socket;
}

function createAuthSocket() {
  const socket = manager.socket('/');
  return socket;
}

export { createNewSocket, createAuthSocket };
