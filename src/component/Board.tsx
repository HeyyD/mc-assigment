import { DndContext } from '@dnd-kit/core'
import React from 'react'

import { Droppable } from './Droppable'

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
          <Droppable key={index} id={String(index)}>
            {index}
          </Droppable>
        ))}
      </div>
    </DndContext>
  )
}

export default Board
