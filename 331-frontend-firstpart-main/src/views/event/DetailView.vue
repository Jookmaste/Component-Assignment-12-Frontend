<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Event } from '@/types'
import EventService from '@/services/EventService'

const props = defineProps<{
  event: Event
  id?: string | number
}>()

const imageUrls = ref<string[]>([])

watch(
  () => props.event,
  (newEvent) => {
    if (newEvent && newEvent.images && newEvent.images.length > 0) {
      EventService.getEventImages(newEvent.images).then((urls) => {
        imageUrls.value = urls
      })
    } else {
      imageUrls.value = []
    }
  },
  { immediate: true },
)
</script>

<template>
  <div>
    <p>{{ event.time }} on {{ event.date }} @ {{ event.location }}</p>
    <p>{{ event.description }}</p>

    <div class="flex flex-row flex-wrap justify-center">
      <img
        v-for="image in imageUrls"
        :key="image"
        :src="image"
        alt="events image"
        class="border-solid border-gray-200 border-2 rounded p-1 m-1 w-40 hover:shadow-lg"
      />
    </div>
  </div>
</template>