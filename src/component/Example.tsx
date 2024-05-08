
import { DndContext } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'

import BoardCell from './BoardCell'
import { Draggable } from './Draggable'

function Example() {
  const [parent, setParent] = useState(null)

  const draggable = (
    <Draggable id="draggable">
      Go ahead, drag me.
    </Draggable>
  )

  return (
    <DndContext onDragEnd={handleDragEnd}>
      {!parent ? draggable : null}
      <BoardCell id="droppable">
        {parent === 'droppable' ? draggable : 'Drop here'}
      </BoardCell>
    </DndContext>
  )

  function handleDragEnd({ over }: any) {
    setParent(over ? over.id : null)
  }
}

export default Example
