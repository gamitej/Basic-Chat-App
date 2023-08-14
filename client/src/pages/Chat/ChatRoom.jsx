import React, { useEffect } from "react";

const ChatRoom = ({ socket }) => {
  useEffect(() => {
    socket.on("joined-chat-message", (data) => {
      console.log(data);
    });

    return () => {
      socket.off("joined-chat-message", (data) => {
        console.log(data);
      });
    };
  }, [socket]);

  return <div>ChatRoom</div>;
};

export default ChatRoom;
