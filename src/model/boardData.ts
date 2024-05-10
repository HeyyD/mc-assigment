export interface BoardData {
  width: number
  height: number
  items: Item[]
}

export interface Item {
  itemId: number,
  itemType: string,
  chainId: string,
  pausedUntil: string | null,
  createdAt: string,
  visibility: 'hidden' | 'visible',
  itemLevel: number,
  isInsideBubble: boolean,
}
