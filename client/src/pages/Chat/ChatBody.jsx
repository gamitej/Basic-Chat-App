import React, { useState } from "react";

const ChatBody = ({ room, username }) => {
  const [messageList, setMessageList] = useState([
    { senderName: "amitej", time: "1:05pm", message: "hi rohan" },
    { senderName: "rohan", time: "1:!5pm", message: "hi amitej" },
    { senderName: "amitej", time: "2:!5pm", message: "kaise ho" },
  ]);

  /**
   * JSX
   */
  return (
    <div className="flex m-auto w-[95%] h-full border shadow-sm">
      <div className="flex flex-col gap-y-2 p-2 w-full">
        {messageList.map(({ senderName, time, message }, idx) => (
          <MessageBox
            senderName={senderName}
            time={time}
            message={message}
            key={idx}
            username={username}
          />
        ))}
      </div>
    </div>
  );
};

function MessageBox({ time, message, senderName, username }) {
  return (
    <>
      {/* Your Message */}
      {senderName === username && (
        <div className="w-full flex justify-end">
          <div className="bg-blue-400 text-white px-2 py-1 rounded-md max-w-[95%]">
            <p>
              {message}
              <span className="text-[11px] block">{time}</span>
            </p>
          </div>
        </div>
      )}
      {/* Other Message */}
      {senderName !== username && (
        <div className="w-full flex justify-start">
          <div className="bg-slate-400 text-white px-2 py-1 rounded-md max-w-[95%]">
            <p>
              {message}
              <span className="text-[11px] block">{time}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBody;
