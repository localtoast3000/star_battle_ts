import { CanvasInterface } from '../types/deps';

export default class Bullet {
  private _canvas;
  private _state;

  constructor(
    canvas: CanvasInterface,
    initalState: { x: number; y: number; angle: number }
  ) {
    this._canvas = canvas;
    this._state = {
      x: initalState.x,
      y: initalState.y,
      angle: initalState.angle,
    };
  }

  public draw(): void {
    this._canvas.ctx.save();
    this._canvas.ctx.translate(this._state.x, this._state.y);
    this._canvas.ctx.rotate((this._state.angle * Math.PI) / 180);
    this._canvas.ctx.translate(-this._state.x, -this._state.y);
    this._canvas.ctx.beginPath();
    this._canvas.ctx.fillStyle = 'red';
    this._canvas.ctx.fillRect(this._state.x, this._state.y, 3, 15);
    this._canvas.ctx.closePath();
    this._canvas.ctx.restore();
  }

  public get state() {
    return this._state;
  }

  public updatePos({ x, y }: { x: number; y: number }) {
    this._state.x = x;
    this._state.y = y;
  }
}
