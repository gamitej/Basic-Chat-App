import React, { useState } from "react";
import io from "socket.io-client";
import Chat from "./Chat";

const socket = io.connect("http://localhost:3001");

function App() {
  const [form, setForm] = useState({ name: "", room: "" });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleJoinRoom = () => {
    if (form.name !== "" && form.room !== "") {
      socket.emit("join-room", form.room);
      console.log(`Joining room ${form.room}`);
    }
  };

  return (
    <div className="h-full w-full flex flex-col justify-center items-center">
      <div className="flex flex-col gap-y-4">
        <input
          type="text"
          name="name"
          placeholder="enter name.."
          value={form.name}
          className="border border-black p-2 rounded-lg"
          onChange={handleChange}
        />
        <input
          type="text"
          name="room"
          placeholder="enter room.."
          value={form.room}
          className="border border-black p-2 rounded-lg"
          onChange={handleChange}
        />
        <button
          className="border border-black py-1 bg-blue-600 text-white hover:bg-blue-400 rounded-md capitalize"
          onClick={handleJoinRoom}
        >
          Join the Room
        </button>
      </div>
      <br />
      <Chat socket={socket} name={form.name} room={form.room} />
    </div>
  );
}

export default App;
