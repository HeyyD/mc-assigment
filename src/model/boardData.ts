export interface BoardData {
  width: number
  height: number
  items: Item[]
}

export interface Item {
  itemId: number,
  itemType: string,
  chainId: string,
  pausedUntil: Date,
  createdAt: Date,
  visibility: 'hidden' | 'visible',
  itemLevel: number,
  isInsideBubble: boolean,
}
