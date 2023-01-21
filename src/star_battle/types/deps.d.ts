export interface CanvasInterface {
  ctx: Function<CanvasRenderingContext2D>;
  width: Function<number>;
  height: Function<number>;
  reset: Function<void>;
  resize: Function<void>;
}
