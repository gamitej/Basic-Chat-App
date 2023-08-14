const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const PORT = 3000;
// CONFIGURATION
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "https://localhost:5173",
  },
});

// SOCKET CONNECTION

io.on("connection", (socket) => {
  console.log("user connected" + socket.id);
});

server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
