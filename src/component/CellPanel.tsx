import React, { useContext } from 'react'

import { SelectedCell } from '../App'

const CellPanel = () => {

  const cell = useContext(SelectedCell)

  return (
    <div className="card w-96 bg-base-100 shadow-xl">
      <div className="card-body">
        <h2 className="card-title"></h2>
        <p>{ cell ? cell : 'Select a cell or drag and drop items to rearrange them.'}</p>
      </div>
    </div>
  )
}

export default CellPanel
