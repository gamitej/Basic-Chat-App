import React, { useMemo, useState } from "react";
import { Route, Routes } from "react-router-dom";
// Pages
import Login from "@/pages/Login/Login";
import ChatRoom from "@/pages/Chat";
import io from "socket.io-client";

function App() {
  const socket = useMemo(() => io.connect("http://localhost:3000"), []);

  /**
   * JSX
   */
  return (
    <div className="bg-slate-100 h-[100vh] w-full flex justify-center items-center">
      <Routes>
        <Route path="/" element={<Login socket={socket} />} />
        <Route path="/chat-room" element={<ChatRoom socket={socket} />} />
      </Routes>
    </div>
  );
}

export default App;
