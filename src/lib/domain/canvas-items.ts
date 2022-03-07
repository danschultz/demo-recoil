import { makeUuid } from '../utils/uuid';

export interface BoundingBox {
  x: number;
  y: number;
  width: number;
  height: number;
}

export type Color = number;

export type Shape = 'rectangle' | 'circle';

export interface CanvasItem {
  id: string;
  shape: Shape;
  bounds: BoundingBox;
  color: Color;
}

export function makeItem(shape: Shape): CanvasItem {
  return {
    id: makeUuid(),
    shape,
    bounds: {
      x: Math.random() * 500,
      y: Math.random() * 500,
      width: 100,
      height: 100,
    },
    color: 0xff0000,
  };
}
