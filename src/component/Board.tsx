import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'

import BoardCell from './BoardCell'
import { Draggable } from './Draggable'

type Props = {
  width: number,
  height: number,
}
const Board = ({ width, height }: Props) => {

  const [items, setItems] = useState(new Array(width * height).fill(null))

  useEffect(() => {
    items[0] = 1

    setItems([...items])
  }, [])

  const moveDraggable = (itemId: number, cellId: number) => {
    const index = items.indexOf(itemId)
    if (index > -1) {
      items[index] = null
    }

    items[cellId] = itemId
    setItems([...items])
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over) {
      moveDraggable(+active.id, +over.id)
    }
  }

  const createDragable = (id: number) => {
    return (
      <Draggable id={id}>
        Drag me
      </Draggable>
    )
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div className={`grid w-fit grid-cols-${width}`}>
        {items.map((itemId, index) => (
          <BoardCell key={index} id={index}>
            { itemId ? createDragable(itemId) : null }
          </BoardCell>
        ))}
      </div>
    </DndContext>
  )
}

export default Board
