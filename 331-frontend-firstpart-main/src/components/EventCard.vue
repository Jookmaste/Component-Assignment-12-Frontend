<script setup lang="ts">
import type { Event } from '@/types.ts';
import EventDetail from './EventDetail.vue';

defineProps<{
  event: Event
}>();

</script>

<template>
  <RouterLink class="flex items-center gap-x-5 decoration-0 text-[#2c3e50]"
    :to="{ name: 'event-detail-view', params: { id: event.id } }">
    <div class="hover:scale-101 hover:shadow-sp p-5 w-62.5 cursor-pointer border border-gray-600 mb-[18px]">
      <h2>{{ event.title }}</h2>
      <span>by</span>
      <h5>{{ event.organizer.name }}</h5>
      <span>@{{ event.time }} @ {{ event.location }}</span>
    </div>
    <EventDetail :event="event" />
  </RouterLink>
</template>
