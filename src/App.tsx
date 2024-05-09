import React, { createContext, useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData } from './model/boardData'

export const SelectedCell = createContext<number | null>(null)

function App() {
  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number | null>(null)

  useEffect(() => {
    fetch('/assigment.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
      })
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleSelectCell = (cell: number) => {
    setSelectedCell(cell)
  }

  return (
    <SelectedCell.Provider value={selectedCell}>
      <div data-theme="pastel" className="h-screen w-screen bg-base-200">
        <div className="flex">
          <div>
            <Board width={data.width} height={data.height} items={data.items} onSelectCell={handleSelectCell} />
          </div>
          <div className="p-3">
            <CellPanel />
          </div>
        </div>
      </div>
    </SelectedCell.Provider>
  )
}

export default App
