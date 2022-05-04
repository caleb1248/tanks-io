const { Bullet } = require('./bullet');

exports.Player = class Player {
  constructor(socket) {
    this.socket = socket;
  }

	position = { x: 0, y: 0 };
	angle = Math.PI * 3 / 8;
	speed = 2.3;
  socket;
	keys = {
		'ArrowRight': false,
		'ArrowUp': false,
		'ArrowDown': false,
		'ArrowLeft': false
	};

	handleMouseMove(ex, ey) {
		const { x, y } = this.position;
		const dy = ey - y,
			dx = ex - x;
		this.angle = Math.atan2(dy, dx);
	}

	handleKeyEvent(newKeys) {
		this.keys = newKeys;
	}

	update() {
		var { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } = this.keys;

		if (ArrowUp) this.position.y -= this.speed;
		if (ArrowRight) this.position.x += this.speed;
		if (ArrowDown) this.position.y += this.speed;
		if (ArrowLeft) this.position.x -= this.speed;
		if(this.position.x < 0) this.position.x = 0;
		if(this.position.y < 0) this.position.y = 0;
		if(this.position.x > 402) this.position.x = 400;
		if(this.position.y > 402) this.position.y = 400;
	}

	shoot(bulletArray) {
    var bullet = new Bullet(this.position, this.angle);
    bullet.update();
		bullet.update();
		bulletArray.push(bullet);
	}

  detectCollision(bullets) {
		let collided = false;
    bullets.forEach(bullet => {
      const { x, y } = this.position;
      const { x: bx, y: by } = bullet.pos;
      const dx = x - bx,
        dy = y - by;

      const distance = Math.sqrt(dx * dx + dy * dy);
			collided = distance < 10;
    });
		return collided;
	}

	getJSON() {
		return { ...this.position, angle: this.angle};
	}
}