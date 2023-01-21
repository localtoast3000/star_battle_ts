export function globalResizeEvent(actions: (Object | string)[][]) {
  window.addEventListener('resize', (e) => {
    Object.values(actions).forEach(([instance, method]: any) => instance[method]());
  });
}
