import React, { useEffect } from "react";
import Sidebar from "./Sidebar";
import MessageContainer from "./MessageContainer";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
  const { authUser, selectedUser } = useSelector((store) => store.user); // ✅ FIX

  const navigate = useNavigate();

  useEffect(() => {
    if (!authUser) {
      navigate("/login");
    }
  }, [authUser, navigate]);

  return (
    <div className="flex h-screen p-10 gap-3 bg-white/10 backdrop-blur-lg  w-auto">
      {/* Sidebar */}
      <div
        className={`${selectedUser ? "hidden" : "block"}  md:block md:w-[300px] w-[380px]`}
      >
        <Sidebar />
      </div>

      {/* Chat */}
      <div
        className={`${selectedUser ? "block" : "hidden"} sm:w-[600px] md:block flex-1  `}
      >
        <MessageContainer />
      </div>
    </div>
  );
};

export default HomePage;
