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
  private imageElement;
  private imageFrame;
  private spriteSheetMap: SpriteSheetInterface;
  private state;
  private scale;
  private step;

  constructor(canvas: CanvasInterface) {
    this.canvas = canvas;
    this.imageElement = new Image(384, 697);
    this.imageElement.src = 'assets/sprites/space_ship.png';
    this.imageFrame = 100;
    this.spriteSheetMap = {
      forward: { x: 0, y: 600 },
      left: { x: 100, y: 400 },
      right: { x: 200, y: 600 },
      halfLeft: { x: 100, y: 500 },
      halfRight: { x: 100, y: 600 },
    };
    this.state = {
      x: this.canvas.width / 2,
      y: this.canvas.height / 2,
      imageType: 'forward',
    };

    this.scale = 0.8;
    this.step = 10;
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
  public updateImage(imageType: string) {
    this.state.imageType = imageType;
  }
  public onCanvasResize() {
    this.state.x = this.Xboundary.right / 2;
    this.state.y = this.Yboundary.bottom - 10;
  }
  public goLeft(): void {
    this.updatePos({ x: this.state.x - this.step, y: this.state.y });
    this.updateImage('left');
  }
  public goUp(): void {
    this.updatePos({ x: this.state.x, y: this.state.y - this.step });
    this.updateImage('forward');
  }
  public goRight(): void {
    this.updatePos({ x: this.state.x + this.step, y: this.state.y });
    this.updateImage('right');
  }
  public goDown(): void {
    this.updatePos({ x: this.state.x, y: this.state.y + this.step });
    this.updateImage('forward');
  }
  public goUpLeft(): void {
    this.updatePos({ x: this.state.x - this.step / 2, y: this.state.y - this.step / 2 });
    this.updateImage('halfLeft');
  }
  public goDownLeft(): void {
    this.updatePos({
      x: this.state.x - this.step / 2,
      y: this.state.y + this.step / 2,
    });
    this.updateImage('halfLeft');
  }
  public goUpRight(): void {
    this.updatePos({ x: this.state.x + this.step / 2, y: this.state.y - this.step / 2 });
    this.updateImage('halfRight');
  }
  public goDownRight(): void {
    this.updatePos({ x: this.state.x + this.step / 2, y: this.state.y + this.step / 2 });
    this.updateImage('halfRight');
  }
  public shoot(): void {
    this.state.y += 30;
  }
}
