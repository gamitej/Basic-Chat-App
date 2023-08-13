const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");

const app = express();
app.use(express.json());
app.use(cors());
const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3001",
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log(`User connected to ${socket.id}`);

  socket.on("disconnect", () => {
    console.log("User diconnected", socket.id);
  });
});

app.listen(3001, () => {
  console.log("running");
});
