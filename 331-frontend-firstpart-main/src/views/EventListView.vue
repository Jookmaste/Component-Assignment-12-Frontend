<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import EventCard from '@/components/EventCard.vue';
import router from '@/router';
import EventService from '@/services/EventService';
import type { Event } from '@/types.ts'
import { ref, computed, watchEffect} from 'vue';
const events = ref<Event[] | null>(null);
const keyword = ref('')
const totalEvents = ref(0);

const props = defineProps({
  page: {
    type: Number,
    required: true
  },
  limit: {
    type: Number,
    required: true
  },
  totalPage: {
    type: Number,
    required: true
  }
})
const page = computed(() => props.page)
const perPage = computed(() => props.limit)

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalEvents.value / perPage.value)
  return page.value < totalPages
})

const updateKeyword = () => {
  let queryFunction;
  if (keyword.value === '') {
    queryFunction = EventService.getEvents(perPage.value, page.value)
  } else {
    queryFunction = EventService.getEventsByKeyword(keyword.value, perPage.value, page.value)
  }
  queryFunction.then(res => {
    events.value = res.data
    console.log('events', events.value);
    totalEvents.value = res.headers['x-total-count']
    console.log('totalEvent', totalEvents.value);
  })
    .catch(() => {
      router.push({ name: 'network-error-view' })
    })
}
watchEffect(() => {
  events.value = null
  updateKeyword()
})
</script>

<template>
  <h1>Events For Good</h1>
  <main class="flex flex-col items-center">
    <div class="w-64">
      <BaseInput @input="updateKeyword" v-model="keyword" label="Search..." class="w-full" />
    </div>
    <EventCard v-for="event in events" :key="event.id ?? 0" :event="event" />
    <div class="flex w-72.5">
      <RouterLink class="flex-1 decoration-0 text-[#2c3e50] text-left"
        :to="{ name: 'event-list-view', query: { page: page - 1, _limit: perPage } }" rel="prev" v-if="page != 1">
        Prev Page
      </RouterLink>
      <RouterLink id="page-next" class="flex-1 decoration-0 text-[#2c3e50] text-right"
        :to="{ name: 'event-list-view', query: { page: page + 1, _limit: perPage } }" rel="next" v-if="hasNextPage">
        Next Page
      </RouterLink>
    </div>
  </main>

</template>