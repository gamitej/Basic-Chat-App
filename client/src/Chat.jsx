import React, { useEffect, useMemo, useState } from "react";

const Chat = ({ socket, name, room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [newMsg, setNewMsg] = useState("");

  const sendMessage = async (e) => {
    if (currentMsg !== "") {
      const messageData = {
        room: room,
        author: name,
        message: currentMsg,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };
      await socket.emit("send-message", messageData);
      setCurrentMsg("");
    }
  };

  useEffect(() => {
    socket.on("receive-message", (data) => {
      console.log(data);
      setNewMsg(data.message);
    });
  }, [socket]);

  return (
    <div>
      {/*chat header */}
      <div>Live Chat</div>
      {/*chat body */}
      <div>{newMsg}</div>
      {/*chat footer */}
      <div className="flex gap-x-2">
        <input
          type="text"
          className="border border-black px-2"
          placeholder="Hey..."
          name={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button
          className="border border-black px-2 bg-blue-600 text-white"
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
