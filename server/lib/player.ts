import { Bullet } from './bullet.js';
import Keys from './keys';
import PlayerData from '../../lib/playerJSON';

export class Player {
	public position = { x: 0, y: 0 };
	public angle: number = Math.PI * 3 / 8;
	public speed: number = 2.3;
	public keys: Keys = {
		'ArrowRight': false,
		'ArrowUp': false,
		'ArrowDown': false,
		'ArrowLeft': false
	};

	handleMouseMove(ex: number, ey: number) {
		const { x, y } = this.position;
		const dy = ey - y,
			dx = ex - x;

		this.angle = Math.atan2(dy, dx);
	}

	handleKeyEvent(newKeys: Keys) {
		this.keys = newKeys;
	}

	update() {
		var { ArrowRight, ArrowLeft, ArrowUp, ArrowDown } = this.keys;

		// Update players position based on keys down and speed
		if (ArrowUp) this.position.y -= this.speed;
		if (ArrowRight) this.position.x += this.speed;
		if (ArrowDown) this.position.y += this.speed;
		if (ArrowLeft) this.position.x -= this.speed;
	}

	public shoot(bulletArray: Bullet[]): void {
    var bullet = new Bullet(this.position, this.angle);
    bullet.update();
		bulletArray.push(bullet);
	}

  detectCollision(bullets: Bullet[]) {
    bullets.forEach(bullet => {
      const { x, y } = this.position;
      const { x: bx, y: by } = bullet.pos;
      const dx = x - bx,
        dy = y - by;

      const distance = Math.sqrt(dx * dx + dy * dy);

      if(distance < 10) {
        console.log('death');
      }
    });
	}

	getJSON(): PlayerData {
		return { ...this.position, angle: this.angle};
	}
}