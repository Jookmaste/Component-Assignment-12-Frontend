<script setup lang="ts">
import type { AuctionItem } from '@/types.ts';

defineProps<{
  auctionItem: AuctionItem
}>();
</script>

<template>
  <div class="flex items-center gap-x-5 decoration-0 text-[#2c3e50]">
    <div class="hover:scale-101 hover:shadow-sp p-5 w-62.5 cursor-pointer border border-gray-600 mb-[18px]">
      <h2>{{ auctionItem.description }}</h2>
      <span>Type: </span>
      <h5>{{ auctionItem.type }}</h5>
    </div>
  </div>
</template>