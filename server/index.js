const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3000;
// CONFIGURATION
const app = express();
app.use(cors());
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
  },
});

const userSessions = new Map();

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("user connected " + socket.id);

  socket.on("joined-chat", (data) => {
    socket.join(data.roomId);
    userSessions.set(socket.id, { name: data.name, roomId: data.roomId });
    console.log(data);
    socket
      .to(data.roomId)
      .emit("joined-chat-message", `${data.name} joined the chat`);
  });

  socket.on("send-chat-message", (data) => {
    const userSession = userSessions.get(socket.id);
    if (userSession) {
      console.log(data);
      socket.to(userSession.roomId).emit("recieved-chat-message", data);
    }
  });

  socket.on("disconnect", () => {
    userSessions.delete(socket.id);
    console.log("user disconnected " + socket.id);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
