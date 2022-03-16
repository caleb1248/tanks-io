import express from 'express';
import { Server } from 'socket.io';
import { Player } from './lib/player.js';
const app = express();
const server = app.listen(3000, () => console.log('Go to http://localhost:3000'));

/**
 * @type {Player[]}
 */
let users = [];

const io = new Server(server);

app.use(express.static('client'));

io.on('connection', socket => {
  console.log('connection');
  socket.on('joining', () => {
    const player = new Player();
    users.push(player);

    socket.on('mousemove', player.handleMouseMove.bind(player));
    socket.on('shoot', player.shoot.bind(player));
    socket.on('keychange', player.handleKeyEvent.bind(player));
    socket.on('disconnect', () => {

    })
  });
});

setInterval(() => {
  var sendData = [];

  for(var user of users){
    user.update();
    sendData.push(user.position);
  }

  io.emit('frame', sendData);
}, 1000/60)