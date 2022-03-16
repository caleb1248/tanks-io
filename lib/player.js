import { Bullet } from './bullet.js'

export class Player {
  /**
   * Creates a new instance of Player
   */
  constructor() {
    this.position = { x: 0, y: 0 }
    this.angle = Math.PI * 3 / 8;
    this.speed = 2.3;
    this.keys = {
      'ArrowRight': false,
      'ArrowUp': false,
      'ArrowDown': false,
      'ArrowLeft': false
    };

    /**
     * @type {Bullet[]}
     */
    this.bullets = [];
  }

  /**
   * Handles the mousemove event
   * @param {number} ex 
   * @param {number} ey 
   */
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

  shoot() {
    this.bullets.push(new Bullet(this.position, this.angle));
  }

  getJSON() {
    return { ...this.position, angle: this.angle, bullets: this.bullets }
  }
}