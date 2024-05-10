import React, { createContext, useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData, BoardItem, Item } from './model/boardData'

export const SelectedCellContext = createContext<number>(0)
export const SelectedItemContext = createContext<BoardItem | null>(null)

let CURRENT_ID = 1
const generateId = () => {
  return CURRENT_ID++
}

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number>(0)
  const [ board, setBoard ] = useState<(BoardItem | null)[]>([])
  const [ selectedItem, setSelectedItem ] = useState<BoardItem | null>(null)

  const getSelectedItem = (): BoardItem | null => {
    return board[selectedCell] ?? null
  }

  const initBoardData = (data: BoardData) => {
    const board = new Array(data.width * data.height).fill(null)
    data.items.forEach((item, index) => {
      board[index] = item ? { id: generateId(), item } : null
    })

    setData(data)
    setBoard(board)
    setSelectedItem(getSelectedItem())
  }

  useEffect(() => {
    fetch('/assigment.json')
      .then((response) => response.json())
      .then(initBoardData)
  }, [])

  useEffect(() => setSelectedItem(getSelectedItem()), [selectedCell, board])

  if (!data) {
    return <div>Loading...</div>
  }

  const handleMoveDraggable = (itemId: number, cellTo: number) => {
    const cellFrom = board.findIndex(item => item && item.id === itemId)
    const item = board[cellFrom]
    const overlappingItem = board[cellTo]

    if (cellFrom > -1) {
      board[cellFrom] = overlappingItem ? overlappingItem : null
    }

    board[cellTo] = item

    setBoard([...board])
    setSelectedCell(cellTo)
  }

  const handleSelectCell = (cell: number) => {
    setSelectedCell(cell)
  }

  const handleUpdateItem = (itemId: number, item: Item) => {
    const boardItem = board.find(item => item && item.id === itemId)
    if (boardItem) {
      boardItem.item = item
      setBoard([...board])
    }
  }

  const handleDeleteItem = (itemId: number) => {
    const cell = board.findIndex(item => item && item.id === itemId)
    if (cell > -1) {
      board[cell] = null
      setBoard([...board])
    }
  }

  const handleCreateItem = (item: Item) => {
    const existingItem = board[selectedCell]
    if (existingItem) {
      throw Error('Tried to create a new item but there is no empty cell available.')
    }

    board[selectedCell] = { id: generateId(), item }
    setBoard([...board])
  }

  return (
    <SelectedCellContext.Provider value={selectedCell}>
      <SelectedItemContext.Provider value={selectedItem}>
        <div data-theme="pastel" className="h-screen w-screen bg-base-200">
          <div className="flex">
            <div>
              <Board
                width={data.width}
                board={board}
                onSelectCell={handleSelectCell}
                onMoveDraggable={handleMoveDraggable}
              />
            </div>
            <div className="p-3 grow max-w-[675px]">
              <CellPanel
                key={selectedItem?.id}
                onCreateItem={handleCreateItem}
                onUpdateItem={handleUpdateItem}
                onDeleteItem={handleDeleteItem}
              />
            </div>
          </div>
        </div>
      </SelectedItemContext.Provider>
    </SelectedCellContext.Provider>
  )
}

export default App
