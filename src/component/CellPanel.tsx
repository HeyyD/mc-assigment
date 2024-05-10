import moment from 'moment'
import React, { FormEvent, MouseEvent, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { BoardItem, Item } from '../model/boardData'

import LabeledFormElement from './LabeledFormElement'

import 'react-datepicker/dist/react-datepicker.css'

type FormData = {
  visibility: HTMLInputElement,
  isInsideBubble: HTMLInputElement,
  pausedUntil: HTMLInputElement
}
type Props = {
  boardItem: BoardItem | null,
  onUpdateItem: (itemId: number, item: Item) => void,
  onDeleteItem: (itemId: number) => void
}
const CellPanel = ({ boardItem, onUpdateItem, onDeleteItem }: Props) => {

  const item = boardItem?.item

  const initPausedUntil = () => {
    if (!item) {
      return null
    }
    return item.pausedUntil ? new Date(item.pausedUntil) : null
  }

  const [ pausedUntil, setPausedUntil ] = useState<Date | null>(() => initPausedUntil())

  const handleDelete = (event: MouseEvent) => {
    event.preventDefault()
    if (boardItem) {
      onDeleteItem(boardItem.id)
    }
  }

  const handlePausedUntilChange = (date: Date | null) => {
    setPausedUntil(date)
    if (item) {
      onUpdateItem(boardItem.id, { ...item, pausedUntil: date?.toISOString() ?? null })
    }
  }

  const handleFormChange = (event: FormEvent) => {
    const form = event.currentTarget as unknown as FormData
    if (item) {
      const updatedItem: Item = {
        ...item,
        visibility: form.visibility.checked ? 'visible' : 'hidden',
        isInsideBubble: form.isInsideBubble.checked,
        pausedUntil: pausedUntil?.toISOString() ?? null,
      }

      onUpdateItem(boardItem.id, updatedItem)
    }
  }

  const addItemForm = () => {
    return (
      <div>CREATE</div>
    )
  }

  const updateItemForm = () => {
    if (!item) {
      new Error('Trying to update an item that does not exist.')
      return null
    }

    const { itemId, itemType, chainId, itemLevel, visibility, isInsideBubble, createdAt } = item

    return (
      <form onChange={handleFormChange}>
        <div className="grid gap-3 grid-cols-2">
          <LabeledFormElement label="Item ID">
            <input className="input input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemId} />
          </LabeledFormElement>
          <LabeledFormElement label="Item Type">
            <input className="input input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemType} />
          </LabeledFormElement>
          <LabeledFormElement label="Chain ID">
            <input className="input input-bordered input-sm cursor-not-allowed" readOnly defaultValue={chainId} />
          </LabeledFormElement>
          <LabeledFormElement label="Item Level">
            <input className="input input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemLevel} />
          </LabeledFormElement>
          <LabeledFormElement label="Created At">
            <input className="input input-bordered input-sm cursor-not-allowed" readOnly defaultValue={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')} />
          </LabeledFormElement>
          <div className="divider col-span-2"></div>
          <LabeledFormElement label="Visible">
            <input id="visibility" type="checkbox" className="toggle" defaultChecked={visibility === 'visible'} />
          </LabeledFormElement>
          <LabeledFormElement label="Inside Bubble">
            <input id="isInsideBubble" type="checkbox" className="toggle" defaultChecked={isInsideBubble} />
          </LabeledFormElement>
          <LabeledFormElement label="Paused Until">
            <ReactDatePicker
              id="pausedUntil"
              className="input input-bordered input-sm cursor-pointer"
              dateFormat="YYYY-MM-dd HH:mm:ss"
              placeholderText="Select time"
              selected={pausedUntil}
              onChange={handlePausedUntilChange}
              isClearable
              showTimeSelect />
          </LabeledFormElement>
          <div className="divider col-span-2"></div>
          <div className="col-span-2">
            <button className="btn btn-error" onClick={handleDelete}>Delete</button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        { boardItem ? updateItemForm() : addItemForm() }
      </div>
    </div>
  )
}

export default CellPanel
