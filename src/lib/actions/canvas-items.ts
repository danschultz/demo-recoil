import { useRecoilCallback } from 'recoil';

import {
  BoundingBox,
  CanvasItem,
  makeItem,
  Shape,
} from '../domain/canvas-items';
import { itemBoundingBoxState, itemsState } from '../state/canvas-items';
import { selectedItemIdState } from '../state/selection';
import { useSelection } from './selection';

interface UseCanvasItemActions {
  addItem(shape: Shape): void;
  removeItem(id: string): void;
  removeSelectedItem(): void;
  setItemBounds(item: CanvasItem, bounds: BoundingBox): void;
}

export function useCanvasItemActions(): UseCanvasItemActions {
  const selection = useSelection();

  const removeItem = useRecoilCallback(({ set, snapshot }) => async (id) => {
    set(itemsState, (items) => items.filter((item) => item.id !== id));

    const selectedItemId = await snapshot.getPromise(selectedItemIdState);
    if (id === selectedItemId) {
      selection.clear();
    }
  });

  return {
    addItem: useRecoilCallback(({ set }) => (shape) => {
      const item = makeItem(shape);
      set(itemsState, (items) => [...items, item]);
      selection.select(item.id);
    }),

    removeItem,

    removeSelectedItem: useRecoilCallback(({ snapshot }) => async () => {
      const selectedItemId = await snapshot.getPromise(selectedItemIdState);
      if (selectedItemId != null) {
        removeItem(selectedItemId);
      }
    }),

    setItemBounds: useRecoilCallback(({ set }) => (item, bounds) => {
      set(itemBoundingBoxState(item.id), bounds);
    }),
  };
}
