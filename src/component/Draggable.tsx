
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

type Props = {
  id: number
  children: React.ReactNode
}
export function Draggable({ id, children }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <button ref={setNodeRef} style={style} className="border cursor-grab active:cursor-grabbing" {...listeners} {...attributes}>
      { children }
    </button>
  )
}
