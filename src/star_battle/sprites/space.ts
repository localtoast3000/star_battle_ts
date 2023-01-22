import { CanvasInterface } from '../types/deps';

export default class Space {
  private canvas;
  private state;
  private imageElement;
  private step;

  constructor(canvas: CanvasInterface) {
    this.canvas = canvas;
    this.state = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.imageElement = new Image(this.canvas.width, this.canvas.height);
    this.imageElement.src = 'assets/sprites/space.png';
    this.step = 10;
  }

  public draw() {
    this.canvas.ctx.drawImage(
      this.imageElement,
      this.state.x,
      this.state.y,
      this.canvas.width,
      this.canvas.height,
      0,
      0,
      this.canvas.width,
      this.canvas.height
    );
  }

  public updatePos({ x, y }: { x: number; y: number }) {
    const Xboundry = { left: 0, right: this.canvas.width };
    const Yboundry = { top: 0, bottom: this.canvas.height };
    if (x > Xboundry.left && x < Xboundry.right) this.state.x = x;
    if (y > Yboundry.top && y < Yboundry.bottom) this.state.y = y;
  }

  public goLeft() {
    this.updatePos({ x: this.state.x - this.step, y: this.state.y });
  }
  public goUp() {
    this.updatePos({ x: this.state.x, y: this.state.y - this.step });
  }
  public goRight() {
    this.updatePos({ x: this.state.x + this.step, y: this.state.y });
  }
  public goDown() {
    this.updatePos({ x: this.state.x, y: this.state.y + this.step });
  }
  public goUpLeft() {
    this.updatePos({
      x: this.state.x - this.step / 2,
      y: this.state.y - this.step / 2,
    });
  }
  public goDownLeft() {
    this.updatePos({
      x: this.state.x - this.step / 2,
      y: this.state.y + this.step / 2,
    });
  }
  public goUpRight() {
    this.updatePos({
      x: this.state.x + this.step / 2,
      y: this.state.y - this.step / 2,
    });
  }
  public goDownRight() {
    this.updatePos({
      x: this.state.x + this.step / 2,
      y: this.state.y + this.step / 2,
    });
  }
}
