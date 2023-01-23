import { CanvasInterface } from '../types/deps';
import { SpriteSheetInterface } from '../types/sprites';
import Bullet from './bullet';
import config from '../config';

/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
    4. Image frame 100px * 100px
*/

export default class SpaceShip {
  private _canvas;
  private _imageElement;
  private _imageFrame;
  private _spriteSheetMap: SpriteSheetInterface;
  private keyDownTrackingMap;
  private _state: {
    x: number;
    y: number;
    bullets: Bullet[];
    imageType: string;
  };
  private _scale;
  private _step;

  constructor(canvas: CanvasInterface) {
    this._canvas = canvas;
    this.keyDownTrackingMap = new Map<string, boolean>();
    this._imageElement = new Image(384, 697);
    this._imageElement.src = 'assets/sprites/space_ship.png';
    this._imageFrame = 100;
    this._spriteSheetMap = {
      forward: { x: 0, y: 600 },
      left: { x: 100, y: 400 },
      right: { x: 200, y: 600 },
      halfLeft: { x: 100, y: 500 },
      halfRight: { x: 100, y: 600 },
    };
    this._state = {
      x: this.Xboundary.right * 0.8,
      y: this.Yboundary.bottom - 10,
      bullets: [],
      imageType: 'forward',
    };

    this._scale = 0.8;
    this._step = 10;
    this.trackDownKeys();
  }

  public draw(): void {
    this._canvas.ctx.drawImage(
      this._imageElement,
      this._spriteSheetMap[this._state.imageType].x,
      this._spriteSheetMap[this._state.imageType].y,
      this._imageFrame,
      this._imageFrame,
      this._state.x,
      this._state.y,
      this._imageFrame * this._scale,
      this._imageFrame * this._scale
    );
    // this.animateBullets();
  }

  public get state() {
    return this._state;
  }

  private get Xboundary() {
    return { left: -10, right: this._canvas.width - 70 };
  }

  private get Yboundary() {
    return { top: 0, bottom: this._canvas.height - 80 };
  }

  private updatePos({ x, y }: { x: number; y: number }) {
    if (x > this.Xboundary.left && x < this.Xboundary.right) this._state.x = x;
    if (y > this.Yboundary.top && y < this.Yboundary.bottom) this._state.y = y;
  }

  private updateImageType(type: string) {
    this.state.imageType = type;
  }

  private onCanvasResize() {
    this._state.x = this.Xboundary.right * 0.8;
    this._state.y = this.Yboundary.bottom - 10;
  }

  private drawBullet(): void {
    const bullet = new Bullet(this._canvas);
    bullet.draw();
  }

  private shoot() {
    this._state.bullets.push(new Bullet(this._canvas));
    console.log(this.state.bullets);
  }

  private eventDistributor(e: EventListenerObject) {
    if (e instanceof KeyboardEvent) {
      if (e.type === 'keydown') this.onKeyDown(e);
      if (e.type === 'keyup') this.onKeyUp(e);
    }
  }

  private onKeyDown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown', 'Space'].includes(e.code)) {
      this.keyDownTrackingMap.set(e.code, true);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this.keyDownTrackingMap.delete(e.code);
  }

  private trackDownKeys() {
    const diagonalResistance = 0.8;
    setInterval(() => {
      if (this.keyDownTrackingMap.size === 1) {
        if (this.keyDownTrackingMap.get('ArrowLeft')) {
          this.updatePos({ x: this.state.x - this._step, y: this.state.y });
          this.updateImageType('left');
        }
        if (this.keyDownTrackingMap.get('ArrowRight')) {
          this.updatePos({ x: this.state.x + this._step, y: this.state.y });
          this.updateImageType('right');
        }
        if (this.keyDownTrackingMap.get('ArrowUp')) {
          this.updatePos({ x: this.state.x, y: this.state.y - this._step });
          this.updateImageType('forward');
        }
        if (this.keyDownTrackingMap.get('ArrowDown')) {
          this.updatePos({ x: this.state.x, y: this.state.y + this._step });
          this.updateImageType('forward');
        }
      } else {
        if (
          this.keyDownTrackingMap.get('ArrowLeft') &&
          this.keyDownTrackingMap.get('ArrowUp')
        ) {
          this.updatePos({
            x: this.state.x - this._step * diagonalResistance,
            y: this.state.y - this._step * diagonalResistance,
          });
          this.updateImageType('halfLeft');
        }
        if (
          this.keyDownTrackingMap.get('ArrowLeft') &&
          this.keyDownTrackingMap.get('ArrowDown')
        ) {
          this.updatePos({
            x: this.state.x - this._step * diagonalResistance,
            y: this.state.y + this._step * diagonalResistance,
          });
          this.updateImageType('halfLeft');
        }
        if (
          this.keyDownTrackingMap.get('ArrowRight') &&
          this.keyDownTrackingMap.get('ArrowUp')
        ) {
          this.updatePos({
            x: this.state.x + this._step * diagonalResistance,
            y: this.state.y - this._step * diagonalResistance,
          });
          this.updateImageType('halfRight');
        }
        if (
          this.keyDownTrackingMap.get('ArrowRight') &&
          this.keyDownTrackingMap.get('ArrowDown')
        ) {
          this.updatePos({
            x: this.state.x + this._step * diagonalResistance,
            y: this.state.y + this._step * diagonalResistance,
          });
          this.updateImageType('halfRight');
        }
      }
    }, config.speed);
  }
}
