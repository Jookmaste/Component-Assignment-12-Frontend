<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message';
import { storeToRefs } from 'pinia';
const totalPages = ref(3); // Change total list per page here
const router = useRouter();
const store = useMessageStore()
const { message } = storeToRefs(store)
watch(() => totalPages.value, () => {
  router.push({
    query: { _limit: totalPages.value }
  })
})
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4> {{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }">Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'student-list-view' }">About</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" :to="{ name: 'add-event' }">
            New Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'add-organizer' }">
            New Organizer</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'auction-item-list' }">
            Auction</RouterLink>

        </nav>
      </div>
    </header>
    <select name="page" id="total-page" v-model="totalPages">
      <option v-for="page in [1, 2, 3, 4, 5, 6]" :key="page" :value="page">{{ page }}</option>
    </select>
    <RouterView />
  </div>
</template>