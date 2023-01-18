import spaceShip from './sprites/spaceShip';

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
  const pos = {
    spaceShip: { x: cvs.dims.width / 2, y: cvs.dims.height / 2 },
  };

  window.addEventListener('keydown', (e) => {
    const actions: any = {
      ArrowLeft: () => {
        pos.spaceShip.x - step > 0 && (pos.spaceShip.x -= step);
      },
      ArrowRight: () => {
        pos.spaceShip.x + step < cvs.dims.width && (pos.spaceShip.x += step);
      },
      ArrowUp: () => {
        pos.spaceShip.y - step > 0 && (pos.spaceShip.y -= step);
      },
      ArrowDown: () => {
        pos.spaceShip.y + step < cvs.dims.height && (pos.spaceShip.y += step);
      },
    };
    actions.hasOwnProperty(e.key) && actions[e.key]();
  });

  return setInterval(() => {
    cvs.ctx.clearRect(0, 0, cvs.dims.width, cvs.dims.height);
    spaceShip({ ...cvs, x: pos.spaceShip.x, y: pos.spaceShip.y });
  }, gameSpeed);
}
