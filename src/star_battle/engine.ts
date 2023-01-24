import config from './config';
import Canvas from './canvas';
import Space from './sprites/space';
import SpaceShip from './sprites/spaceShip';
import eventProvider from './events/eventProvider';
import Alien from './sprites/alien';

export default function starBattleEngine(htmlCanvas: HTMLCanvasElement) {
  const canvas = new Canvas(htmlCanvas);
  const space = new Space(canvas);
  const alien = new Alien(canvas);
  const spaceShip = new SpaceShip(canvas);

  eventProvider((e: Event) => {
    canvas.eventDistributor(e);
    space.eventDistributor(e);
    alien.eventDistributor(e);
    spaceShip.eventDistributor(e);
  });

  // Game loop
  return setInterval(() => {
    canvas.reset();
    space.draw();
    alien.draw();
    spaceShip.draw();
  }, config.speed);
}
