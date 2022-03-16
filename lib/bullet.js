/**
 * The Bullet object
 */

export class Bullet {
  /**
   * 
   * Creates a new instance of Bullet
   * @param {{x:number,y:number}} initialPosition
   * @param {number} direction
   */
  constructor(initialPosition, direction) {
    const { x, y } = initialPosition
    this.pos = { x: x, y: y };
    this.speed = 8;
    this.direction = direction;
  }

  update() {
    this.pos.x += this.speed * Math.cos(this.direction);
    this.pos.y += this.speed * Math.sin(this.direction);
  }
}