export default function eventProvider(cb: any) {
  const windowEvents = ['keydown', 'keyup', 'resize'];
  windowEvents.forEach((event) => window.addEventListener(event, cb));
  return {
    removeEvents: () =>
      windowEvents.forEach((event) => window.removeEventListener(event, cb)),
  };
}
