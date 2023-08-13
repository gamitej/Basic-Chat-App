const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());

const server = http.createServer(app);

// socket io server
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Make sure this matches your client origin
    methods: ["GET", "POST"],
  },
});

//  socket io connection
io.on("connection", (socket) => {
  console.log(`User connected to ${socket.id}`);

  // send message to specidfied room
  socket.on("send-message", (data) => {
    console.log(data);
    socket.to(data.room).emit("receive-message", data);
  });

  // join room
  socket.on("join-room", (room) => {
    socket.join(room);
    console.log(`User with id: ${socket.id} joined room ${room}`);
  });

  // disconnected
  socket.on("disconnect", () => {
    console.log(`User disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
