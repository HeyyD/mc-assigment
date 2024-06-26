
import { useDraggable } from '@dnd-kit/core'
import { CSS } from '@dnd-kit/utilities'
import { useContext } from 'react'

import { ItemData } from '../model'
import { SelectedItemContext } from '../utils'

type Props = {
  id: number,
  item: ItemData
}
const DraggableItem = ({ id, item }: Props) => {

  const selectedItem = useContext(SelectedItemContext)

  const { attributes, listeners, setNodeRef, transform } = useDraggable({ id })

  const isInChain = () => {
    if (!selectedItem) {
      return false
    }

    if (selectedItem.id === id) {
      return false
    }

    return selectedItem.data.chainId === item.chainId
  }

  const style = {
    // Outputs `translate3d(x, y, 0)`
    transform: CSS.Translate.toString(transform),
  }

  return (
    <div ref={setNodeRef} style={style} className={`border h-full cursor-grab text-xs active:cursor-grabbing ${ isInChain() && 'bg-accent'}`} {...listeners} {...attributes}>
      <div className="avatar h-full w-full">
        <div className={`${item.isInsideBubble && 'rounded-full ring ring-neutral ring-inset ring-offset-2'} ${ item.visibility === 'hidden' ? 'text-secondary bg-gray-950/50' : 'text-primary-content'}`}>
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
