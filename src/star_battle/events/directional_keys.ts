import { ActionsConfig } from './types';

export function globalDirectionalKeyPressEvent(actions: ActionsConfig) {
  const keyPressMap: any = new Map();

  window.addEventListener('keydown', (e) => {
    const actionsMap: any = {
      ArrowLeft: () => actions?.left.forEach((func) => func()),
      ArrowRight: () => actions?.right.forEach((func) => func()),
      ArrowUp: () => actions?.up.forEach((func) => func()),
      ArrowDown: () => actions?.down.forEach((func) => func()),
      DiagonalUpLeft: () => actions?.upLeft.forEach((func) => func()),
      DiagonalDownLeft: () => actions?.downLeft.forEach((func) => func()),
      DiagonalUpRight: () => actions?.upRight.forEach((func) => func()),
      DiagonalDownRight: () => actions?.downRigt.forEach((func) => func()),
    };
    keyPressMap.set(e.key, true);
    if (keyPressMap.size > 1) {
      if (keyPressMap.get('ArrowLeft') && keyPressMap.get('ArrowUp'))
        actionsMap.DiagonalUpLeft();
    }
    actionsMap.hasOwnProperty(e.key) && actionsMap[e.key]();
  });
}
