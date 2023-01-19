import { CanvasContext } from '../types/deps';
import { SpriteInterface, SpriteSheetInterface, SpaceShipState } from '../types/sprites';
/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
*/

export default function spaceShipConstructor<SpriteInterface>({
  ctx,
  width,
  height,
}: CanvasContext) {
  const state: SpaceShipState = { x: width / 2, y: height / 2, imageType: 'forward' };
  const imageElement: HTMLImageElement = new Image(384, 697);
  imageElement.src = 'assets/sprites/space_ship.png';
  const scale: number = 0.7;
  const step: number = 10;
  const spriteSheetMap: SpriteSheetInterface = {
    forward: { x: 0, y: 600 },
    left: { x: 100, y: 400 },
    right: { x: 200, y: 600 },
    halfLeft: { x: 100, y: 500 },
    halfRight: { x: 100, y: 600 },
  };
  return {
    draw: () =>
      ctx.drawImage(
        imageElement,
        spriteSheetMap[state.imageType].x,
        spriteSheetMap[state.imageType].y,
        100,
        80,
        state.x,
        state.y,
        100 * scale,
        100 * scale
      ),
    goLeft: () => {
      state.x - step > -15 && (state.x -= step);
      state.imageType = 'left';
    },
    goUp: () => {
      state.y - step > -15 && (state.y -= step);
      state.imageType = 'forward';
    },
    goRight: () => {
      state.x + step < width - 50 && (state.x += step);
      state.imageType = 'right';
    },
    goDown: () => {
      state.y + step < height - 75 && (state.y += step);
      state.imageType = 'forward';
    },
    goUpLeft: () => {
      state.x - step > -15 && (state.x -= step / 2);
      state.y - step > -15 && (state.y -= step / 2);
      state.imageType = 'halfLeft';
    },
    goDownLeft: () => {
      state.x - step > -15 && (state.x -= step / 2);
      state.y + step < height - 75 && (state.y += step / 2);
      state.imageType = 'halfLeft';
    },
    goUpRight: () => {
      state.x + step < width - 50 && (state.x += step / 2);
      state.y - step > -15 && (state.y -= step / 2);
      state.imageType = 'halfRight';
    },
    goDownRight: () => {
      state.x + step < width - 50 && (state.x += step / 2);
      state.y + step < height - 75 && (state.y += step / 2);
      state.imageType = 'halfRight';
    },
  };
}
