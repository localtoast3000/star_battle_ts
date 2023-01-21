import { CanvasInterface } from './types/deps';

export default class Canvas implements CanvasInterface {
  private canvas: HTMLCanvasElement;
  private padding: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.padding = 200;
    canvas.width = window.innerWidth - this.padding;
    canvas.height = window.innerHeight - this.padding;
  }

  public get ctx(): CanvasRenderingContext2D {
    return this.canvas.getContext('2d') as CanvasRenderingContext2D;
  }
  public get width(): number {
    return this.canvas.width;
  }
  public get height(): number {
    return this.canvas.height;
  }
  public reset(): void {
    this.ctx.clearRect(0, 0, this.width, this.height);
  }
  public resize(): void {
    this.canvas.width = window.innerWidth - this.padding;
    this.canvas.height = window.innerHeight - this.padding;
  }
}
