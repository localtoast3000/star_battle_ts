import { SpriteProps } from '../types/deps';
/*
       ---- Sprite Sheet ----
    1. Far bottom image at 600px
    2. Far right image at 300px
    3. 100px from image to image
*/

export default function spaceShip({ ctx, dims, x, y, imageType }: SpriteProps) {
  const image = new Image(384, 697);
  const scale = 0.7;
  const spriteSheetMap: any = {
    forward: { x: 0, y: 600 },
    left: { x: 200, y: 500 },
    right: { x: 200, y: 600 },
  };
  image.src = 'assets/sprites/space_ship.png';
  ctx.drawImage(
    image,
    spriteSheetMap[imageType as string].x,
    spriteSheetMap[imageType as string].y,
    100,
    80,
    x,
    y,
    100 * scale,
    100 * scale
  );
}
