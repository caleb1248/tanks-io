exports.Bullet = class Bullet {
  constructor(initialPosition, direction) {
    const { x, y } = initialPosition;
    this.pos = { x: x, y: y };
    this.speed = 10;
    this.direction = direction;
  }

  pos;
  speed;
  direction;

  update() {
    this.pos.x += this.speed * Math.cos(this.direction);
    this.pos.y += this.speed * Math.sin(this.direction);
  }

  toJSON() {
    return {angle: this.direction, pos: this.pos};
  }
}