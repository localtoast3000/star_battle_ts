import { globalDirectionalKeyPressEvent } from './events/directional_keys';
import spaceShipConstructor from './sprites/space_ship/spaceShip';

export default function starBattleEngine(canvas: HTMLCanvasElement) {
  const cvs = {
    ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
    width: canvas.width,
    height: canvas.height,
  };
  const gameSpeed = 20;
  const spaceShip = spaceShipConstructor(cvs);

  globalDirectionalKeyPressEvent({
    left: [spaceShip.goLeft],
    right: [spaceShip.goRight],
    up: [spaceShip.goUp],
    down: [spaceShip.goDown],
    upLeft: [spaceShip.goUpLeft],
    downLeft: [spaceShip.goDownLeft],
    upRight: [spaceShip.goUpRight],
    downRight: [spaceShip.goDownRight]
  });

  return setInterval(() => {
    cvs.ctx.clearRect(0, 0, cvs.width, cvs.height);
    spaceShip.draw();
  }, gameSpeed);
}
