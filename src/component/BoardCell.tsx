
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

type Props = {
  id: string
  children: React.ReactNode
}
const BoardCell = ({ id, children }: Props) => {
  const { isOver, setNodeRef } = useDroppable({ id })

  return (
    <div ref={setNodeRef} className={`h-20 w-20 border text-center odd:bg-primary ${isOver ? 'bg-accent odd:bg-accent' : ''}`}>
      { children }
    </div>
  )
}

export default BoardCell
