import { globalDirectionalKeyPressEvent } from './events/directional_keys';
import spaceShipConstructor from './sprites/spaceShip';
import { CanvasContext } from './types/deps';
import { SpriteInterface } from './types/sprites';
import config from './config';

export default function starBattleEngine(canvas: HTMLCanvasElement) {
  const cvs: CanvasContext = {
    ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
    width: canvas.width,
    height: canvas.height,
  };
  const spaceShip: SpriteInterface = spaceShipConstructor(cvs);

  globalDirectionalKeyPressEvent({
    left: [spaceShip.goLeft],
    right: [spaceShip.goRight],
    up: [spaceShip.goUp],
    down: [spaceShip.goDown],
    upLeft: [spaceShip.goUpLeft],
    downLeft: [spaceShip.goDownLeft],
    upRight: [spaceShip.goUpRight],
    downRight: [spaceShip.goDownRight],
  });

  // Game loop
  return setInterval(() => {
    cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    spaceShip.draw();
  }, config.speed);
}
