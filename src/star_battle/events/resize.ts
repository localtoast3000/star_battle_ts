export function globalResizeEvent(actions: Function[]) {
  window.addEventListener('resize', (e) => {
    actions.forEach((func) => func());
  });
}
