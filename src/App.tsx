import React, { createContext, useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData, BoardItem } from './model/boardData'

export const SelectedCellContext = createContext<number>(0)

let CURRENT_ID = 1
const generateId = () => {
  return CURRENT_ID++
}

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number>(0)
  const [ board, setBoard ] = useState<(BoardItem | null)[]>([])

  useEffect(() => {
    fetch('/assigment.json')
      .then((response) => response.json())
      .then((data: BoardData) => {
        setData(data)
        const board = new Array(data.width * data.height).fill(null)
        data.items.forEach((item, index) => {
          board[index] = item ? { id: generateId(), item } : null
        })
        setBoard(board)
      })
  }, [])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleSelectCell = (cell: number) => {
    setSelectedCell(cell)
  }

  const handleUpdateBoard = (items: (BoardItem | null)[]) => {
    setBoard([...items])
  }

  return (
    <SelectedCellContext.Provider value={selectedCell}>
      <div data-theme="pastel" className="h-screen w-screen bg-base-200">
        <div className="flex">
          <div>
            <Board width={data.width} items={board} onSelectCell={handleSelectCell} onUpdateBoard={handleUpdateBoard} />
          </div>
          <div className="p-3">
            <CellPanel key={board[selectedCell]?.id ?? null} item={board[selectedCell]?.item ?? null}/>
          </div>
        </div>
      </div>
    </SelectedCellContext.Provider>
  )
}

export default App
