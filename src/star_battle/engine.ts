import config from './config';
import Canvas from './canvas';
import Space from './sprites/space';
import SpaceShip from './sprites/spaceShip';
import eventProvider from './events/eventProvider';

export default function starBattleEngine(htmlCanvas: HTMLCanvasElement) {
  const canvas = new Canvas(htmlCanvas);
  const space = new Space(canvas);
  const spaceShip = new SpaceShip(canvas);

  eventProvider((e: EventListenerObject) => {
    spaceShip.eventDistributor(e);
  });

  // Game loop
  return setInterval(() => {
    canvas.reset();
    space.draw();
    spaceShip.draw();
  }, config.speed);
}
