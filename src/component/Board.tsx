import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React, { useState } from 'react'

import { Item } from '../model/boardData'

import BoardCell from './BoardCell'
import { Draggable } from './Draggable'

type Props = {
  width: number,
  height: number,
  items: Item[]
}
const Board = ({ width, height, items: data }: Props) => {

  const initBoardData = () => {
    const board = new Array(width * height).fill(null)
    data.forEach((item, index) => {
      board[index] = item ? item : null
    })

    return board
  }

  const [items, setItems] = useState(() => initBoardData())

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

  const createDragable = (item: Item) => {
    return <Draggable id={item.itemId} item={item} />
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }} className="grid w-fit">
        {items.map((item, index) => (
          <BoardCell key={index} id={index}>
            { item ? createDragable(item) : null }
          </BoardCell>
        ))}
      </div>
    </DndContext>
  )
}

export default Board
