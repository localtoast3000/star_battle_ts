import { CanvasInterface } from '../types/deps';
import config from '../config';

export default class Space {
  private _canvas;
  private _state;
  private _pressedKeysTrackingMap;
  private _imageElement;
  private _step;
  private _scale;

  constructor(canvas: CanvasInterface) {
    this._canvas = canvas;
    this._pressedKeysTrackingMap = new Map<string, boolean>();
    this._state = { x: this._canvas.width / 2, y: this._canvas.height / 2 };
    this._imageElement = new Image(this._canvas.width, this._canvas.height);
    this._imageElement.src = 'assets/sprites/space.png';
    this._step = 10;
    this._scale = 2;
    this.trackPressedKeys();
  }

  public draw() {
    this._canvas.ctx.drawImage(
      this._imageElement,
      this._state.x,
      this._state.y,
      this._canvas.width,
      this._canvas.height,
      0,
      0,
      this._canvas.width * this._scale,
      this._canvas.height * this._scale
    );
  }

  public eventDistributor(e: Event) {
    if (e.type === 'keydown') this.onKeyDown(e as KeyboardEvent);
    if (e.type === 'keyup') this.onKeyUp(e as KeyboardEvent);
    if (e.type === 'resize') this.onResize();
  }

  public get state() {
    return this._state;
  }

  private onKeyDown(e: KeyboardEvent) {
    if (['ArrowLeft', 'ArrowRight', 'ArrowUp', 'ArrowDown'].includes(e.code)) {
      this._pressedKeysTrackingMap.set(e.code, true);
    }
  }

  private onKeyUp(e: KeyboardEvent) {
    this._pressedKeysTrackingMap.delete(e.code);
  }

  private get Xboundary() {
    return { left: 0, right: this._canvas.width };
  }
  private get Yboundary() {
    return { top: 0, bottom: this._canvas.height };
  }
  private updatePos({ x, y }: { x: number; y: number }) {
    if (x > this.Xboundary.left && x < this.Xboundary.right) this.state.x = x;
    if (y > this.Yboundary.top && y < this.Yboundary.bottom) this.state.y = y;
  }
  private onResize() {
    this.state.x = this.Xboundary.right / 2;
    this.state.y = this.Yboundary.bottom - 10;
    if (this._canvas.width > 1200) {
      this._scale = 3.3;
    } else this._scale = 2;
  }

  private trackPressedKeys() {
    const diagonalResistance = 0.8;
    setInterval(() => {
      if (this._pressedKeysTrackingMap.size === 1) {
        if (this._pressedKeysTrackingMap.get('ArrowLeft')) {
          this.updatePos({ x: this.state.x - this._step, y: this.state.y });
        }
        if (this._pressedKeysTrackingMap.get('ArrowRight')) {
          this.updatePos({ x: this.state.x + this._step, y: this.state.y });
        }
        if (this._pressedKeysTrackingMap.get('ArrowUp')) {
          this.updatePos({ x: this.state.x, y: this.state.y - this._step });
        }
        if (this._pressedKeysTrackingMap.get('ArrowDown')) {
          this.updatePos({ x: this.state.x, y: this.state.y + this._step });
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
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowLeft') &&
          this._pressedKeysTrackingMap.get('ArrowDown')
        ) {
          this.updatePos({
            x: this.state.x - this._step * diagonalResistance,
            y: this.state.y + this._step * diagonalResistance,
          });
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowRight') &&
          this._pressedKeysTrackingMap.get('ArrowUp')
        ) {
          this.updatePos({
            x: this.state.x + this._step * diagonalResistance,
            y: this.state.y - this._step * diagonalResistance,
          });
        }
        if (
          this._pressedKeysTrackingMap.get('ArrowRight') &&
          this._pressedKeysTrackingMap.get('ArrowDown')
        ) {
          this.updatePos({
            x: this.state.x + this._step * diagonalResistance,
            y: this.state.y + this._step * diagonalResistance,
          });
        }
      }
    }, config.speed);
  }
}
