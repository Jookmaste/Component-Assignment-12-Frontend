<script setup lang="ts">
import type { Event } from '@/types';
defineProps<{
    event: Event
}>();
</script>

<template>
    <div class="flex flex-col text-right text-[20px] my-3 border border-purple-700 p-5 w-max-[275px] w-full">
        <p>Category: {{ event.category }}</p>
        <p>Organizer: {{ event.organizer.name }}</p>
    </div>
</template>