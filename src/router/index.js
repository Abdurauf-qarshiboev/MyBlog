import { createRouter, createWebHistory } from 'vue-router'
import { mainMenu, profile } from './nav/routes'
import { authStore } from '@/stores/auth/user'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      name: 'dashboardLayout',
      component: () => import('@/layouts/dashboardLayout.vue'),
      children: [
        ...mainMenu,
        ...profile,
        {
          path: 'blogs/:id',
          name: 'edit-blogs',
          component: () => import('@/views/dashboard/blogs/editBlogs.vue'),
          meta: {
            title: 'Postni tahrirlash',
          },
        },
      ],
    },
    {
      path: '/auth',
      name: 'authLayout',
      component: () => import('@/layouts/authLayout.vue'),
      children: [
        {
          path: 'login',
          name: 'login',
          component: () => import('@/views/auth/loginPage.vue'),
          meta: {
            title: 'Tizimga kirish',
          },
        },
        {
          path: 'signup',
          name: 'signup',
          component: () => import('@/views/auth/signupPage.vue'),
          meta: {
            title: 'Ro`yxatdan o`tish',
          },
        },
      ],
    },
  ],
})

router.beforeEach(async (to, from, next) => {
  const store = authStore()
  document.title = `myBlog | ${to?.meta?.title}`

  if (store.isAuth && to.name === 'login') {
    next({ name: 'dashboardLayout' })
    return
  }

  if (to.name !== 'login' && to.name !== 'signup' && !store.isAuth) {
    if (sessionStorage.getItem('token')) {
      await store.checkuser()
      next()
    } else {
      next({ name: 'login' })
    }
  } else {
    next()
  }
})

export default router
