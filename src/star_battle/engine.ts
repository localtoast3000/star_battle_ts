import spaceShip from './sprites/space_ship/spaceShip';

export default function starBattleEngine(canvas: HTMLCanvasElement) {
  const cvs = {
    ctx: canvas.getContext('2d') as CanvasRenderingContext2D,
    dims: {
      width: canvas.width,
      height: canvas.height,
    },
  };
  const gameSpeed = 20;
  const step = 10;
  const spritesConfig = {
    spaceShip: { x: cvs.dims.width / 2, y: cvs.dims.height / 2, imageType: 'forward' },
  };

  window.addEventListener('keydown', (e) => {
    const actions: any = {
      ArrowLeft: () => {
        spritesConfig.spaceShip.x - step > -15 && (spritesConfig.spaceShip.x -= step);
        spritesConfig.spaceShip.imageType = 'left';
      },
      ArrowRight: () => {
        spritesConfig.spaceShip.x + step < cvs.dims.width - 50 &&
          (spritesConfig.spaceShip.x += step);
        spritesConfig.spaceShip.imageType = 'right';
      },
      ArrowUp: () => {
        spritesConfig.spaceShip.y - step > -15 && (spritesConfig.spaceShip.y -= step);
        spritesConfig.spaceShip.imageType = 'forward';
      },
      ArrowDown: () => {
        spritesConfig.spaceShip.y + step < cvs.dims.height - 75 &&
          (spritesConfig.spaceShip.y += step);
        spritesConfig.spaceShip.imageType = 'forward';
      },
    };
    actions.hasOwnProperty(e.key) && actions[e.key]();
  });

  return setInterval(() => {
    cvs.ctx.clearRect(0, 0, cvs.dims.width, cvs.dims.height);
    spaceShip({ ...cvs, ...spritesConfig.spaceShip });
  }, gameSpeed);
}