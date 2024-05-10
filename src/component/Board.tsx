import { DndContext, DragEndEvent } from '@dnd-kit/core'
import React  from 'react'

import { BoardItem, Item } from '../model/boardData'

import BoardCell from './BoardCell'
import DraggableItem from './DraggableItem'

type Props = {
  width: number,
  board: (BoardItem | null)[],
  onSelectCell: (cell: number) => void,
  onMoveDraggable: (itemId: number, cellTo: number) => void,
}
const Board = ({ width, board, onSelectCell, onMoveDraggable }: Props) => {

  const handleDragEnd = (event: DragEndEvent) => {
    const { over, active } = event
    if (over) {
      onMoveDraggable(+active.id, +over.id)
    }
  }

  const createDragable = (id: number, item: Item) => {
    return <DraggableItem id={id} item={item} />
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
