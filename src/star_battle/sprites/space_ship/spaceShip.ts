import { CanvasContext } from '../types/deps';
/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
*/

export default function spaceShipConstructor({ ctx, width, height }: CanvasContext) {
  const state = { x: width / 2, y: height / 2, imageType: 'forward' };
  const imageElement = new Image(384, 697);
  imageElement.src = 'assets/sprites/space_ship.png';
  const scale = 0.7;
  const step = 10;
  const spriteSheetMap: any = {
    forward: { x: 0, y: 600 },
    left: { x: 200, y: 500 },
    right: { x: 200, y: 600 },
  };
  return {
    draw: () =>
      ctx.drawImage(
        imageElement,
        spriteSheetMap[state.imageType as string].x,
        spriteSheetMap[state.imageType as string].y,
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
      state.x - step > -15 && (state.x -= step);
      state.y - step > -15 && (state.y -= step);
      state.imageType = 'diagonalUpLeft';
    },
    goDownLeft: () => {
      state.x - step > -15 && (state.x -= step);
      state.y + step < height - 75 && (state.y += step);
      state.imageType = 'diagonalDownLeft';
    },
    goUpRight: () => {
      state.x + step < width - 50 && (state.x += step);
      state.y - step > -15 && (state.y -= step);
      state.imageType = 'diagonalUpRight';
    },
    goDownRight: () => {
      state.x + step < width - 50 && (state.x += step);
      state.y + step < height - 75 && (state.y += step);
      state.imageType = 'diagonalDownRight';
    },
  };
}
