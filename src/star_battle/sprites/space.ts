import { CanvasInterface } from '../types/deps';

export default class Space {
  private canvas;
  private state;
  private imageElement;
  private step;
  private scale;

  constructor(canvas: CanvasInterface) {
    this.canvas = canvas;
    this.state = { x: this.canvas.width / 2, y: this.canvas.height / 2 };
    this.imageElement = new Image(this.canvas.width, this.canvas.height);
    this.imageElement.src = 'assets/sprites/space.jpg';
    this.step = 10;
    this.scale = 2;
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
      this.canvas.width * this.scale,
      this.canvas.height * this.scale
    );
  }
  public get Xboundary() {
    return { left: 0, right: this.canvas.width };
  }
  public get Yboundary() {
    return { top: 0, bottom: this.canvas.height };
  }
  public updatePos({ x, y }: { x: number; y: number }) {
    if (x > this.Xboundary.left && x < this.Xboundary.right) this.state.x = x;
    if (y > this.Yboundary.top && y < this.Yboundary.bottom) this.state.y = y;
  }
  public onCanvasResize() {
    this.state.x = this.Xboundary.right / 2;
    this.state.y = this.Yboundary.bottom - 10;
    if (this.canvas.width > 1200) {
      this.scale = 3.3;
    } else this.scale = 2;
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
