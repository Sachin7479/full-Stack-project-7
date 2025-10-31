const express = require('express');
const http = require('http');
const { Server } = require('socket.io');

const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: '*' }
});

io.on('connection', socket => {
  socket.on('chat', data => {
    io.emit('chat', { name: data.name, message: data.message, time: new Date().toLocaleTimeString() });
  });
});

server.listen(5000);
