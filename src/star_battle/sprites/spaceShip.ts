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
  private _pressedKeysTrackingMap;
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
    this._pressedKeysTrackingMap = new Map<string, boolean>();
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
    this.trackPressedKeys();
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
    this.state.bullets.forEach((bullet) => {
      bullet.draw();
    });
  }

  public get state() {
    return this._state;
  }

  public eventDistributor(e: EventListenerObject) {
    if (e instanceof KeyboardEvent) {
      if (e.type === 'keydown') this.onKeyDown(e);
      if (e.type === 'keyup') this.onKeyUp(e);
    }
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

  private shoot() {
    const bullet = new Bullet(this._canvas, { x: this.state.x + 40, y: this.state.y });
    this._state.bullets.push(bullet);
    const posX = this.state.x;
    let posY = this.state.y;
    const animation = setInterval(() => {
      bullet.updatePos({ x: posX + 40, y: posY });
      posY -= 10;
      if (bullet.state.y <= this.Yboundary.top) {
        this._state.bullets = this._state.bullets.filter((b) => b !== bullet);
        clearInterval(animation);
      }
    }, config.speed);
  }

  private onKeyDown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
      this._pressedKeysTrackingMap.set(e.code, true);
    }
    if (e.code === 'Space') {
      this.shoot();
      console.log(this.state.bullets);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this._pressedKeysTrackingMap.delete(e.code);
  }

  private trackPressedKeys() {
    const diagonalResistance = 0.8;
    setInterval(() => {
      if (this._pressedKeysTrackingMap.size === 1) {
        if (this._pressedKeysTrackingMap.get('ArrowLeft')) {
          this.updatePos({ x: this.state.x - this._step, y: this.state.y });
          this.updateImageType('left');
        }
        if (this._pressedKeysTrackingMap.get('ArrowRight')) {
          this.updatePos({ x: this.state.x + this._step, y: this.state.y });
          this.updateImageType('right');
        }
        if (this._pressedKeysTrackingMap.get('ArrowUp')) {
          this.updatePos({ x: this.state.x, y: this.state.y - this._step });
          this.updateImageType('forward');
        }
        if (this._pressedKeysTrackingMap.get('ArrowDown')) {
          this.updatePos({ x: this.state.x, y: this.state.y + this._step });
          this.updateImageType('forward');
        }
      } else {
        if (
          this._pressedKeysTrackingMap.get('ArrowLeft') &&
          this._pressedKeysTrackingMap.get('ArrowUp')
        ) {
          this.updatePos({
            x: this.state.x - this._step * diagonalResistance,
            y: this.state.y - this._step * diagonalResistance,
          });
          this.updateImageType('halfLeft');
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowLeft') &&
          this._pressedKeysTrackingMap.get('ArrowDown')
        ) {
          this.updatePos({
            x: this.state.x - this._step * diagonalResistance,
            y: this.state.y + this._step * diagonalResistance,
          });
          this.updateImageType('halfLeft');
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowRight') &&
          this._pressedKeysTrackingMap.get('ArrowUp')
        ) {
          this.updatePos({
            x: this.state.x + this._step * diagonalResistance,
            y: this.state.y - this._step * diagonalResistance,
          });
          this.updateImageType('halfRight');
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowRight') &&
          this._pressedKeysTrackingMap.get('ArrowDown')
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
