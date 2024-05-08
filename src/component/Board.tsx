import React from 'react'

type Props = {
  width: number,
  height: number,
}
const Board = ({ width, height }: Props) => {
  return (
    <div>
      { width } x { height }
    </div>
  )
}

export default Board