import React, { useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData, Item } from './model/boardData'

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number | null>(null)
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
    <div data-theme="pastel" className="h-screen w-screen bg-base-200">
      <div className="flex">
        <div>
          <Board width={data.width} height={data.height} items={items} onSelectCell={handleSelectCell} onUpdateBoard={handleUpdateBoard} />
        </div>
        <div className="p-3">
          <CellPanel item={selectedCell !== null ? items[selectedCell] : null} />
        </div>
      </div>
    </div>
  )
}

export default App
