import {
  RectangleStackIcon,
  HomeIcon,
  UserIcon,
  PlusCircleIcon
} from '@heroicons/vue/24/outline'
export const mainMenu = [
  {
    path: '',
    name: 'home',
    component: () => import('@/views/dashboard/dashboardPage.vue'),
    meta: {
      title: 'Bosh sahifa',
      icon: HomeIcon,
    },
  },
  {
    path: 'myblogs',
    name: 'myblogs',
    component: () => import('@/views/dashboard/myblogsPage.vue'),
    meta: {
      title: 'Mening bloglarim',
      icon: RectangleStackIcon,
    },
  },
  {
    path: 'createblogs',
    name: 'create-blogs',
    component: () => import('@/views/dashboard/blogs/createBlogs.vue'),
    meta: {
      title: 'Blog yaratish',
      icon: PlusCircleIcon,
    },
  },

]

export const profile = [
  {
    path: 'profile',
    name: 'profile',
    component: () => import('@/views/dashboard/profile/profilePage.vue'),
    meta: {
      title: 'Mening Profilim',
      icon: UserIcon,
    },
  },
]
