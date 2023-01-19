export interface SpriteProps {
  ctx: CanvasRenderingContext2D;
  dims: {
    width: number;
    height: number;
  };
  x: number;
  y: number;
  imageType: string | undefined;
}
