import { Server } from 'socket.io';
import { Player } from './lib/player.js';
import  PlayerData from '../lib/playerJSON.js'
import { Bullet } from './lib/bullet.js';
import BulletData from '../lib/bullet.js';
//@ts-ignore
const bullets: Bullet[] = []; 

let users: Player[] = [];

const io = new Server(4000, {
  cors: {
    origin: '*',
    methods: ['GET', 'POST']
  }
});

io.on('connection', socket => {
  console.log('connection');
  socket.on('joining', () => {
    const player = new Player(socket);
    users.push(player);

    socket.on('mousemove', player.handleMouseMove.bind(player));
    socket.on('shoot', () => {
      player.shoot(bullets);
      console.log(bullets.length);
    });
    socket.on('keychange', player.handleKeyEvent.bind(player));
    socket.on('disconnect', () => {
      users.splice(users.indexOf(player), 1);
    })
  });
});

setInterval(() => {
  const sendData: PlayerData[] = [];
  const bulletss: BulletData[] = []
  bullets.forEach(bullet => {
    bullet.update();
    bulletss.push(bullet.toJSON());
  });

  users.forEach(user => {
    user.update();
    user.detectCollision(bullets);
    sendData.push(user.getJSON());
  })

  io.emit('frame', sendData, bulletss);
}, 1000/60)