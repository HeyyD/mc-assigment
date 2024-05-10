import React, { useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import CellPanel from './component/CellPanel'
import { BoardData, Item, ItemData } from './model'
import { generateId, SelectedCellContext, SelectedItemContext } from './utils'

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

  const [ selectedCell, setSelectedCell ] = useState<number>(0)
  const [ board, setBoard ] = useState<(Item | null)[]>([])
  const [ selectedItem, setSelectedItem ] = useState<Item | null>(null)

  const getSelectedItem = (): Item | null => {
    return board[selectedCell] ?? null
  }

  const initBoardData = (data: BoardData) => {
    const board = new Array(data.width * data.height).fill(null)
    data.items.forEach((item, index) => {
      board[index] = item ? { id: generateId(), data: item } : null
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

  const handleUpdateItem = (id: number, item: ItemData) => {
    const boardItem = board.find(item => item && item.id === id)
    if (boardItem) {
      boardItem.data = item
      setBoard([...board])
    }
  }

  const handleDeleteItem = (id: number) => {
    const confirmed = confirm('Are you sure you want to delete the selected item?')
    if (!confirmed) {
      return
    }

    const cell = board.findIndex(item => item && item.id === id)
    if (cell > -1) {
      board[cell] = null
      setBoard([...board])
    }
  }

  const handleCreateItem = (item: ItemData) => {
    const existingItem = board[selectedCell]
    if (existingItem) {
      throw Error('Tried to create a new item but there is no empty cell available.')
    }

    board[selectedCell] = { id: generateId(), data: item }
    setBoard([...board])
  }

  if (!data) {
    return <div>Loading...</div>
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
