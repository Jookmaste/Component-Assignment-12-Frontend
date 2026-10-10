<script setup lang="ts">
import Uploader from 'vue-media-upload'
import { ref } from 'vue'
import { computed } from 'vue'
import { useAuthStore } from '@/stores/auth'

const authStore = useAuthStore()
const authorizeHeader = computed(() => {
  return { authorization: authStore.authorizationHeader }
})

interface UploadMedia {
  name: string
  url?: string
  size?: number
  type?: string
}

const modelValue = defineModel<string[]>({
  default: () => [],
})

const convertStringToMedia = (str: string[]): UploadMedia[] => {
  return str.map((element) => {
    return {
      name: element,
    }
  })
}

const convertMediaToString = (media: UploadMedia[]): string[] => {
  const output: string[] = []
  media.forEach((element) => {
    output.push(element.name)
  })
  return output
}

const media = ref<UploadMedia[]>(convertStringToMedia(modelValue.value))
const uploadUrl = ref(import.meta.env.VITE_UPLOAD_URL)
const onChanged = (files: UploadMedia[]): void => {
  modelValue.value = convertMediaToString(files)
}
</script>

<template>
  <Uploader 
    :server="uploadUrl" 
    @change="onChanged" 
    :media="media"
    :headers="authorizeHeader"
  ></Uploader>
</template>