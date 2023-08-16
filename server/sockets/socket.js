// const jwt = require('jsonwebtoken');
// const SECRET_KEY = 'your-secret-key';
// const users = require('./users'); // Simulated user database

const userSessionsBySocketId = new Map();
const roomSessions = new Map();
const userSession = new Map();

function setupSocketServer(io) {
  // io.use((socket, next) => {
  //   const token = socket.handshake.query.token;

  //   if (!token) {
  //     return next(new Error('Authentication token missing'));
  //   }

  //   jwt.verify(token, SECRET_KEY, (err, decoded) => {
  //     if (err) {
  //       return next(new Error('Authentication error'));
  //     }

  //     const user = users.find(u => u.id === decoded.userId);

  //     if (!user) {
  //       return next(new Error('User not found'));
  //     }

  //     socket.user = user;
  //     next();
  //   });
  // });

  // SOCKET CONNECTION
  io.on("connection", (socket) => {
    console.log("user connected " + socket.id);

    socket.on("joined-chat", (data) => {
      socket.join(data.roomId);
      roomSessions.set(data.roomId);
      // Check if the key "id" exists in the map
      if (!roomSessions.has(data.roomId)) {
        let idArr = roomSessions.get(data.roomId);
        idArr.push({ name: data.name, socketId: socket.id });
        roomSessions.set(data.roomId, idArr);
      } else {
        roomSessions.set(data.roomId, [
          { name: data.name, socketId: socket.id },
        ]);
      }
      userSession.set(data.name, { roomId: data.roomId, socketId: socket.id });
      userSessionsBySocketId.set(socket.id, {
        name: data.name,
        roomId: data.roomId,
      });
      console.log(data);
      socket
        .to(data.roomId)
        .emit("userIsOnline", `${data.name} joined the chat`);
    });

    socket.on("send-chat-message", (data) => {
      const userSession = userSessionsBySocketId.get(socket.id);
      if (userSession) {
        console.log(data);
        socket.to(userSession.roomId).emit("recieved-chat-message", data);
      }
    });

    socket.on("disconnect", () => {
      console.log("user disconnected " + socket.id);
      socket.emit("");
      userSessionsBySocketId.delete(socket.id);
      // if (!roomSessions.has(data.roomId))
    });
  });
}

module.exports = { setupSocketServer };
