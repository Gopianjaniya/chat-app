import { io } from "socket.io-client";

let socket = null;

export const connectSocket = (userId) => {
  if (!userId) return;

  socket = io(process.env.REACT_APP_BACKEND_URL, {
    withCredentials: true,
    query: { userId },
  });

  socket.on("connect", () => {
    console.log("connected:", socket.id);
  });
};

export const getSocket = () => socket;

export const disconnectSocket = () => {
  if (socket) {
    socket.disconnect();
    socket = null;
  }
};
