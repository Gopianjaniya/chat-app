import SendInput from "./SendInput";
import Messages from "./Messages";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedUser } from "../redux/userSlice";

const MessageContainer = () => {
  const dispatch = useDispatch();

  const { selectedUser, authUser, onlineUsers } = useSelector(
    (store) => store.user,
  );

  const isOnline = onlineUsers?.includes(selectedUser?._id);

  return (
    <>
      {selectedUser !== null ? (
        <div className="flex flex-col sm:w-full w-[375px] h-full">
          {/* 🔝 Header */}
          <div className="flex gap-2 items-center bg-zinc-800 text-white px-4 py-2 mb-2   ">
            {/* 🔙 Back button (mobile only) */}
            <button
              onClick={() => dispatch(setSelectedUser(null))}
              className="md:hidden text-xl mr-2"
            >
              ←
            </button>

            {/* Avatar */}
            <div className={`avatar ${isOnline ? "online" : ""}`}>
              <div className="w-12 rounded-full">
                <img src={selectedUser?.profilePhoto} alt="user-profile" />
              </div>
            </div>

            {/* Name */}
            <div className="flex flex-col flex-1">
              <div className="flex justify-between gap-2">
                <p>{selectedUser?.fullName}</p>
              </div>
            </div>
          </div>

          {/* Messages */}
          <Messages />

          {/* Input */}
          <SendInput />
        </div>
      ) : (
        <div className="flex flex-col justify-center items-center h-full w-full">
          <h1 className="text-4xl text-white font-bold">
            Hi, {authUser?.fullName}
          </h1>
          <h1 className="text-2xl text-white">Let's start conversation</h1>
        </div>
      )}
    </>
  );
};

export default MessageContainer;
