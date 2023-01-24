import { CanvasInterface } from '../types/deps';

export default class Bullet {
  private _canvas;
  private _state;

  constructor(canvas: CanvasInterface, initalPos: { x: number; y: number }) {
    this._canvas = canvas;
    this._state = {
      x: initalPos.x,
      y: initalPos.y,
    };
  }

  public draw(): void {
    this._canvas.ctx.beginPath();
    this._canvas.ctx.rect(this._state.x, this._state.y, 3, 15);
    this._canvas.ctx.fillStyle = 'red';
    this._canvas.ctx.fill();
    this._canvas.ctx.closePath();
  }

  public get state() {
    return this._state;
  }

  public updatePos({ x, y }: { x: number; y: number }) {
    this._state.x = x;
    this._state.y = y;
  }
}
