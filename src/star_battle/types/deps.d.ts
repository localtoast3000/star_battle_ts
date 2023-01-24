export interface CanvasInterface {
  element: HTMLCanvasElement;
  ctx: Function<CanvasRenderingContext2D>;
  width: Function<number>;
  height: Function<number>;
  reset: Function<void>;
}
