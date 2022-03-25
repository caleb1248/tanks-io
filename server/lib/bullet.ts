export class Bullet {
  constructor(initialPosition: { x: number, y: number }, direction: number) {
    const { x, y } = initialPosition;
    this.pos = { x: x, y: y };
    this.speed = 8;
    this.direction = direction;
    console.log('shooting bullet', this.pos, this.direction, 'degrees')
  }

  public pos: { x: number, y: number };
  public speed: number;
  public direction: number;

  update() {
    this.pos.x += this.speed * Math.cos(this.direction);
    this.pos.y += this.speed * Math.sin(this.direction);
  }

  toJSON() {
    return {direction: this.direction, pos: this.pos};
  }
}