import { httpServer, socketServer  } from "./server";


//** Socket Services **//
socketServer.on('connection', (socket) => {
  console.log(`A user connected`);

  //* Join a room *//
  socket.on('joinRoom', (room) => {
    console.log(`${socket.id} just joined room ${room}`);
    socket.join(room);
    socketServer.to(room).emit('roomJoined ', `${socket.id} just joined the room`)
  })

  //* Leave a room *//
  socket.on('leaveRoom', (room) => {
    console.log(`${socket.id} has left room ${room}`);
    socket.leave(room);
    socketServer.to(room).emit('roomLeft', `${socket.id} has left the room`);
  })

  //* Post a message to specific room *//
  socket.on('messageToRoom', (data) => {
    console.log(`${socket.id} posted a message to room ${data.room}: ${data.text}`)

    const message = {
      id: socket.id,
      text: data.text
    }
    socketServer.to(data.room).emit('message', message);
  });

  //* Send a message to all connected clients *//
  socket.on('messageToAll', (data) => {
    console.log(`${socket.id} sent a message to all clients:${data.text}`);
    const message = {
      id: socket.id,
      text: data.text
    }
    socketServer.emit('message', message);
  })

  //* Disconnect event *//
  socket.on('disconnect', () => {
    console.log(`${socket.id} disconnected`);
  });
})


httpServer.listen(3000, () => {
  console.log(`Server listening on port 3000`)
})