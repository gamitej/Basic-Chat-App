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

// SOCKET CONNECTION
io.on("connection", (socket) => {
  console.log("user connected " + socket.id);

  socket.on("joined-chat", (data) => {
    // join room
    socket.join(data.roomId);
    console.log(data);
    socket
      .to(data.roomId)
      .emit("joined-chat-message", `${data.name} joined the chat`);
  });

  socket.on("send-chat-message", (data) => {
    console.log(data);
    socket.to(data.roomId).emit("recieved-chat-message", data);
  });
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
