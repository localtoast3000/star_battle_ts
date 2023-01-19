export interface SpriteInterface {
  [key: string]: Function;
}

export interface SpriteSheetInterface {
  [key: string]: { x: number; y: number };
}

export interface SpaceShipState {
  x: number;
  y: number;
  imageType: string;
}
export interface SpaceState {
  x: number;
  y: number;
}
