import { DndContext } from '@dnd-kit/core'
import React from 'react'

import BoardCell from './BoardCell'
import { Draggable } from './Draggable'

type Props = {
  width: number,
  height: number,
}
const Board = ({ width, height }: Props) => {

  const elements = [...Array(width * height)].map(() => Array(width).fill(null))

  return (
    <DndContext>
      <div className={`grid w-fit grid-cols-${width}`}>
        {elements.map((e, index) => (
          <BoardCell key={index} id={String(index)}>
            {index}
          </BoardCell>
        ))}
      </div>
      <Draggable id="draggable">
        Drag me
      </Draggable>
    </DndContext>
  )
}

export default Board
