export default function eventProvider(cb: any) {
  window.addEventListener('keydown', cb);
  window.addEventListener('keyup', cb);
  window.addEventListener('resize', cb);
}
