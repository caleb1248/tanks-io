import { Bullet } from './bullet.js'
import Keys from './keys';
export class Player {
  constructor() {
  }

  
  public position = { x: 0, y: 0 };
  public angle: number = Math.PI * 3 / 8;
  public bullets: Bullet[] = [];
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
    
    // Update bullets
    for(var bullet of this.bullets) {
      bullet.update();
    }
  }

  public shoot(): void {
    this.bullets.push(new Bullet(this.position, this.angle));
  }

  getJSON() {
    return { ...this.position, angle: this.angle, bullets: this.bullets }
  }
}