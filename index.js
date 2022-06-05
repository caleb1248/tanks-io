const  { Room } = require('./lib/room'),
  { Server } = require('socket.io'),
  { Player } = require('./lib/player'),
  express = require('express'),
  app = express(),
  server = app.listen(process.env.PORT || 3000, () => {
    console.log('listening on http://localhost:3000');
  }),

  rooms = [],

  io = new Server(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST']
    }
  });

app.use(express.static('.'));

io.on('connection', socket => {
  socket.on('joining', () => {
    // initalize player
    const player = new Player(socket);

    // add player to room
    var room = rooms.find(room => !room.isFull());
    if (typeof room === 'undefined') {
      room = new Room();
      room.players.push(player);
      rooms.push(room);
      socket.emit('waiting');
    } else {
      room.players.push(player);
      room.startGame();
    }

    socket.on('mousemove', player.handleMouseMove.bind(player));
    socket.on('shoot', () => player.shoot(room.bullets));
    socket.on('keychange', player.handleKeyEvent.bind(player));
  });
});
