import { useEffect } from "react";
import { useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";
import { getSocket } from "../socket";

const useGetRealTimeMessage = () => {
  const dispatch = useDispatch();

  useEffect(() => {
    let socket;

    const tryConnect = () => {
      socket = getSocket();

      if (!socket) {
        setTimeout(tryConnect, 300); // retry
        return;
      }


      const handler = (newMessage) => {
        dispatch(addMessage(newMessage));
      };

      socket.on("newMessage", handler);
    };

    tryConnect();

    return () => {
      if (socket) {
        socket.off("newMessage");
      }
    };
  }, [dispatch]);
};

export default useGetRealTimeMessage;
