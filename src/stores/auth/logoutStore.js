import { defineStore } from 'pinia'

export const useLogoutStore = defineStore('logout', {
  state: () => ({
    logoutConfirm: false,
  }),
  actions: {
    showLogoutConfirm() {
      this.logoutConfirm = true
    },
    hideLogoutConfirm() {
      this.logoutConfirm = false
    },
  },
})
