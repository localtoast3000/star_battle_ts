import { ActionsConfig, KeyBindingsInterface } from '../types/events';
import config from '../config';

export function globalDirectionalKeyPressEvent(actions: ActionsConfig) {
  const keyPressTrackingMap = new Map<string, boolean>();
  const keyBindings: KeyBindingsInterface = {
    ArrowLeft: () => actions?.left.forEach((func) => func()),
    ArrowRight: () => actions?.right.forEach((func) => func()),
    ArrowUp: () => actions?.up.forEach((func) => func()),
    ArrowDown: () => actions?.down.forEach((func) => func()),
    DiagonalUpLeft: () => actions?.upLeft.forEach((func) => func()),
    DiagonalDownLeft: () => actions?.downLeft.forEach((func) => func()),
    DiagonalUpRight: () => actions?.upRight.forEach((func) => func()),
    DiagonalDownRight: () => actions?.downRight.forEach((func) => func()),
  };

  window.addEventListener('keydown', (e) => {
    keyPressTrackingMap.set(e.key, true);
  });
  window.addEventListener('keyup', () => {
    keyPressTrackingMap.clear();
  });

  // Handles diagonal movements
  setInterval(() => {
    if (keyPressTrackingMap.size > 2) {
      keyPressTrackingMap.clear();
      return;
    } else if (keyPressTrackingMap.size > 1) {
      if (keyPressTrackingMap.get('ArrowUp') && keyPressTrackingMap.get('ArrowLeft')) {
        keyBindings.DiagonalUpLeft();
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown') && keyPressTrackingMap.get('ArrowLeft')) {
        keyBindings.DiagonalDownLeft();
        return;
      }
      if (keyPressTrackingMap.get('ArrowUp') && keyPressTrackingMap.get('ArrowRight')) {
        keyBindings.DiagonalUpRight();
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown') && keyPressTrackingMap.get('ArrowRight')) {
        keyBindings.DiagonalDownRight();
        return;
      }
    } else {
      if (keyPressTrackingMap.get('ArrowLeft')) {
        keyBindings.ArrowLeft();
        return;
      }
      if (keyPressTrackingMap.get('ArrowRight')) {
        keyBindings.ArrowRight();
        return;
      }
      if (keyPressTrackingMap.get('ArrowUp')) {
        keyBindings.ArrowUp();
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown')) {
        keyBindings.ArrowDown();
        return;
      }
    }
  }, config.speed);
}
