<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue';
import AuctionItemCard from '@/components/AuctionItemCard.vue';
import router from '@/router';
import AuctionItemService from '@/services/AuctionItemService';
import type { AuctionItem } from '@/types.ts';
import { ref, computed, watchEffect } from 'vue';

const auctionItems = ref<AuctionItem[] | null>(null);
const keyword = ref('');
const bidValue = ref<number | null | string>(null);
const totalItems = ref(0);

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
});
const page = computed(() => props.page);
const perPage = computed(() => props.limit);

const hasNextPage = computed(() => {
  const totalPages = Math.ceil(totalItems.value / perPage.value);
  return page.value < totalPages;
});

const updateQuery = () => {
  let queryFunction;

  const numericBidValue = Number(bidValue.value);
    
  if (bidValue.value !== null && bidValue.value !== undefined && bidValue.value !== '' && !isNaN(numericBidValue)) {
    queryFunction = AuctionItemService.getAuctionItemsByBidLessThan(numericBidValue, perPage.value, page.value);
  } else if (keyword.value !== '') {
    queryFunction = AuctionItemService.getAuctionItemsByKeyword(keyword.value, perPage.value, page.value);
  } else {
    queryFunction = AuctionItemService.getAuctionItems(perPage.value, page.value);
  }
  
  queryFunction.then(res => {
    auctionItems.value = res.data;
    totalItems.value = res.headers['x-total-count'];
  })
  .catch(() => {
    router.push({ name: 'network-error-view' });
  });
};

watchEffect(() => {
  auctionItems.value = null;
  updateQuery();
});
</script>

<template>
  <h1>Auction Items</h1>
  <main class="flex flex-col items-center">
    <div class="flex gap-4 mb-4">
      <div class="w-64">
        <BaseInput @input="updateQuery" v-model="keyword" label="Search..." class="w-full" />
      </div>
      <div class="w-64">
        <BaseInput @input="updateQuery" v-model.number="bidValue" type="number" label="Bid Less Than..." class="w-full" />
      </div>
    </div>
    <AuctionItemCard v-for="item in auctionItems" :key="item.id ?? 0" :auctionItem="item" />
    <div class="flex w-72.5">
      <RouterLink class="flex-1 decoration-0 text-[#2c3e50] text-left"
        :to="{ name: 'auction-item-list', query: { page: page - 1, _limit: perPage } }" rel="prev" v-if="page != 1">
        Prev Page
      </RouterLink>
      <RouterLink id="page-next" class="flex-1 decoration-0 text-[#2c3e50] text-right"
        :to="{ name: 'auction-item-list', query: { page: page + 1, _limit: perPage } }" rel="next" v-if="hasNextPage">
        Next Page
      </RouterLink>
    </div>
  </main>
</template>