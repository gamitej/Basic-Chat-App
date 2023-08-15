import React, { forwardRef, useState } from "react";

const ChatBody = forwardRef(({ messageList, room, username }, ref) => {
  /**
   * JSX
   */
  return (
    <div className="flex m-auto w-[95%] h-full border shadow-sm">
      <div
        className="flex flex-col gap-y-2 p-2 w-full overflow-y-auto"
        id="scrollBar"
        ref={ref}
      >
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
});

function MessageBox({ time, message, senderName, username }) {
  return (
    <>
      {/* Your Message */}
      {senderName === username && (
        <div className="w-full flex justify-end">
          <div className="bg-blue-400 text-white px-2 py-1 rounded-md max-w-[95%]">
            <p>
              <span className="text-[11px] block capitalize">{senderName}</span>
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
              <span className="text-[11px] block capitalize">{senderName}</span>
              {message}
              <span className="text-[10px] block">{time}</span>
            </p>
          </div>
        </div>
      )}
    </>
  );
}

export default ChatBody;
