
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

import { Item } from '../model/boardData'

type Props = {
  id: string,
  item: Item
}
export function Draggable({ id, item }: Props) {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} className="border cursor-grab text-xs active:cursor-grabbing" {...listeners} {...attributes}>
      { item.itemId }
    </div>
  )
}
