import { ActionsConfig, KeyBindingsInterface } from './types';

export function globalDirectionalKeyPressEvent(actions: ActionsConfig) {
  const keyPressMap = new Map<string, boolean>();
  const keyBindings: KeyBindingsInterface = {
    ArrowLeft: () => actions?.left.forEach((func) => func()),
    ArrowRight: () => actions?.right.forEach((func) => func()),
    ArrowUp: () => actions?.up.forEach((func) => func()),
    ArrowDown: () => actions?.down.forEach((func) => func()),
    DiagonalUpLeft: () => actions?.upLeft.forEach((func) => func()),
    DiagonalDownLeft: () => actions?.downLeft.forEach((func) => func()),
    DiagonalUpRight: () => actions?.upRight.forEach((func) => func()),
    DiagonalDownRight: () => actions?.downRigt.forEach((func) => func()),
  };

  window.addEventListener('keydown', (e) => {
    keyPressMap.set(e.key, true);
    keyBindings.hasOwnProperty(e.key) && keyBindings[e.key]();
  });
  window.addEventListener('keyup', (e) => {
    keyPressMap.clear();
  });

  // Handles diagonal movements
  setInterval(() => {
    if(keyPressMap.size > 2){
      keyPressMap.clear();
      return 
    }
    if(keyPressMap.get('ArrowUp') && keyPressMap.get('ArrowLeft')){
      keyBindings.DiagonalUpLeft()
      return 
    }
    if(keyPressMap.get('ArrowDown') && keyPressMap.get('ArrowLeft')){
      keyBindings.DiagonalDownLeft()
      return 
    }
    if(keyPressMap.get('ArrowUp') && keyPressMap.get('ArrowRight')){
      keyBindings.DiagonalUpRight()
      return 
    }
    if(keyPressMap.get('ArrowDown') && keyPressMap.get('ArrowRight')){
      keyBindings.DiagonalDownRight()
      return 
    }
  }, 0)
}
