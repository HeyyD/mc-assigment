
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import React from 'react'

import { Item } from '../model/boardData'

type Props = {
  id: number,
  item: Item
}
const DraggableItem = ({ id, item }: Props) => {
  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} className="border h-full cursor-grab text-xs active:cursor-grabbing" {...listeners} {...attributes}>
      <div className="avatar h-full w-full">
        <div className={`${item.isInsideBubble ? 'rounded-full ring ring-neutral ring-inset ring-offset-2' : ''} ${ item.visibility === 'hidden' ? 'text-secondary bg-gray-950/50' : 'text-primary-content'}`}>
          <div className="flex h-full w-full justify-center text-center">
            <div className="p-2 w-full break-words my-auto">
              <div>{ item.chainId.replace(/_/g, ' ').replace(/([a-z])([A-Z])/g, '$1 $2') }</div>
              <div className="badge badge-secondary badge-sm mt-1">{ item.itemLevel }</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default DraggableItem
