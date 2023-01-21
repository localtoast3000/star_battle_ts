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
  public goLeft() {
    console.log(this.state);
    // this.state.x - this.step > 0 && (this.state.x -= this.step);
  }
  public goUp() {
    console.log(this.state);
    this.state.y - this.step > 0 && (this.state.y -= this.step);
  }
  public goRight() {
    this.state.x + this.step < this.canvas.width - 50 && (this.state.x += this.step);
  }
  public goDown() {
    this.state.y + this.step < this.canvas.height - 75 && (this.state.y += this.step);
  }
  public goUpLeft() {
    this.state.x - this.step > 0 && (this.state.x -= this.step / 2);
    this.state.y - this.step > 0 && (this.state.y -= this.step / 2);
  }
  public goDownLeft() {
    this.state.x - this.step > 0 && (this.state.x -= this.step / 2);
    this.state.y + this.step < this.canvas.height + 100 &&
      (this.state.y += this.step / 2);
  }
  public goUpRight() {
    this.state.x + this.step < this.canvas.width + 100 && (this.state.x += this.step / 2);
    this.state.y - this.step > 0 && (this.state.y -= this.step / 2);
  }
  public goDownRight() {
    this.state.x + this.step < this.canvas.width + 100 && (this.state.x += this.step / 2);
    this.state.y + this.step < this.canvas.height + 100 &&
      (this.state.y += this.step / 2);
  }
}
