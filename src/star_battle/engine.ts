import { globalKeyPressEvent } from './events/key_press';
import { globalResizeEvent } from './events/resize';
import config from './config';
import Canvas from './canvas';
import Space from './sprites/space';
import SpaceShip from './sprites/spaceShip';

export default function starBattleEngine(htmlCanvas: HTMLCanvasElement) {
  const canvas = new Canvas(htmlCanvas);
  const space = new Space(canvas);
  const spaceShip = new SpaceShip(canvas);

  globalResizeEvent([canvas.resize]);
  globalKeyPressEvent({
    left: [space.goLeft, spaceShip.goLeft],
    right: [space.goRight, spaceShip.goRight],
    up: [space.goUp, spaceShip.goUp],
    down: [space.goDown, spaceShip.goDown],
    upLeft: [space.goUpLeft, spaceShip.goUpLeft],
    downLeft: [space.goDownLeft, spaceShip.goDownLeft],
    upRight: [space.goUpRight, spaceShip.goUpRight],
    downRight: [space.goDownRight, spaceShip.goDownRight],
    space: [spaceShip.shoot],
  });

  // Game loop
  return setInterval(() => {
    canvas.reset();
    space.draw();
    spaceShip.draw();
  }, config.speed);
}
