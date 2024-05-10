import { createContext } from 'react'

import { Item } from './model'

export const SelectedCellContext = createContext<number>(0)
export const SelectedItemContext = createContext<Item | null>(null)
