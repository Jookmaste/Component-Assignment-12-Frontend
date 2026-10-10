import type { Event } from '@/types'
import apiClient from './AxiosClient'

export default {
  getEvents(perPage: number, page: number) {
    return apiClient.get('/events?_limit=' + perPage + '&_page=' + page)
  },
  getEventsByKeyword(keyword: string, perPage: number, page: number) {
    return apiClient.get('/events?title=' + keyword + '&_limit=' + perPage + '&_page=' + page)
  },
  getEvent(id: number) {
    return apiClient.get('/events/' + id)
  },
  saveEvent(event: Event) {
    return apiClient.post('/events', event)
  },
  getEventImages(images: string[]) {
    return Promise.all(
      images.map((image) =>
        apiClient
          .get<string>('/presignedUrl', {
            params: { fileName: image },
            responseType: 'text',
          })
          .then((response) => response.data),
      ),
    )
  },
}
