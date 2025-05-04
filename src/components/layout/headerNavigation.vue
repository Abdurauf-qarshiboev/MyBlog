<template>
  <div>
    <Disclosure as="nav" class="bg-gray-800 z-[999]" v-slot="{ close }">
      <div class="mx-auto max-w-9xl px-4 sm:px-6">
        <div class="flex h-16 items-center justify-between">
          <!-- logo -->
          <div class="flex flex-shrink-0 items-center pr-2 sm:pr-0">
            <h1 class="text-2xl text-white" alt="Logo">MyBlog</h1>
          </div>
          <!-- menu -->
          <div class="flex items-center justify-center sm:space-x-6 lg:space-x-5">
            <div class="hidden sm:block">
              <div class="flex items-center sm:space-x-2 md:space-x-4 lg:space-x-5">
                <router-link
                  v-for="link of mainMenu"
                  :key="link.name"
                  :to="{ name: link.name }"
                  :class="`flex items-center justify-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2.5 lg:px-3 lg:py-2 text-sm font-medium ${route.name == link.name ? 'bg-gray-700 text-white' : ''}`"
                >
                  <component class="size-6" :is="link?.meta?.icon"></component>
                  <span class="hidden lg:block">
                    {{ link?.meta?.title }}
                  </span>
                </router-link>

                <button
                  @click="toggleSearchingModal(true)"
                  :class="`flex lg:hidden items-center justify-center gap-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-5 py-2.5 lg:px-3 lg:py-2 text-sm font-medium ${modalSt.searchToggle ? 'ring-1 ring-inset ring-gray-500 text-white' : ''}`"
                  :disabled="route.name == 'create-blogs' || route.name == 'edit-blogs'"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-6"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="m21 21-5.197-5.197m0 0A7.5 7.5 0 1 0 5.196 5.196a7.5 7.5 0 0 0 10.607 10.607Z"
                    />
                  </svg>
                </button>
                <!-- search input for large screens (direct search)-->
                <div class="hidden lg:flex flex-1 justify-center px-2">
                  <div class="w-full max-w-lg lg:max-w-xs">
                    <label for="search" class="sr-only">Search</label>
                    <div class="relative group">
                      <div
                        class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                      >
                        <MagnifyingGlassIcon
                          class="h-5 w-5 text-gray-300 group-focus-within:text-white"
                          aria-hidden="true"
                        />
                      </div>
                      <input
                        @focus="toggleSearchingModal(true)"
                        id="search"
                        name="search"
                        class="block w-full rounded-md border-0 bg-gray-800 ring-1 ring-gray-700 py-1.5 pl-10 pr-3 text-white placeholder:text-gray-300 focus:bg-gray-700 focus:text-white focus:ring-0 sm:text-sm sm:leading-6"
                        placeholder="Qidirish"
                        type="search"
                      />
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <!-- right part -->
          <div class="hidden sm:block">
            <div class="flex items-center">
              <button
                type="button"
                class="rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none"
              >
                <span class="sr-only">View notifications</span>
                <BellIcon class="size-6" aria-hidden="true" />
              </button>

              <!-- Profile dropdown -->
              <Menu as="div" class="relative ml-3 hidden sm:block">
                <div>
                  <MenuButton
                    class="flex max-w-xs items-center rounded-full text-sm focus:outline-none"
                  >
                    <span class="sr-only">Open user menu</span>
                    <img
                      v-if="
                        Array.isArray(user.avatar) &&
                        (user.avatar.length !== 0 || user.avatar[0]?.response)
                      "
                      class="size-9 rounded-full"
                      :src="`${URL}/${user.avatar[0]?.response}`"
                      :alt="`Avatar of ${user.name || 'User'}`"
                    />
                    <img
                      v-else
                      src="@/assets/images/defaults/default_avatar.jpg"
                      alt="Default avatar"
                      class="h-8 w-8 rounded-full"
                    />
                  </MenuButton>
                </div>
                <transition
                  enter-active-class="transition ease-out duration-100"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95"
                >
                  <MenuItems
                    class="absolute right-7 top-6 z-10 mt-2 w-36 origin-top-right rounded-md bg-white py-0 overflow-hidden shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none"
                  >
                    <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                      <button
                        @click="item.name == 'Chiqish' ? handleLogout() : profilePage()"
                        class="flex items-center justify-start gap-4"
                        :class="[
                          active ? 'bg-gray-100' : '',
                          'block w-full px-3 py-2 text-sm leading-6',
                          item.name == 'Chiqish' ? 'text-red-700' : 'text-black',
                        ]"
                      >
                        <svg
                          v-if="item.name == 'Profil'"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="currentColor"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                          />
                        </svg>
                        <svg
                          v-if="item.name == 'Chiqish'"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 24 24"
                          stroke-width="1.5"
                          stroke="#B91C1C"
                          class="size-6"
                        >
                          <path
                            stroke-linecap="round"
                            stroke-linejoin="round"
                            d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                          />
                        </svg>
                        {{ item.name }}
                      </button>
                    </MenuItem>
                  </MenuItems>
                </transition>
              </Menu>
            </div>
          </div>

          <!-- search input -->
          <div class="sm:hidden flex flex-1 justify-end px-2">
            <div class="w-full max-w-xs">
              <label for="search" class="sr-only">Search</label>
              <div class="relative group">
                <div class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
                  <MagnifyingGlassIcon
                    @click="toggleSearchingModal(true)"
                    class="h-5 w-5 text-gray-300 group-focus-within:text-white"
                    aria-hidden="true"
                  />
                </div>
                <input
                  @focus="toggleSearchingModal(true)"
                  id="search"
                  name="search"
                  class="block w-full rounded-md border-0 bg-gray-700 py-1.5 pl-10 pr-3 text-white placeholder:text-gray-300 focus:bg-gray-500/50 focus:text-white focus:ring-0 sm:text-sm sm:leading-6"
                  placeholder="Qidirish"
                  type="text"
                />
              </div>
            </div>
          </div>
        </div>
      </div>

      <DisclosurePanel class="sm:hidden">
        <div class="space-y-1 px-2 pb-3 pt-2 sm:px-3">
          <router-link
            @click="close"
            v-for="link of mainMenu"
            :key="link.name"
            :to="{ name: link.name }"
            :class="`flex items-center justify-start gap-2 text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-base font-medium ${route.name == link.name ? 'bg-gray-900 text-white' : ''}`"
          >
            <component :is="link?.meta?.icon"></component>
            {{ link?.meta?.title }}
          </router-link>
        </div>
        <div class="border-t border-gray-700 pb-3 pt-4">
          <div class="flex items-center px-5">
            <div class="flex-shrink-0">
              <img
                v-if="
                  Array.isArray(user.avatar) &&
                  (user.avatar.length !== 0 || user.avatar[0]?.response)
                "
                class="size-9 rounded-full"
                :src="`${URL}/${user.avatar[0]?.response}`"
                :alt="`Avatar of ${user.name || 'User'}`"
              />
              <img
                v-else
                src="@/assets/images/defaults/default_avatar.jpg"
                alt="Default avatar"
                class="h-8 w-8 rounded-full"
              />
            </div>
            <div class="ml-3">
              <div class="text-base font-medium leading-none text-white">
                {{ user.name }} {{ user.lname }}
              </div>
              <div class="mt-1 text-sm font-medium leading-none text-gray-400">
                {{ user.email }}
              </div>
            </div>
            <button
              type="button"
              class="ml-auto flex-shrink-0 rounded-full bg-gray-800 p-1 text-gray-400 hover:text-white focus:outline-none focus:ring-2 focus:ring-white focus:ring-offset-2 focus:ring-offset-gray-800"
            >
              <span class="sr-only">View notifications</span>
              <BellIcon class="h-6 w-6" aria-hidden="true" />
            </button>
          </div>
          <div class="mt-3 space-y-1 px-2">
            <DisclosureButton
              @click="item.name == 'Chiqish' ? handleLogout() : profilePage()"
              v-for="item in userNavigation"
              :key="item.name"
              as="a"
              :href="item.href"
              class="block rounded-md px-3 py-2 text-base font-medium text-gray-400 hover:bg-gray-700 hover:text-white"
            >
              {{ item.name }}
            </DisclosureButton>
          </div>
        </div>
      </DisclosurePanel>
    </Disclosure>

    <!-- bottom nav -->
    <div class="sm:hidden bg-gray-800 z-[999] absolute bottom-0 mx-auto w-full max-w-9xl py-2 px-4">
      <div class="w-full flex items-center justify-center pl-9">
        <div class="flex items-center justify-center space-x-10 mx-auto">
          <router-link
            v-for="link of mainMenu"
            :key="link.name"
            :to="{ name: link.name }"
            :class="`flex items-center justify-center text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 lg:py-2 text-sm font-medium ${route.name == link.name ? 'bg-gray-700 text-white' : ''}`"
          >
            <component class="size-6" :is="link?.meta?.icon"></component>
          </router-link>
        </div>
        <!-- Profile dropdown -->
        <Menu as="div" class="relative sm:hidden">
          <div>
            <MenuButton class="flex max-w-xs items-center rounded-full text-sm focus:outline-none">
              <span class="sr-only">Open user menu</span>
              <img
                v-if="
                  Array.isArray(user.avatar) &&
                  (user.avatar.length !== 0 || user.avatar[0]?.response)
                "
                class="size-9 rounded-full"
                :src="`${URL}/${user.avatar[0]?.response}`"
                :alt="`Avatar of ${user.name || 'User'}`"
              />
              <img
                v-else
                src="@/assets/images/defaults/default_avatar.jpg"
                alt="Default avatar"
                class="h-8 w-8 rounded-full"
              />
            </MenuButton>
          </div>
          <transition
            enter-active-class="transition ease-out duration-100"
            enter-from-class="transform opacity-0 scale-95"
            enter-to-class="transform opacity-100 scale-100"
            leave-active-class="transition ease-in duration-75"
            leave-from-class="transform opacity-100 scale-100"
            leave-to-class="transform opacity-0 scale-95"
          >
            <MenuItems
              class="absolute right-9 bottom-4 z-10 mt-2 w-26 origin-top-center rounded-md bg-white py-0 overflow-hidden shadow-lg ring-1 ring-black ring-opacity-10 focus:outline-none"
            >
              <MenuItem v-for="item in userNavigation" :key="item.name" v-slot="{ active }">
                <button
                  @click="item.name == 'Chiqish' ? handleLogout() : profilePage()"
                  class="flex items-center justify-start gap-1"
                  :class="[
                    active ? 'bg-gray-100' : '',
                    'block w-full px-2 py-2 text-xs leading-5',
                    item.name == 'Chiqish' ? 'text-red-700' : 'text-black',
                  ]"
                >
                  <svg
                    v-if="item.name == 'Profil'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="currentColor"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M17.982 18.725A7.488 7.488 0 0 0 12 15.75a7.488 7.488 0 0 0-5.982 2.975m11.963 0a9 9 0 1 0-11.963 0m11.963 0A8.966 8.966 0 0 1 12 21a8.966 8.966 0 0 1-5.982-2.275M15 9.75a3 3 0 1 1-6 0 3 3 0 0 1 6 0Z"
                    />
                  </svg>
                  <svg
                    v-if="item.name == 'Chiqish'"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                    stroke-width="1.5"
                    stroke="#B91C1C"
                    class="size-5"
                  >
                    <path
                      stroke-linecap="round"
                      stroke-linejoin="round"
                      d="M8.25 9V5.25A2.25 2.25 0 0 1 10.5 3h6a2.25 2.25 0 0 1 2.25 2.25v13.5A2.25 2.25 0 0 1 16.5 21h-6a2.25 2.25 0 0 1-2.25-2.25V15m-3 0-3-3m0 0 3-3m-3 3H15"
                    />
                  </svg>
                  {{ item.name }}
                </button>
              </MenuItem>
            </MenuItems>
          </transition>
        </Menu>
      </div>
    </div>
  </div>
  <logoutConfirm></logoutConfirm>
</template>
<script setup>
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import logoutConfirm from '@/components/layout/logoutConfirm.vue'
import { mainMenu } from '@/router/nav/routes'
import { useRoute } from 'vue-router'
import { authStore } from '@/stores/auth/user'
import { useLogoutStore } from '@/stores/auth/logoutStore'
import { URL } from '@/helpers/api'

const logoutSt = useLogoutStore()
const route = useRoute()
const authSt = authStore()
const { user } = storeToRefs(authSt)

const handleLogout = () => {
  logoutSt.showLogoutConfirm()
}
const profilePage = () => {
  router.push({ name: 'profile' })
}
import {
  Disclosure,
  DisclosureButton,
  DisclosurePanel,
  Menu,
  MenuButton,
  MenuItem,
  MenuItems,
} from '@headlessui/vue'
import { BellIcon } from '@heroicons/vue/24/outline'
import { storeToRefs } from 'pinia'
import router from '@/router'
import { modalStore } from '@/stores/others/modal'
const modalSt = modalStore()

const userNavigation = [{ name: 'Profil' }, { name: 'Chiqish' }]

const toggleSearchingModal = (value) => {
  modalSt.setSearchToggle(value)
  console.log(`searching is: ${value}`)
}
</script>
<style lang="scss"></style>
