import type { AuctionItem } from '@/types'
import axios from 'axios'

const apiClient = axios.create({
  baseURL: import.meta.env.VITE_BACKEND_URL,
  withCredentials: false,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
})

export default {
  getAuctionItems(perPage: number, page: number) {
    return apiClient.get('/auction-items?_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItemsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get('/auction-items?description=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItemsByBidLessThan(value: number, perPage: number, page: number) {
    return apiClient.get('/auction-items-by-bid-less-than?value=' + value + '&_limit=' + perPage + '&_page=' + page)
  },
  getAuctionItem(id: number) {
    return apiClient.get('/auction-items/' + id)
  },
  saveAuctionItem(auctionItem: AuctionItem) {
    return apiClient.post('/auction-items', auctionItem)
  },
}