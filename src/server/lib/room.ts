// import stuff
import PlayerData from "../../lib/playerJSON";
import { Bullet } from "./bullet";
import BulletData from "../../lib/bullet";
import { Player } from "./player";

export default class Room {
  constructor() {
    this.players = [];
  }

  public players: Player[];
  public bullets: Bullet[] = [];

  public isFull(): boolean {
    return this.players.length >= 2;
  }

  public startGame(): void {
    this.players.forEach(player => {
      player.socket.emit('startGame');
    });

    // Call frame function at 60fps
    setInterval(this.frame.bind(this), 1000 / 60);
  }

  frame(): void {
    const sendData: PlayerData[] = [];
    const sendBullets: BulletData[] = [];
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