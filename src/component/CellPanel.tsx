import moment from 'moment'
import React, { useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { BoardItem } from '../model/boardData'

import LabeledFormElement from './LabeledFormElement'

import 'react-datepicker/dist/react-datepicker.css'

type Props = {
  item: BoardItem | null
}
const CellPanel = ({ item: boardItem }: Props) => {

  const item = boardItem?.item

  const initPausedUntil = () => {
    if (!item) {
      return null
    }
    return item.pausedUntil ? new Date(item.pausedUntil) : null
  }

  const [ pausedUntil, setPausedUntil ] = useState<Date | null>(() => initPausedUntil())

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
      <form>
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
            <input type="checkbox" className="toggle" defaultChecked={visibility === 'visible'} />
          </LabeledFormElement>
          <LabeledFormElement label="Inside Bubble">
            <input type="checkbox" className="toggle" defaultChecked={isInsideBubble} />
          </LabeledFormElement>
          <LabeledFormElement label="Paused Until">
            <ReactDatePicker
              className="input input-bordered input-sm"
              dateFormat="YYYY-MM-dd HH:mm:ss"
              placeholderText="Select time"
              selected={pausedUntil}
              onChange={setPausedUntil}
              showTimeSelect />
          </LabeledFormElement>
          <div className="divider col-span-2"></div>
          <div className="col-span-2">
            <button className="btn btn-primary">Save</button>
            <button className="btn btn-error mx-3">Delete</button>
          </div>
        </div>
      </form>
    )
  }

  return (
    <div className="card w-full bg-base-100 shadow-xl">
      <div className="card-body">
        { item ? updateItemForm() : addItemForm() }
      </div>
    </div>
  )
}

export default CellPanel
