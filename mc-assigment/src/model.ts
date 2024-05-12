export interface BoardData {
  width: number
  height: number
  items: ItemData[]
}

export interface ItemData {
  itemId: number,
  itemType: string,
  chainId: string,
  pausedUntil: string | null,
  createdAt: string,
  visibility: 'hidden' | 'visible',
  itemLevel: number,
  isInsideBubble: boolean,
}

export interface Item {
  id: number
  data: ItemData
}
