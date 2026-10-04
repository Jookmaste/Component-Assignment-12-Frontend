import type { Organizer } from '@/types'
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
  getOrganizers() {
    return apiClient.get('/organizers')
  },
  getOrganizer(id: number) {
    return apiClient.get<Organizer>('/organizers/' + id)
  },
  saveOrganizer(organizer: Organizer) {
    return apiClient.post('/organizers', organizer)
  },
  getOrganizerImages(images: string[]) {
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