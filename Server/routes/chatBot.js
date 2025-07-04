const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");

app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:3000", // your frontend origin
    methods: ["GET", "POST"],
  },
});

// Room-wise user tracking: { roomName: [user1, user2, ...] }
const usersInRoom = {};

io.on("connection", (socket) => {
  console.log(`✅ User Connected: ${socket.id}`);

  // JOIN ROOM with username and room
  socket.on("join_room", ({ room, username }) => {
    socket.join(room);
    socket.username = username;
    socket.room = room;

    if (!usersInRoom[room]) {
      usersInRoom[room] = [];
    }

    if (!usersInRoom[room].includes(username)) {
      usersInRoom[room].push(username);
    }

    console.log(`👤 ${username} joined room: ${room}`);
    io.to(room).emit("update_users", usersInRoom[room]);
  });

  // Handle sending a message
  socket.on("send_message", (data) => {
    io.to(data.room).emit("receive_message", data);
  });
  socket.on("typing", ({ room, username }) => {
  socket.to(room).emit("user_typing", username);
});

socket.on("stop_typing", ({ room }) => {
  socket.to(room).emit("user_stop_typing");
});


  // Optional: Handle reactions (if used in frontend)
  socket.on("react_to_message", ({ messageId, emoji, author }) => {
    const room = socket.room;
    if (room) {
      io.to(room).emit("receive_reaction", { messageId, emoji, author });
    }
  });

  // Handle disconnect
  socket.on("disconnect", () => {
    const room = socket.room;
    const username = socket.username;

    if (room && usersInRoom[room]) {
      usersInRoom[room] = usersInRoom[room].filter((u) => u !== username);
      io.to(room).emit("update_users", usersInRoom[room]);

      // Optionally remove the room if empty
      if (usersInRoom[room].length === 0) {
        delete usersInRoom[room];
      }
    }

    console.log(`❌ User Disconnected: ${socket.id}`);
  });
});

server.listen(3001, () => {
  console.log("🚀 SERVER RUNNING on http://localhost:3001");
});
