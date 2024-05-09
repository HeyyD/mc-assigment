
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

type Props = {
  id: number
  children: React.ReactNode
}
const BoardCell = ({ id, children }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={`h-20 w-20 text-center border-2 hover:border-secondary ${isOver ? 'bg-accent' : 'odd:bg-primary'}`}>
      { children }
    </div>
  )
}

export default BoardCell
