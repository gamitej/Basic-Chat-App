import React, { useEffect, useMemo, useState } from "react";

const Chat = ({ socket, name = "amitej", room }) => {
  const [currentMsg, setCurrentMsg] = useState("");
  const [messageList, setMessageList] = useState([
    { message: "hi sam", author: "amitej" },
    { message: "hi amitej", author: "sam" },
  ]);

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
      setMessageList([...messageList, data]);
    });
  }, [socket]);

  return (
    <div className="w-[300px] h-[420px] border flex flex-col justify-between ">
      {/*chat header */}
      <div className="h-[40px] bg-slate-600">
        <h3 className="text-[1.3rem] text-center text-white py-1">Live Chat</h3>
      </div>
      {/*chat body */}
      <div className="relative h-[calc(450px-(115px))] bg-slate-100 overflow-y-scroll overflow-x-hidden flex flex-col">
        {messageList?.map(({ message, time, author }, idx) => (
          <div className="flex flex-col">
            {author === "amitej" && (
              <div className="flex justify-end w-auto mt-1">
                <p className="bg-blue-500 px-2 rounded-md text-white max-w-[120px] w-auto minx-h-[40px] h-auto">
                  {message}
                </p>
              </div>
            )}
            {author !== "amitej" && (
              <div className="flex justify-start w-auto mt-1">
                <p className="bg-slate-500 px-2 rounded-md text-white max-w-[120px] w-auto minx-h-[40px] h-auto">
                  {message}
                </p>
              </div>
            )}
          </div>
        ))}
      </div>
      {/*chat footer */}
      <div className="flex ">
        <input
          type="text"
          className="border border-black text-[16px] px-2 w-[250px] h-[40px]"
          placeholder="Hey..."
          name={currentMsg}
          onChange={(e) => setCurrentMsg(e.target.value)}
        />
        <button
          className="border border-black w-[50px] bg-blue-600 text-white"
          onClick={sendMessage}
        >
          &#9658;
        </button>
      </div>
    </div>
  );
};

export default Chat;
