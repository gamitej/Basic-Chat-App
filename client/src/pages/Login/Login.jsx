import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

const Login = ({ socket }) => {
  const navigate = useNavigate();
  const [userInfo, setUserInfo] = useState({ name: "", roomId: "" });

  // ========= EVENTS-HANDLERS ==============
  const handleChangeInput = (e) => {
    const { name, value } = e.target;
    setUserInfo((prev) => ({ ...prev, [name]: value }));
  };

  // ============ SOCKET-IO =================

  const handleJoinChat = async (e) => {
    e.preventDefault();
    if (userInfo.name !== "" && userInfo.roomId !== "") {
      await socket.emit("joined-chat", userInfo);
      navigate(`/room/${userInfo.roomId}`);
    }
  };

  /**
   * JSX
   */

  return (
    <div className="border bg-white rounded-md h-[25rem] w-[25rem] flex flex-col items-center shadow-md">
      {/* login-header */}
      <div className="bg-blue-400 w-full rounded-tr-md rounded-tl-md">
        <h3 className="text-white h-[3rem] flex justify-center items-center text-xl font-semibold">
          Chat App
        </h3>
      </div>
      {/* login-form */}
      <form
        onSubmit={handleJoinChat}
        className="flex flex-col justify-evenly items-center w-full h-full"
      >
        <div className="flex flex-col gap-1 w-[80%]">
          <label className="text-slate-500 font-semibold  text-lg px-1">
            Name
          </label>
          <input
            type="text"
            name="name"
            value={userInfo.name}
            className="border py-3 shadow-sm rounded-lg bg-white px-2"
            placeholder="Enter your name ..."
            onChange={handleChangeInput}
            required
          />
        </div>
        <div className="flex flex-col gap-1 w-[80%]">
          <label className="text-slate-500 font-semibold text-lg px-1">
            Room Id
          </label>
          <input
            type="text"
            name="roomId"
            value={userInfo.roomId}
            className="border py-3 rounded-lg shadow-sm bg-white px-2"
            placeholder="Enter room id ..."
            onChange={handleChangeInput}
            required
          />
        </div>
        <button
          type="submit"
          className=" bg-blue-400 border text-white px-5 py-2 rounded-md text-lg"
        >
          Join Chat
        </button>
      </form>
      <div className="h-[4rem] bg-blue-400 w-full rounded-bl-md rounded-br-md"></div>
    </div>
  );
};

export default Login;
