// src/socket.js
import { io } from 'socket.io-client';
import server from '../api/axiosInstance';

let socket = null;

export const connectSocket = (userId) => {
  socket = io(`${server}`, {
    query: { userId },
    transports: ['websocket'],
  });
  return socket;
};

export const getSocket = () => socket;

export const closeSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
