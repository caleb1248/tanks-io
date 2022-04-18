exports.Room = class Room {
  constructor() {
    this.players = [];
    this.bullets = [];
  }

  isFull() {
    return this.players.length >= 2;
  }

  startGame() {
    this.players.forEach(player => {
      player.socket.emit('startGame');
    });

    // Call frame function at 60fps
    setInterval(this.frame.bind(this), 1000 / 60);
  }

  frame() {
    const sendData = [];
    const sendBullets = [];
    this.players.forEach(player => {
      player.update();
      if(player.detectCollision(this.bullets)) {
        this.players.forEach(pplayer => {
          pplayer.socket.emit('game-end', player.socket.id);
        });
      };
      sendData.push(player.getJSON());
    });

    this.bullets.forEach(bullet => {
      bullet.update();
      sendBullets.push(bullet.toJSON());
    });

    this.players.forEach(player => {
      player.socket.emit('frame', sendData, sendBullets);
    });
  }
}