import React from "react";
import ForumOutlinedIcon from "@mui/icons-material/ForumOutlined";
import GroupsOutlinedIcon from "@mui/icons-material/GroupsOutlined";

const ChatRightSide = ({ room }) => {
  return (
    <div className="flex flex-col gap-y-3">
      <p className="text-white text-xl" style={{ fontWeight: "500" }}>
        <ForumOutlinedIcon /> Room Id :
      </p>
      <p
        className="bg-blue-400 px-3 py-2 text-white"
        style={{ fontWeight: "500" }}
      >
        {room}
      </p>
      <p className="text-white text-xl mt-2" style={{ fontWeight: "500" }}>
        <GroupsOutlinedIcon /> Users
      </p>
      <p className="text-white text-lg ml-5" style={{ fontWeight: "500" }}>
        Amitej
      </p>
    </div>
  );
};

export default ChatRightSide;
