import { CanvasProps } from './types';

export default function Canvas({ id, type, width, height }: CanvasProps) {
  const canvas = document.createElement('canvas');
  canvas.setAttribute('id', id);
  canvas.width = width;
  canvas.height = height;
  return { ctx: canvas.getContext(type), width: canvas.width, height: canvas.height };
}
