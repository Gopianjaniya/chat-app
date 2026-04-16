import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { addMessage } from "../redux/messageSlice";

const useGetRealTimeMessage = () => {
  const socket = useSelector((store) => store.socket?.socket);

  const dispatch = useDispatch();
  useEffect(() => {
    if (!socket) {
      return;
    }

    const handler = (newMessage) => {
      dispatch(addMessage(newMessage));
    };

    socket.on("newMessage", handler);

    return () => socket?.off("newMessage", handler);
  }, [socket, dispatch]);
};
export default useGetRealTimeMessage;
