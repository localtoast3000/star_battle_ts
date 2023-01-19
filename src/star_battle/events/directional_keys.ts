import { ActionsConfig } from "./types";


export function globalDirectionalKeyPressEvent(actions:ActionsConfig){
  const keyPressMap:any = new Map();

    window.addEventListener('keydown', (e) => {
        const actionsMap: any = {
          ArrowLeft: () => actions?.left.forEach((func) => func()),
          ArrowRight: () => actions?.left.forEach((func) => func()),
          ArrowUp: () => actions?.left.forEach((func) => func()),
          ArrowDown: () => actions?.left.forEach((func) => func()),
          DiagonalUpLeft: () => actions?.left.forEach((func) => func()),
          DiagonalDownLeft: () => actions?.left.forEach((func) => func()),
          DiagonalUpRight: () => actions?.left.forEach((func) => func()),
          DiagonalDownRight: () => actions?.left.forEach((func) => func()),
        };
        keyPressMap.set(e.key, true);
        if (keyPressMap.size > 1) {
          if (keyPressMap.get('ArrowLeft') && keyPressMap.get('ArrowUp'))
            actionsMap.DiagonalUpLeft();
        }
        actions.hasOwnProperty(e.key) && actionsMap[e.key]();
      });
}