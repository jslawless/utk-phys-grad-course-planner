import React, {useState} from 'react';
import {DndContext} from '@dnd-kit/core';
import {Draggable} from './dnd/Draggable';
import {Droppable} from './dnd/Droppable';

export function Example() {
  const [parent, setParent] = useState(null);
  const draggable = (
    <Draggable id="draggable">
      Go ahead, drag me.
    </Draggable>
  );

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <Droppable id="droppable">
        {parent === "droppable" ? draggable : 'Drop here'}
      </Droppable>
    </DndContext>
  );

  function handleDragEnd({over} : {over:any}) {
    setParent(over ? over.id : null);
  }
}

