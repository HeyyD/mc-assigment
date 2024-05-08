
import { useDroppable } from '@dnd-kit/core'
import React from 'react'

type Props = {
  id: string
  children: React.ReactNode
}
export function Droppable(props: Props) {
  const { isOver, setNodeRef } = useDroppable({
    id: props.id,
  })

  return (
    <div ref={setNodeRef} className={`h-20 w-20 border text-center ${isOver ? 'text-primary' : 'text-base-300'}`}>
      {props.children}
    </div>
  )
}
