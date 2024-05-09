import React, { useEffect, useState } from 'react'

import './App.css'
import Board from './component/Board'
import { BoardData } from './model/boardData'

function App() {

  const [ data, setData ] = useState<BoardData | null>(null)

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

  return (
    <div data-theme="pastel" className="h-screen w-screen bg-base-200">
      <Board width={data.width} height={data.height} items={data.items} />
    </div>
  )
}

export default App
