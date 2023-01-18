import { SpriteProps } from './types/deps';

export default function spaceShip({ ctx, dims, x, y }: SpriteProps) {
  ctx.beginPath();
  ctx.arc(x, y, 10, 0, Math.PI * 2);
  ctx.fillStyle = 'blue';
  ctx.fill();
  ctx.closePath();
}
