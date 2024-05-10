import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React, { useState } from 'react'

import { BoardItem, Item } from '../model/boardData'

import BoardCell from './BoardCell'
import Draggable from './Draggable'

type Props = {
  width: number,
  items: (BoardItem | null)[],
  onSelectCell: (cell: number) => void,
  onUpdateBoard: (items: (BoardItem | null)[]) => void
}
const Board = ({ width, items, onSelectCell, onUpdateBoard }: Props) => {

  const [board, setBoard] = useState(items)

  const moveDraggable = (itemId: number, cellTo: number) => {
    const cellFrom = board.findIndex(item => item && item.id === itemId)
    const item = board[cellFrom]
    const overlappingItem = board[cellTo]

    if (cellFrom > -1) {
      board[cellFrom] = overlappingItem ? overlappingItem : null
    }

    board[cellTo] = item

    setBoard([...board])
    onSelectCell(cellTo)
    onUpdateBoard(board)
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over) {
      moveDraggable(+active.id, +over.id)
    }
  }

  const createDragable = (id: number, item: Item) => {
    return <Draggable id={id} item={item} />
  }

  return (
    <DndContext onDragEnd={handleDragEnd}>
      <div style={{ gridTemplateColumns: `repeat(${width}, minmax(0, 1fr))` }} className="grid w-fit">
        {board.map((item, index) => (
          <div onClick={() => onSelectCell(index)} key={index}>
            <BoardCell id={index}>
              { item ? createDragable(item.id, item.item) : null }
            </BoardCell>
          </div>
        ))}
      </div>
    </DndContext>
  )
}

export default Board
