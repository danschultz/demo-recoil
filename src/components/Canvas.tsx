import { Color } from '@vertexvis/utils';
import React from 'react';
import Moveable, { OnDrag, OnResize } from 'react-moveable';
import { useRecoilValue } from 'recoil';

import { useCanvasItemActions } from '../lib/actions/canvas-items';
import { useSelection } from '../lib/actions/selection';
import { CanvasItem } from '../lib/domain/canvas-items';
import { itemsState } from '../lib/state/canvas-items';
import { selectedItemState } from '../lib/state/selection';

export function Canvas(): JSX.Element {
  const items = useRecoilValue(itemsState);
  const selection = useSelection();

  return (
    <div className="w-full h-full relative" onClick={selection.clear}>
      {items.map((item) => (
        <CanvasItem key={item.id} item={item} />
      ))}
    </div>
  );
}

interface CanvasItemProps {
  item: CanvasItem;
}

function CanvasItem({ item }: CanvasItemProps): JSX.Element {
  const [target, setTarget] = React.useState<HTMLElement>();
  const selection = useSelection();
  const canvasItemActions = useCanvasItemActions();
  const selectedItem = useRecoilValue(selectedItemState);

  React.useEffect(
    () => setTarget(document.getElementById(item.id)),
    [item.id, setTarget]
  );

  const selectItem = React.useCallback(
    (e: React.MouseEvent<HTMLDivElement>) => {
      e.stopPropagation();
      selection.select(item.id);
    },
    [selection, item]
  );

  const dragItem = React.useCallback(
    (e: OnDrag) =>
      canvasItemActions.setItemBounds(item, {
        x: e.left,
        y: e.top,
        width: e.width,
        height: e.height,
      }),
    [canvasItemActions, item]
  );

  const resizeItem = React.useCallback(
    (e: OnResize) =>
      canvasItemActions.setItemBounds(item, {
        x: e.drag.left,
        y: e.drag.top,
        width: e.width,
        height: e.height,
      }),
    [canvasItemActions, item]
  );

  return (
    <>
      <div
        id={item.id}
        className="absolute"
        style={{
          top: `${item.bounds.y}px`,
          left: `${item.bounds.x}px`,
          width: `${item.bounds.width}px`,
          height: `${item.bounds.height}px`,
        }}
        onClick={selectItem}
      >
        {item.shape === 'rectangle' && <RectangleShape item={item} />}
        {item.shape === 'circle' && <CircleShape item={item} />}
      </div>
      {selectedItem === item && (
        <Moveable
          target={target}
          draggable
          resizable
          onDrag={dragItem}
          onResize={resizeItem}
        />
      )}
    </>
  );
}

function RectangleShape({ item }: CanvasItemProps): JSX.Element {
  return (
    <div
      className="absolute w-full h-full"
      style={{
        backgroundColor: Color.toHexString(Color.fromNumber(item.color)),
      }}
    />
  );
}

function CircleShape({ item }: CanvasItemProps): JSX.Element {
  return (
    <div
      className="absolute w-full h-full"
      style={{
        backgroundColor: Color.toHexString(Color.fromNumber(item.color)),
        borderRadius: '50%',
      }}
    />
  );
}
