import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React, { useEffect, useState } from 'react'

import BoardCell from './BoardCell'
import { Draggable } from './Draggable'

type Props = {
  width: number,
  height: number,
}
const Board = ({ width, height }: Props) => {

  const [elements, setElements] = useState(new Array(width * height).fill(null))

  useEffect(() => {
    elements[0] = 1

    setElements([...elements])
  }, [])

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event

    if (over) {
      const index = elements.indexOf(+active.id)
      if (index > -1) {
        elements[index] = null
      }

      elements[+over.id] = +active.id
      setElements([...elements])
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
        {elements.map((e, index) => (
          <BoardCell key={index} id={index}>
            { e ? createDragable(e) : null }
          </BoardCell>
        ))}
      </div>
    </DndContext>
  )
}

export default Board
