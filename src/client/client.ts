import io from 'socket.io-client';
import PlayerData from '../lib/playerJSON';
import Bullet from '../lib/bullet';

const socket = io('http://localhost:4000');
const canvas = document.querySelector('canvas'),
  ctx = canvas.getContext('2d');

socket.emit('joining');

function handleMouseMove(e: MouseEvent) {
  socket.emit('mousemove', e.x, e.y);
}

function handleClick() {
  socket.emit('shoot');
}

//display waiting for players
socket.on('waiting', () => {
  ctx.fillStyle = '#000';
  ctx.font = '30px Arial';
  ctx.fillText('Searching for opponent...', canvas.width / 2 - 150, canvas.height / 2);
});

socket.on('startGame', () => {
  let keys = {
    'ArrowRight': false,
    'ArrowUp': false,
    'ArrowDown': false,
    'ArrowLeft': false
  };

  window.addEventListener('mousemove', handleMouseMove);
  window.addEventListener('mousedown', handleClick);

  onkeydown = onkeyup = function (e: KeyboardEvent) {
    keys[e.key] = e.type == "keydown";

    var { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } = keys;
    var newKeys = { ArrowRight: ArrowRight, ArrowLeft: ArrowLeft, ArrowDown: ArrowDown, ArrowUp: ArrowUp };

    if (newKeys != keys) {
      keys = newKeys;
      socket.emit('keychange', keys);
    };
  }

  socket.on('game-end', whoLost => {
    whoLost === socket.id ? alert('You lose.') : alert('You win!');
    location.href = '/';
  });

  socket.on('frame', (frameData: PlayerData[], bullets: Bullet[]) => {
    ctx.clearRect(0 ,0, canvas.width, canvas.height);

    for(let data of frameData) {
      // Render the player
      ctx.fillStyle = "black";
      ctx.save();
      ctx.translate(data.x, data.y);
      ctx.rotate(data.angle);
      ctx.fillRect(-6, -6, 12, 12);
      ctx.restore();

      // Render the bullets
      for(let bullet of bullets) {
        ctx.save();
        ctx.translate(bullet.pos.x, bullet.pos.y);
        ctx.rotate(bullet.angle);
        ctx.fillRect(-3, -3, 6, 6);
        ctx.restore();
      }
    }
  });
});