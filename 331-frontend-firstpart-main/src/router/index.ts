import { createRouter, createWebHistory } from 'vue-router'
import EventListView from '@/views/EventListView.vue'
import StudentListView from '@/views/StudentListView.vue'
import EventDetailView from '@/views/event/DetailView.vue'
import RegisterView from '@/views/event/RegisterView.vue'
import EditView from '@/views/event/EditView.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import nProgress from 'nprogress'
import EventService from '@/services/EventService'
import { useEventStore } from '@/stores/event'
import EventFormView from '@/views/event/EventFormView.vue'
import OrganizerFormView from '@/views/event/OrganizerFormView.vue'
import AuctionItemListView from '@/views/auction/AuctionItemListView.vue'
import OrganizerDetailView from '@/views/event/OrganizerDetailView.vue'
import OrganizerService from '@/services/OrganizerService'
import type { AxiosError } from 'axios'
import LoginView from '@/views/LoginView.vue'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'event-list-view',
      component: EventListView,
      props: (route) => ({
        page: parseInt(route.query.page ? route.query.page.toString() : '1'),
        limit: parseInt((route.query.limit || route.query._limit)?.toString() || '3'),
        totalPage: parseInt(route.query._limit ? route.query._limit.toString() : '2'),
      }),
    },
    {
      path: '/auction-items',
      name: 'auction-item-list',
      component: AuctionItemListView,
      props: (route) => ({
        page: parseInt(route.query.page ? route.query.page.toString() : '1'),
        limit: parseInt((route.query.limit || route.query._limit)?.toString() || '3'),
        totalPage: parseInt(route.query._limit ? route.query._limit.toString() : '2'),
      }),
    },
    {
      path: '/add-event',
      name: 'add-event',
      component: EventFormView,
    },
    {
      path: '/add-organizer',
      name: 'add-organizer',
      component: OrganizerFormView,
    },
    {
      path: '/organizer/:id',
      name: 'organizer-detail-view',
      component: OrganizerDetailView,
      props: (route) => ({
        id: route.params.id,
        organizer: route.meta.organizer,
      }),
      beforeEnter: (to) => {
        const id = parseInt(to.params.id as string)
        return OrganizerService.getOrganizer(id)
          .then((res) => {
            to.meta.organizer = res.data
          })
          .catch((err: AxiosError) => {
            if (err.response && err.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'organizer' },
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
    },
    {
      path: '/students',
      name: 'student-list-view',
      component: StudentListView,
      props: (route) => ({
        page: parseInt(route.query.page ? route.query.page.toString() : '1'),
        limit: parseInt((route.query.limit || route.query._limit)?.toString() || '3'),
        totalPage: parseInt(route.query._limit ? route.query._limit.toString() : '2'),
      }),
    },
    {
      path: '/404/:resource',
      name: '404-resource-view',
      component: NotFoundView,
      props: true,
    },
    {
      path: '/network-error',
      name: 'network-error-view',
      component: NetworkErrorView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
    {
      path: '/login',
      name: 'login',
      component: LoginView
    },
    {
      path: '/event/:id',
      name: 'event-layout-view',
      component: LayoutView,
      props: true,
      beforeEnter: (to) => {
        // API CALL HERE
        const id = parseInt(to.params.id as string)
        const eventStore = useEventStore()
        return EventService.getEvent(id)
          .then((res) => {
            eventStore.setEvent(res.data)
          })
          .catch((err) => {
            if (err.response && err.response.status === 404) {
              return {
                name: '404-resource-view',
                params: { resource: 'event' },
              }
            } else {
              return { name: 'network-error-view' }
            }
          })
      },
      children: [
        {
          path: '',
          name: 'event-detail-view',
          component: EventDetailView,
          props: true,
        },
        {
          path: 'register',
          name: 'event-register-view',
          component: RegisterView,
          props: true,
        },
        {
          path: 'edit',
          name: 'event-edit-view',
          component: EditView,
          props: true,
        },
      ],
    },
  ],
  scrollBehavior(to, from, savedPosition) {
    if (savedPosition) {
      return savedPosition
    } else {
      return { top: 0 }
    }
  },
})

router.beforeEach(() => {
  nProgress.start()
})

router.afterEach(() => {
  nProgress.done()
})

export default router