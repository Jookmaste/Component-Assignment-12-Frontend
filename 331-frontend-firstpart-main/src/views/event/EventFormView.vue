<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import BaseSelect from '@/components/BaseSelect.vue';
import EventService from '@/services/EventService';
import OrganizerService from '@/services/OrganizerService';
import ImageUpload from '@/components/ImageUpload.vue'
import { useMessageStore } from '@/stores/message';
import type { Event, Organizer } from '@/types';
import { onMounted, ref } from 'vue';
import { useRouter } from 'vue-router';

const store = useMessageStore()
const event = ref<Event>({
    id: null,
    category: '',
    title: '',
    description: '',
    location: '',
    date: '',
    time: '',
    petsAllowed: false,
    organizer: {
        id: null,
        name: '',
        address: ''
    },
    images: []
})
const router = useRouter()

const organizers = ref<Organizer[]>([]);
onMounted(() => {
    OrganizerService.getOrganizers()
        .then(res => {
            organizers.value = res.data
        })
        .catch(() => {
            router.push({ name: 'network-error-view' })
        })
})

const saveEvent = () => {
    if (event.value.organizer && event.value.organizer.id) {
        event.value.organizer.id = Number(event.value.organizer.id);
    }

    EventService.saveEvent(event.value)
        .then(res => {
            router.push({ name: 'event-detail-view', params: { id: res.data.id } })
            store.updateMessage('You are successfully add a new event for ' + res.data.title)
            setTimeout(() => {
                store.resetMessage()
            }, 3000)
        })
        .catch((error) => {
            console.error('Save event failed:', error)
            router.push({ name: 'network-error-view' })
        })
}
</script>

<template>
    <div>
        <h1>Create an event</h1>
        <form @submit.prevent="saveEvent" class="flex flex-col items-center">
            <BaseInput v-model="event.category" type="text" label="Category" />
            <h3>Name & describe your event</h3>
            <BaseInput v-model="event.title" type="text" label="Title" />
            <BaseInput v-model="event.description" type="text" label="Description" />
            <h3>Where is your event?</h3>
            <BaseInput v-model="event.location" type="text" label="Location" />
            <h3>Who is your organizer?</h3>
            <label class="block text-gray-500 font-bold">Select an Organizer</label>
            <BaseSelect v-model="event.organizer.id" :options="organizers" label="Organizer" />
            
            <h3>The image of the Event</h3>
            <ImageUpload v-model="event.images" />

            <button
                class="flex w-fit mx-auto items-center justify-center h-13 px-10 rounded-md font-semibold whitespace-nowrap border border-gray-400 focus:border-emerald-500 transition-all duration-200 ease-linear hover:scale-105 hover:border-emerald-500 hover:shadow-lg active:scale-100 focus:outline-none"
                type="submit">Submit</button>
        </form>
        <pre>{{ event }}</pre>
    </div>
</template>