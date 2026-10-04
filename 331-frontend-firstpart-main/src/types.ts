export interface Event {
  id: number | null
  category: string
  title: string
  description: string
  location: string
  date: string
  time: string
  petsAllowed: boolean
  organizer: Organizer
  images: string[]
}

export interface Organizer {
  id: number | null
  name: string
  address?: string
  images?: string[]
}

export interface Student {
  id: number
  studentId: string
  name: string
  surname: string
  gpa: number
  image: string
  penAmount: number
  description: string
}

export interface MessageState {
  message: string
}

export interface EventState {
  event: Event | null
}

export interface Bid {
  id: number
  amount: number
  datetime: string
}

export interface AuctionItem {
  id: number
  description: string
  type: string
  bids: Bid[]
  successfulBid?: Bid
}