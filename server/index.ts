import Room from './lib/room.js';
import { Server, Socket } from 'socket.io';
import { Player } from './lib/player.js';

const rooms: Room[] = [];

const io = new Server(4000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', (socket: Socket) => {
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
    // @ts-ignore
    socket.on('shoot', () => player.shoot(room.bullets));
    socket.on('keychange', player.handleKeyEvent.bind(player));
    socket.on('disconnect', () => {
      console.log('disconnect');
    });
  });
});
