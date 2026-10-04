<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import ImageUpload from '@/components/ImageUpload.vue'
import OrganizerService from '@/services/OrganizerService'
import { useMessageStore } from '@/stores/message'
import type { Organizer } from '@/types'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useMessageStore()
const router = useRouter()

const organizer = ref<Organizer>({
    id: null,
    name: '',
    address: '',
    images: [],
})
const saveOrganizer = () => {
  OrganizerService.saveOrganizer(organizer.value)
    .then((response) => {
      store.updateMessage('Successfully created organizer ' + organizer.value.name)
      setTimeout(() => {
        store.resetMessage()
      }, 3000)
      router.push({ name: 'organizer-detail-view', params: { id: response.data.id } })
    })
    .catch((error) => {
      console.error('Save organizer failed:', error)
    })
}
</script>

<template>
  <div>
    <h1>Create an Organizer</h1>
    <form @submit.prevent="saveOrganizer" class="flex flex-col items-center">
      <BaseInput v-model="organizer.name" type="text" label="Name" />
      <BaseInput v-model="organizer.address" type="text" label="Address" />

      <h3>Organizer Image</h3>
      <ImageUpload v-model="organizer.images" />

      <button
        class="mt-4 flex w-fit mx-auto items-center justify-center h-12 px-8 rounded-md font-semibold border border-gray-400 hover:border-emerald-500 hover:scale-105 transition-all"
        type="submit"
      >
        Submit
      </button>
    </form>
  </div>
</template>