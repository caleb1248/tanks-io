/**
 * The Player object
 */
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
    this.bullets = [];
  }

  handleMouseMove({ clientX, clientY }) {
    const { x, y } = this.position;
    const dy = clientY - y,
      dx = clientX - x;
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
      console.log(this.position);
      bullet.update();
    }
  }
  shoot() {
    console.log('shoot');
  }
}