import moment from 'moment'
import { ChangeEvent, FormEvent, MouseEvent, useContext, useState } from 'react'
import ReactDatePicker from 'react-datepicker'

import { ItemData } from '../model'
import { SelectedItemContext } from '../utils'

import LabeledFormElement from './LabeledFormElement'

import 'react-datepicker/dist/react-datepicker.css'

const CREATABLE_ITEMS = [
  'BroomCabinet_01',
  'BroomCabinet_02',
  'BroomCabinet_03',
  'BroomCabinet_04',
  'BroomCabinet_05',
  'BroomCabinet_06',
  'BroomCabinet_07',
  'BroomCabinet_08',
  'BroomCabinet_09',
  'BroomCabinet_10'
]

type FormData = {
  visibility: HTMLInputElement,
  isInsideBubble: HTMLInputElement,
  pausedUntil: HTMLInputElement
}
type Props = {
  onCreateItem: (item: ItemData) => void,
  onUpdateItem: (itemId: number, item: ItemData) => void,
  onDeleteItem: (itemId: number) => void
}
const CellPanel = ({ onCreateItem, onUpdateItem, onDeleteItem }: Props) => {

  const item = useContext(SelectedItemContext)
  const data = item?.data

  const initPausedUntil = () => {
    if (!data) {
      return null
    }
    return data.pausedUntil ? new Date(data.pausedUntil) : null
  }

  const [ pausedUntil, setPausedUntil ] = useState<Date | null>(() => initPausedUntil())

  const handleDelete = (event: MouseEvent) => {
    event.preventDefault()
    if (item) {
      onDeleteItem(item.id)
    }
  }

  const handlePausedUntilChange = (date: Date | null) => {
    setPausedUntil(date)
    if (data) {
      onUpdateItem(item.id, { ...data, pausedUntil: date?.toISOString() ?? null })
    }
  }

  const handleFormChange = (event: FormEvent) => {
    const form = event.currentTarget as unknown as FormData
    if (data) {
      const updatedItem: ItemData = {
        ...data,
        visibility: form.visibility.checked ? 'visible' : 'hidden',
        isInsideBubble: form.isInsideBubble.checked,
        pausedUntil: pausedUntil?.toISOString() ?? null,
      }

      onUpdateItem(item.id, updatedItem)
    }
  }

  const handleCreateItem = (event: ChangeEvent<HTMLSelectElement>) => {
    const value = event.target.value
    if (!value) {
      return
    }
    const [ chainId, itemLevel ] = value.split('_')
    const itemId = 1169 + Number(itemLevel) // Just a mock logic to generate the item ID to have some similar data

    const item: ItemData = {
      itemId: itemId,
      itemType: event.target.value,
      chainId: chainId,
      itemLevel: Number(itemLevel),
      visibility: 'visible',
      isInsideBubble: false,
      createdAt: new Date().toISOString(),
      pausedUntil: null,
    }

    onCreateItem(item)
  }

  const createItemSelector = () => {
    return (
      <LabeledFormElement label="Select an item to create">
        <select className="select select-bordered" defaultValue={''} onChange={handleCreateItem}>
          <option value={''}>NONE</option>
          {CREATABLE_ITEMS.map((item, index) => (
            <option key={index} value={item}>{item}</option>
          ))}
        </select>
      </LabeledFormElement>
    )
  }

  const updateItemForm = () => {
    if (!data) {
      throw Error('Trying to update an item that does not exist.')
    }

    const { itemId, itemType, chainId, itemLevel, visibility, isInsideBubble, createdAt } = data

    return (
      <form onChange={handleFormChange}>
        <div className="grid gap-3 grid-cols-2">
          <LabeledFormElement label="Item ID">
            <input className="input w-full input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemId} />
          </LabeledFormElement>
          <LabeledFormElement label="Item Type">
            <input className="input w-full input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemType} />
          </LabeledFormElement>
          <LabeledFormElement label="Chain ID">
            <input className="input w-full input-bordered input-sm cursor-not-allowed" readOnly defaultValue={chainId} />
          </LabeledFormElement>
          <LabeledFormElement label="Item Level">
            <input className="input w-full input-bordered input-sm cursor-not-allowed" readOnly defaultValue={itemLevel} />
          </LabeledFormElement>
          <LabeledFormElement label="Created At">
            <input className="input w-full input-bordered input-sm cursor-not-allowed" readOnly defaultValue={moment(createdAt).format('YYYY-MM-DD HH:mm:ss')} />
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
        { item ? updateItemForm() : createItemSelector() }
      </div>
    </div>
  )
}

export default CellPanel
