import { CanvasInterface } from '../types/deps';
import { SpriteSheetInterface } from '../types/sprites';
/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
    4. Image frame 100px * 100px
*/

export default class SpaceShip {
  private canvas;
  private state;
  private imageElement;
  private scale;
  private step;
  private imageFrame;
  private spriteSheetMap: SpriteSheetInterface;

  constructor(canvas: CanvasInterface) {
    this.canvas = canvas;
    this.imageElement = new Image(384, 697);
    this.imageElement.src = 'assets/sprites/space_ship.png';
    this.state = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      imageType: 'forward',
    };
    this.scale = 0.8;
    this.step = 10;
    this.imageFrame = 100;
    this.spriteSheetMap = {
      forward: { x: 0, y: 600 },
      left: { x: 100, y: 400 },
      right: { x: 200, y: 600 },
      halfLeft: { x: 100, y: 500 },
      halfRight: { x: 100, y: 600 },
    };
  }

  public draw(): void {
    this.canvas.ctx.drawImage(
      this.imageElement,
      this.spriteSheetMap[this.state.imageType].x,
      this.spriteSheetMap[this.state.imageType].y,
      this.imageFrame,
      this.imageFrame,
      this.state.x,
      this.state.y,
      this.imageFrame * this.scale,
      this.imageFrame * this.scale
    );
  }
  public goLeft(): void {
    this.state.x - this.step > -15 && (this.state.x -= this.step);
    this.state.imageType = 'left';
  }
  public goUp(): void {
    this.state.y - this.step > -15 && (this.state.y -= this.step);
    this.state.imageType = 'forward';
  }
  public goRight(): void {
    this.state.x + this.step < this.canvas.width - 50 && (this.state.x += this.step);
    this.state.imageType = 'right';
  }
  public goDown(): void {
    this.state.y + this.step < this.canvas.height - 75 && (this.state.y += this.step);
    this.state.imageType = 'forward';
  }
  public goUpLeft(): void {
    this.state.x - this.step > -15 && (this.state.x -= this.step / 2);
    this.state.y - this.step > -15 && (this.state.y -= this.step / 2);
    this.state.imageType = 'halfLeft';
  }
  public goDownLeft(): void {
    this.state.x - this.step > -15 && (this.state.x -= this.step / 2);
    this.state.y + this.step < this.canvas.height - 75 && (this.state.y += this.step / 2);
    this.state.imageType = 'halfLeft';
  }
  public goUpRight(): void {
    this.state.x + this.step < this.canvas.width - 50 && (this.state.x += this.step / 2);
    this.state.y - this.step > -15 && (this.state.y -= this.step / 2);
    this.state.imageType = 'halfRight';
  }
  public goDownRight(): void {
    this.state.x + this.step < this.canvas.width - 50 && (this.state.x += this.step / 2);
    this.state.y + this.step < this.canvas.height - 75 && (this.state.y += this.step / 2);
    this.state.imageType = 'halfRight';
  }
  public shoot(): void {
    this.state.y += 30;
  }
}
