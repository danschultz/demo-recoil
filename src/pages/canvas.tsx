import React from 'react';

import { Canvas } from '../components/Canvas';
import { Panel } from '../components/Panel';
import { PanelSection } from '../components/PanelSection';
import { FullViewport } from '../layouts/FullViewport';
import { useCanvasItemActions } from '../lib/actions/canvas-items';

export default function CanvasPage(): JSX.Element {
  const itemActions = useCanvasItemActions();

  return (
    <FullViewport>
      <div className="w-full h-full flex">
        <Panel className="w-80" side="left">
          <PanelSection header="Add Item">
            <div>
              <button onClick={() => itemActions.addItem('rectangle')}>
                Add Rectangle
              </button>
            </div>
            <div>
              <button onClick={() => itemActions.addItem('circle')}>
                Add Circle
              </button>
            </div>
          </PanelSection>
        </Panel>
        <Canvas />
      </div>
    </FullViewport>
  );
}
