import { io, Socket } from 'socket.io-client';

import { BASE_URL } from './api/endpoints';
///////////////////////////////////////////////////////

let socket: Socket | null = null;

export const getSocket = () => {
  if (!socket) socket = io(BASE_URL);

  return socket;
};

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
