
import { useDroppable } from '@dnd-kit/core'
import React, { useContext } from 'react'

import { SelectedCellContext } from '../App'

type Props = {
  id: number
  children: React.ReactNode
}
const BoardCell = ({ id, children }: Props) => {

  const isSelected = useContext(SelectedCellContext) === id

  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={`h-24 w-24 text-center border-2 hover:border-secondary ${ isOver && 'bg-primary' } ${ isSelected && 'bg-info' }`}>
      { children }
    </div>
  )
}

export default BoardCell
