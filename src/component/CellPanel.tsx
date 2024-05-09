import React from 'react'

import { Item } from '../model/boardData'

type Props = {
  item: Item | null
}
const CellPanel = ({ item }: Props) => {

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p>{ item ? item.itemType : 'Select a cell or drag and drop items to rearrange them.'}</p>
      </div>
    </div>
  )
}

export default CellPanel
