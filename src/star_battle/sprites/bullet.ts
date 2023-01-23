import { CanvasInterface } from '../types/deps';
import { SpriteSheetInterface } from '../types/sprites';

export default class Bullet {
  private canvas;
  private state;
  private scale;
  private step;

  constructor(canvas: CanvasInterface) {
    this.canvas = canvas;
    this.state = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      imageType: 'forward',
    };

    this.scale = 0.8;
    this.step = 10;
  }

  public draw(): void {
    this.canvas.ctx.beginPath();
    this.canvas.ctx.rect(this.state.x, this.state.y, 3, 15);
    this.canvas.ctx.fillStyle = 'red';
    this.canvas.ctx.fill();
    this.canvas.ctx.closePath();
  }

  public eventDistributor(e: EventListenerObject) {
    console.log(e);
  }

  public get Xboundary() {
    return { left: -10, right: this.canvas.width - 70 };
  }
  public get Yboundary() {
    return { top: 0, bottom: this.canvas.height - 80 };
  }

  public updatePos({ x, y }: { x: number; y: number }) {
    if (x > this.Xboundary.left && x < this.Xboundary.right) this.state.x = x;
    if (y > this.Yboundary.top && y < this.Yboundary.bottom) this.state.y = y;
  }
}
