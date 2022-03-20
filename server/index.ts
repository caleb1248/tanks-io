import { Server } from 'socket.io';
import { Player } from './lib/player.js';

let users: Player[] = [];

const io = new Server(3000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('connection');
  socket.on('joining', () => {
    const player = new Player();
    users.push(player);

    socket.on('mousemove', player.handleMouseMove.bind(player));
    socket.on('shoot', player.shoot.bind(player));
    socket.on('keychange', player.handleKeyEvent.bind(player));
    socket.on('disconnect', () => {
      users.splice(users.indexOf(player), 1);
    })
  });
});

setInterval(() => {
  const sendData = [];

  for(var user of users){
    user.update();
    sendData.push(user.getJSON());
  }

  io.emit('frame', sendData);
}, 1000/60)