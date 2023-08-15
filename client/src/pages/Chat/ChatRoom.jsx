import React, { useEffect, useMemo, useRef, useState } from "react";
import TelegramIcon from "@mui/icons-material/Telegram";

import EmojiEmotionsOutlinedIcon from "@mui/icons-material/EmojiEmotionsOutlined";
import ChatRightSide from "./ChatRightSide";
import ChatBody from "./ChatBody";
import { useLocation, useParams } from "react-router-dom";
import moment from "moment";

const ChatRoom = ({ socket }) => {
  let { search } = useLocation();
  const chatContainerRef = useRef(null);
  const [messageInput, setMessageInput] = useState("");
  const [messageList, setMessageList] = useState([]);

  // extracting name & roomid from url parameters
  const { you, roomId } = useMemo(() => {
    const res = search.replace("?", "").replace("&", "=").split("=");
    return { you: res[3], roomId: res[1] };
  }, [search]);

  // typing message event handler
  const handleChangeMessageInput = (e) => {
    const value = e.target.value;
    setMessageInput(value);
  };

  // sending message to chat room
  useEffect(() => {
    const handleReceivedMessage = (data) => {
      setMessageList((prevMessageList) => [...prevMessageList, data]);
    };

    const handleJoinedChatMessage = (data) => {
      console.log(data);
    };

    socket.on("recieved-chat-message", handleReceivedMessage);
    socket.on("joined-chat-message", handleJoinedChatMessage);

    return () => {
      // Clean up the event listeners when the component unmounts
      socket.off("recieved-chat-message", handleReceivedMessage);
      socket.off("joined-chat-message", handleJoinedChatMessage);
    };
  }, [socket]);

  useEffect(() => {
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop =
        chatContainerRef.current.scrollHeight;
    }
  }, [messageList]);

  const handleSendMessage = async () => {
    const msgData = {
      senderName: you,
      time: moment().format("hh:mm a"),
      message: messageInput,
      roomId,
    };

    if (messageInput.trim() !== "") {
      await socket.emit("send-chat-message", msgData);
      setMessageList((prevMessageList) => [...prevMessageList, msgData]);
      setMessageInput("");
    }
  };

  /**
   * JSX
   */

  return (
    <div className="border w-[50rem] h-[35rem] rounded-sm shadow-md">
      {/* header*/}
      <div className="bg-blue-400 h-[12%] flex justify-between items-center px-3 rounded-tr-md rounded-tl-md">
        <h3 className="text-white text-2xl font-semibold text-center">
          <EmojiEmotionsOutlinedIcon style={{ fontSize: "2rem" }} /> Chat Room
        </h3>
        <button className="border-[.15rem] text-blue-600 bg-blue-200 px-3 py-1 rounded-md shadow-md hover:shadow-sm border-blue-400  focus:border-blue-500">
          Leave Room
        </button>
      </div>
      {/* body */}
      <div className="h-[76%] flex">
        <div className="w-[30%] bg-blue-300 h-full px-3 py-2">
          <ChatRightSide room={roomId} username={you} />
        </div>
        <div className="w-[70%]">
          <ChatBody
            room={roomId}
            username={you}
            ref={chatContainerRef}
            messageList={messageList}
          />
        </div>
      </div>
      {/* footer */}
      <div className="h-[12.5%] w-full py-2 px-3 bg-blue-400 flex justify-center items-center rounded-br-md rounded-bl-md">
        <input
          autoComplete="off"
          type="text"
          name="message"
          value={messageInput}
          placeholder="Enter message..."
          onChange={handleChangeMessageInput}
          className="border rounded-tl-md rounded-bl-md w-[75%] px-2 py-1"
        />
        <button
          className="border-[.15rem] focus:border-blue-500 border-blue-400 w-[20%] bg-blue-200 py-1 text-blue-600 rounded-br-md rounded-tr-md"
          onClick={handleSendMessage}
        >
          <TelegramIcon /> Send
        </button>
      </div>
    </div>
  );
};

export default ChatRoom;
