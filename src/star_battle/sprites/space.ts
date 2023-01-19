import { CanvasContext } from '../types/deps';
import { SpriteInterface, SpriteSheetInterface, SpaceState } from '../types/sprites';
/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
*/

export default function SpaceConstructor<SpriteInterface>({
  ctx,
  width,
  height,
}: CanvasContext) {
  const state: SpaceState = { x: width / 2, y: height / 2 };
  const imageElement: HTMLImageElement = new Image(width, height);
  imageElement.src = 'assets/sprites/space.png';
  const scale: number = 1.4;
  const step: number = 10;
  return {
    draw: () =>
      ctx.drawImage(
        imageElement,
        state.x,
        state.y,
        1200,
        1200,
        0,
        0,
        width,
        height
      ),
    goLeft: () => {
      state.x - step > 0 && (state.x -= step);
    },
    goUp: () => {
      state.y - step > 0 && (state.y -= step);
    },
    goRight: () => {
      state.x + step < width - 50 && (state.x += step);
    },
    goDown: () => {
      state.y + step < height - 75 && (state.y += step);
    },
    goUpLeft: () => {
      state.x - step > 0 && (state.x -= step / 2);
      state.y - step > 0 && (state.y -= step / 2);
    },
    goDownLeft: () => {
      state.x - step > 0 && (state.x -= step / 2);
      state.y + step < height + 100 && (state.y += step / 2);
    },
    goUpRight: () => {
      state.x + step < width + 100 && (state.x += step / 2);
      state.y - step > 0 && (state.y -= step / 2);
    },
    goDownRight: () => {
      state.x + step < width + 100 && (state.x += step / 2);
      state.y + step < height + 100 && (state.y += step / 2);
    },
  };
}
