<script setup lang="ts">
import { ref, watch } from 'vue';
import { RouterLink, RouterView, useRouter } from 'vue-router'
import { useMessageStore } from './stores/message';
import { useAuthStore } from './stores/auth';
import { storeToRefs } from 'pinia';
import SvgIcon from '@jamescoyle/vue-icon'
import { mdiAccount, mdiAccountPlus, mdiLogin, mdiLogout } from '@mdi/js'

const totalPages = ref(3); // Change total list per page here
const router = useRouter();
const store = useMessageStore()
const authStore = useAuthStore()
const { message } = storeToRefs(store)
watch(() => totalPages.value, () => {
  router.push({
    query: { _limit: totalPages.value }
  })
})

function logout() {
  authStore.logout()
  router.push({ name: 'login' })
}
</script>

<template>
  <div class="text-center font-sans text-gray-700 antialiased">
    <header>
      <div id="flashMessage" class="animate-fade" v-if="message">
        <h4> {{ message }}</h4>
      </div>
      <div class="wrapper">
        <nav class="flex">
          <ul v-if="!authStore.isLoggedIn" class="flex navbar-nav ml-auto">
            <li class="nav-item px-2">
              <router-link to="/register" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiAccountPlus" />
                  <span class="ml-3">Sign Up</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <router-link to="/login" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiLogin" />
                  <span class="ml-3">Login</span>
                </div>
              </router-link>
            </li>
          </ul>
          <ul v-if="authStore.isLoggedIn" class="flex navbar-nav ml-auto">
            <li class="nav-item px-2">
              <router-link to="/profile" class="nav-link">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiAccount" />
                  <span class="ml-3">{{ authStore.currentUserName || 'User' }}</span>
                </div>
              </router-link>
            </li>
            <li class="nav-item px-2">
              <a class="nav-link hover:cursor-pointer" @click="logout">
                <div class="flex items-center">
                  <SvgIcon type="mdi" :path="mdiLogout" />
                  <span class="ml-3">LogOut</span>
                </div>
              </a>
            </li>
          </ul>
        </nav>
        <nav class="py-6">
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'event-list-view' }">
            Event</RouterLink>
          |
          <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500"
            :to="{ name: 'student-list-view' }">
            About</RouterLink>
          <span v-if="authStore.isAdmin">
            |
            <RouterLink class="font-bold text-gray-700" exact-active-class="text-green-500" 
              :to="{ name: 'add-event' }">
              New Event</RouterLink>
          </span>
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