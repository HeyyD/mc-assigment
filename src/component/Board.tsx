import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React, { useState } from 'react'

import { Item } from '../model/boardData'

import BoardCell from './BoardCell'
import Draggable from './Draggable'

type Props = {
  width: number,
  height: number,
  items: Item[],
  onSelectCell: (cell: number) => void,
  onUpdateBoard: (items: Item[]) => void
}
const Board = ({ width, height, items, onSelectCell, onUpdateBoard }: Props) => {

  const initBoardData = () => {
    const board = new Array(width * height).fill(null)
    items.forEach((item, index) => {
      board[index] = item ? { id: `${item.itemId}-${index}`, item } : null
    })

    return board
  }

  const [board, setBoard] = useState(() => initBoardData())

  const moveDraggable = (itemId: string, cellTo: number) => {
    const cellFrom = board.findIndex(item => item && item.id === itemId)
    const item = board[cellFrom]
    const overlappingItem = board[cellTo]

    if (cellFrom > -1) {
      board[cellFrom] = overlappingItem ? overlappingItem : null
    }

    board[cellTo] = item

    setBoard([...board])
    onSelectCell(cellTo)
    onUpdateBoard(board.map(item => item ? item.item : null))
  }

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over) {
      moveDraggable(String(active.id), +over.id)
    }
  }

  const createDragable = (id: string, item: Item) => {
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
