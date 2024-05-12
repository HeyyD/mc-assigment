import { createContext } from 'react'

import { Item } from './model'

export const SelectedCellContext = createContext<number>(0)
export const SelectedItemContext = createContext<Item | null>(null)

let CURRENT_ID = 1
export const generateId = () => {
  return CURRENT_ID++
}
