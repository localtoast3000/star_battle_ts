import { globalDirectionalKeyPressEvent } from './events/directional_keys';
import { CanvasContext } from './types/deps';
import { SpriteInterface } from './types/sprites';
import config from './config';
import spaceConstructor from './sprites/space';
import spaceShipConstructor from './sprites/spaceShip';

export default function starBattleEngine(canvas: HTMLCanvasElement) {
  const cvs: CanvasContext = {
    ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
    width: canvas.width,
    height: canvas.height,
  };
  const space: SpriteInterface = spaceConstructor(cvs);
  const spaceShip: SpriteInterface = spaceShipConstructor(cvs);

  globalDirectionalKeyPressEvent({
    left: [space.goLeft, spaceShip.goLeft],
    right: [space.goRight, spaceShip.goRight],
    up: [space.goUp ,spaceShip.goUp],
    down: [space.goDown, spaceShip.goDown],
    upLeft: [space.goUpLeft,spaceShip.goUpLeft],
    downLeft: [space.goDownLeft,spaceShip.goDownLeft],
    upRight: [space.goUpRight ,spaceShip.goUpRight],
    downRight: [space.goDownRight,spaceShip.goDownRight],
  });

  // Game loop
  return setInterval(() => {
    cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    space.draw();
    spaceShip.draw();
  }, config.speed);
}
