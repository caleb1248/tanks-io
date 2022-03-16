const canvas = document.querySelector('canvas');
canvas.width = window.innerWidth;
canvas.height = window.innerHeight;
const ctx = canvas.getContext('2d');

const socket = io();
socket.emit('joining');

let keys = {
  'ArrowRight': false,
  'ArrowUp': false,
  'ArrowDown': false,
  'ArrowLeft': false
};

/**
 * @param {MouseEvent} e
  */
function handleMouseMove(e) {
  socket.emit('mousemove', e)
}

function handleClick() {
  socket.emit('shoot');
}

window.addEventListener('mousemove', handleMouseMove);
window.addEventListener('click', handleClick);
onkeydown = onkeyup = function (e) {
  keys[e.key] = e.type == "keydown";
  var { ArrowRight, ArrowLeft, ArrowDown, ArrowUp } = keys;
  var newKeys = { ArrowRight: ArrowRight, ArrowLeft: ArrowLeft, ArrowDown: ArrowDown, ArrowUp: ArrowUp }
  if (newKeys != keys) {
    keys = newKeys;
    socket.emit('keychange', keys);
  };
}
socket.on('frame', frameData => {
  ctx.clearRect(0 ,0, canvas.width, canvas.height);

  for(let data of frameData){
    ctx.fillStyle = "black";
    ctx.save();
    ctx.translate(data.x, data.y);
    ctx.fillRect(-6, -6, 12, 12);
    ctx.restore();
  }
})