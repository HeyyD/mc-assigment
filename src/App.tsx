import React, { createContext, useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData, Item } from './model/boardData'

export const SelectedCellContext = createContext<number>(0)

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number>(0)
  const [ items, setItems ] = useState<Item[]>([])

  useEffect(() => {
    fetch('/assigment.json')
      .then((response) => response.json())
      .then((data) => {
        setData(data)
        setItems(data.items)
      })
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleSelectCell = (cell: number) => {
    setSelectedCell(cell)
  }

  const handleUpdateBoard = (items: Item[]) => {
    setItems([...items])
  }

  return (
    <SelectedCellContext.Provider value={selectedCell}>
      <div data-theme="pastel" className="h-screen w-screen bg-base-200">
        <div className="flex">
          <div>
            <Board width={data.width} height={data.height} items={items} onSelectCell={handleSelectCell} onUpdateBoard={handleUpdateBoard} />
          </div>
          <div className="p-3">
            <CellPanel item={items[selectedCell]} />
          </div>
        </div>
      </div>
    </SelectedCellContext.Provider>
  )
}

export default App
