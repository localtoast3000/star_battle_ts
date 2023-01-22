import { CanvasInterface } from './types/deps';

export default class Canvas implements CanvasInterface {
  private canvas: HTMLCanvasElement;
  private padding: number;

  constructor(canvas: HTMLCanvasElement) {
    this.canvas = canvas;
    this.padding = 30;
    canvas.style.marginTop = `${this.padding}px`;
    canvas.width = window.innerWidth - this.padding * 2;
    canvas.height = window.innerHeight - this.padding * 2;
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
    this.canvas.width = window.innerWidth - this.padding * 2;
    this.canvas.height = window.innerHeight - this.padding * 2;
  }
}
