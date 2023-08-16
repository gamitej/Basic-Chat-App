const express = require("express");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const { setupSocketServer } = require("./sockets/socket");

// ENV
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

// socket connection
setupSocketServer(io);

// listing to port
server.listen(PORT, () => {
  console.log(`listening on port ${PORT}`);
});
