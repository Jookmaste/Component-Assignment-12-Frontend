<script setup lang="ts">
import { ref, watch } from 'vue'
import type { Organizer } from '@/types'
import OrganizerService from '@/services/OrganizerService'

const props = defineProps<{
  organizer?: Organizer // กำหนดให้ใส่หรือไม่ใส่ก็ได้ เพื่อความปลอดภัย
}>()

const imageUrls = ref<string[]>([])

watch(
  () => props.organizer,
  (newOrganizer) => {
    if (newOrganizer && newOrganizer.images && newOrganizer.images.length > 0) {
      OrganizerService.getOrganizerImages(newOrganizer.images).then((urls) => {
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
  <!-- ป้องกัน Error ด้วย v-if เช็คว่ามีข้อมูล organizer หรือยัง -->
  <div v-if="organizer" class="flex flex-col items-center">
    <h2>{{ organizer.name }}</h2>
    <p>{{ organizer.address }}</p>

    <div v-if="imageUrls.length > 0" class="mt-4">
      <img
        v-for="url in imageUrls"
        :key="url"
        :src="url"
        alt="Organizer Image"
        class="w-48 h-48 object-cover rounded-lg border-2 border-gray-200 shadow-md"
      />
    </div>
  </div>
  <div v-else class="text-center p-4">
    <p>Loading organizer data...</p>
  </div>
</template>