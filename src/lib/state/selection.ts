import { atom, DefaultValue, selector } from 'recoil';

import { CanvasItem } from '../domain/canvas-items';
import { itemsState } from './canvas-items';

export const selectedItemIdState = atom<string | undefined>({
  key: 'selectedItemId',
  default: undefined,
});

export const selectedItemState = selector<CanvasItem | undefined>({
  key: 'selectedItem',
  get: ({ get }) => {
    const items = get(itemsState);
    const itemId = get(selectedItemIdState);
    return items.find((item) => item.id === itemId);
  },
  set: ({ set }, value) => {
    if (value instanceof DefaultValue) {
      set(selectedItemIdState, value);
    } else {
      set(selectedItemIdState, value.id);
    }
  },
});
