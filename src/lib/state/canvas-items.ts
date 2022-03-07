import { atom, DefaultValue, selectorFamily } from 'recoil';

import { BoundingBox, CanvasItem, Color } from '../domain/canvas-items';

export const itemsState = atom<CanvasItem[]>({
  key: 'shapes',
  default: [],
});

export const itemState = selectorFamily<CanvasItem, string>({
  key: 'shape',
  get:
    (id) =>
    ({ get }) => {
      const shapes = get(itemsState);
      return shapes.find((shape) => shape.id === id);
    },
  set:
    (id) =>
    ({ set }, value) => {
      if (!(value instanceof DefaultValue)) {
        set(itemsState, (items) =>
          items.map((item) => (item.id === id ? value : item))
        );
      }
    },
});

export const itemBoundingBoxState = selectorFamily<BoundingBox, string>({
  key: 'shapeBoundingBox',
  get:
    (id) =>
    ({ get }) => {
      const shape = get(itemState(id));
      return shape.bounds;
    },
  set:
    (id) =>
    ({ set }, bounds) => {
      if (!(bounds instanceof DefaultValue)) {
        set(itemState(id), (item) => ({ ...item, bounds }));
      }
    },
});

export const itemColorState = selectorFamily<Color, string>({
  key: 'shapeColor',
  get:
    (id) =>
    ({ get }) => {
      const shape = get(itemState(id));
      return shape.color;
    },
  set:
    (id) =>
    ({ set }, color) => {
      if (color instanceof DefaultValue) {
        set(itemState(id), (item) => ({ ...item, color: 0xff0000 }));
      } else {
        set(itemState(id), (item) => ({ ...item, color }));
      }
    },
});
