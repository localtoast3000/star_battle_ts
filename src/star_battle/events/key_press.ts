import { KeyActionsConfig } from '../types/events';
import config from '../config';

export function globalKeyPressEvent(actions: KeyActionsConfig) {
  const keyPressTrackingMap = new Map<string, boolean>();

  const handleKeyPress = (e: KeyboardEvent) => {
    keyPressTrackingMap.set(e.code, true);
  };
  const handleKeyUp = () => {
    keyPressTrackingMap.clear();
  };
  const bindKeyToActions = (keyType: string) => {
    actions[keyType]?.forEach(([instance, method]): any[] => instance[method]());
  };

  // Handles diagonal movements
  setInterval(() => {
    if (keyPressTrackingMap.get('Space')) {
      bindKeyToActions('space');
      keyPressTrackingMap.clear();
      return;
    }
    if (keyPressTrackingMap.size > 2) {
      keyPressTrackingMap.clear();
      return;
    } else if (keyPressTrackingMap.size > 1) {
      if (keyPressTrackingMap.get('ArrowUp') && keyPressTrackingMap.get('ArrowLeft')) {
        bindKeyToActions('upLeft');
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown') && keyPressTrackingMap.get('ArrowLeft')) {
        bindKeyToActions('downLeft');
        return;
      }
      if (keyPressTrackingMap.get('ArrowUp') && keyPressTrackingMap.get('ArrowRight')) {
        bindKeyToActions('upRight');
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown') && keyPressTrackingMap.get('ArrowRight')) {
        bindKeyToActions('downRight');
        return;
      }
    } else {
      if (keyPressTrackingMap.get('ArrowLeft')) {
        bindKeyToActions('left');
        return;
      }
      if (keyPressTrackingMap.get('ArrowRight')) {
        bindKeyToActions('right');
        return;
      }
      if (keyPressTrackingMap.get('ArrowUp')) {
        bindKeyToActions('up');
        return;
      }
      if (keyPressTrackingMap.get('ArrowDown')) {
        bindKeyToActions('down');
        return;
      }
    }
  }, config.speed);
}
