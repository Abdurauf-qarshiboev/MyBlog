<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close">
      <div class="fixed inset-0" />

      <div class="fixed inset-0 overflow-hidden">
        <div class="absolute inset-0 overflow-hidden">
          <div
            class="pointer-events-none fixed inset-y-0 right-0 flex max-w-full sm:pl-10 md:pl-16"
          >
            <TransitionChild
              as="template"
              enter="transform transition ease-in-out duration-500 "
              enter-from="translate-x-full"
              enter-to="translate-x-0"
              leave="transform transition ease-in-out duration-500 "
              leave-from="translate-x-0"
              leave-to="translate-x-full"
            >
              <DialogPanel class="pointer-events-auto w-screen max-w-xl">
                <form
                  class="flex h-full flex-col divide-y divide-gray-200 bg-white shadow-xl rounded-l-xl"
                >
                  <div class="h-0 flex-1 overflow-hidden py-2">
                    <div class="px-4 py-6 sm:px-6">
                      <div class="flex items-center justify-between">
                        <DialogTitle class="text-2xl leading-6 text-gray-900 font-bold"
                          >Qidirish</DialogTitle
                        >
                        <div class="ml-3 flex h-7 items-center">
                          <button
                            type="button"
                            class="rounded-md text-gray-400 hover:text-gray-600 focus:outline-none"
                            @click="close"
                          >
                            <span class="sr-only">Close panel</span>
                            <XMarkIcon class="h-6 w-6" aria-hidden="true" />
                          </button>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col justify-between">
                      <div class="space-y-6 p-5">
                        <div class="relative group">
                          <div
                            class="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3"
                          >
                            <MagnifyingGlassIcon
                              v-if="!searchingText?.length > 0"
                              class="h-5 w-5 text-[#737373] font-bold"
                              aria-hidden="true"
                            />
                          </div>
                          <input
                            v-model="searchingText"
                            id="search"
                            name="search"
                            class="block w-full rounded-lg border-0 bg-gray-200/70 py-1.5 px-3 text-black placeholder:text-[#737373] sm:text-sm sm:leading-6 focus:ring-0 focus:outline-none"
                            :class="searchingText?.length > 0 ? '' : 'pl-10'"
                            placeholder="Qidirish"
                            type="search"
                          />
                        </div>
                      </div>
                      <div class="block">
                        <div class="border-b border-gray-200">
                          <nav class="-mb-px flex justify-around space-x-8" aria-label="Tabs">
                            <button
                              v-for="tab in tabs"
                              @click.prevent="selectTab(tab.name)"
                              :key="tab.name"
                              :class="[
                                tab.current
                                  ? 'border-gray-600 text-gray-800'
                                  : 'border-transparent text-gray-500 hover:border-gray-300 hover:text-gray-700',
                                'whitespace-nowrap border-b-2 py-4 px-1 text-sm font-medium',
                              ]"
                              :aria-current="tab.current ? 'page' : undefined"
                            >
                              {{ tab.name }}
                            </button>
                          </nav>
                        </div>
                      </div>
                    </div>
                    <div class="flex flex-col items-start justify-start">
                      <div
                        v-if="searchingText?.length == 0"
                        class="flex w-full flex-col items-start px-5 py-2"
                      >
                        <p class="text-base py-2 text-gray-700 font-semibold">Yaqinda qidirilgan</p>
                      </div>
                    </div>
                    <div
                      :class="[
                        searchingText?.length > 0 ? 'h-[51rem]' : 'h-[47rem]',
                        'flex flex-col overflow-y-scroll justify-start gap-y-3 py-4 px-4',
                      ]"
                    >
                      <el-empty v-if="searchingText?.length == 0" description="Ma`lumot yo`q" />

                      <!-- scrolling part -->
                      <div
                        v-else-if="activeTab !== 'Post'"
                        v-for="item in filteredItems"
                        :key="item.title || item.email || item.name"
                        class="relative flex items-center space-x-3 rounded-lg bg-white p-3 shadow-sm border border-gray-200 hover:border-gray-300"
                      >
                        <div v-if="activeTab !== 'Post'" class="flex-shrink-0">
                          <img
                            v-if="item.imageUrl"
                            class="h-10 w-10 rounded-full"
                            :src="item.imageUrl"
                            alt=""
                          />
                          <img
                            v-if="activeTab == 'Hashtag'"
                            class="h-10 w-10 rounded-full"
                            src="@/assets/images/defaults/default_hashtag.avif"
                            alt="hashtag"
                          />
                        </div>
                        <div v-if="activeTab !== 'Post'" class="min-w-0 flex-1">
                          <a href="#" class="focus:outline-none">
                            <span class="absolute inset-0" aria-hidden="true" />
                            <div class="flex items-center justify-between">
                              <div>
                                <p v-if="item.name" class="text-sm font-semibold text-gray-900">
                                  {{ item.name }}
                                </p>
                                <p v-if="item.title" class="text-sm font-semibold text-gray-900">
                                  {{ item.title }}
                                </p>
                              </div>
                              <p
                                v-if="item.role"
                                class="text-green-700 bg-green-50 ring-green-600/20 rounded-md whitespace-nowrap px-2 py-0.5 text-xs font-medium ring-1 ring-inset"
                              >
                                {{ item.role }}
                              </p>
                            </div>
                            <p
                              v-if="item.email"
                              class="text-indigo-900 w-fit whitespace-nowrap mt-0.5 py-0.5 text-xs font-medium"
                            >
                              {{ item.email }}
                            </p>
                          </a>
                        </div>
                      </div>
                      <!-- searched blogs  -->
                      <div
                        v-else
                        class="grid auto-rows-fr grid-cols-1 sm:grid-cols-2 gap-x-5 gap-y-10"
                      >
                        <article
                        v-for="item in filteredItems"
                        @click="gotoPost(item._id, true)"
                          :key="item._id"
                          class="relative isolate flex items-start justify-end overflow-hidden rounded-2xl bg-gray-900 px-4 pb-5 pt-44 cursor-pointer"
                        >
                          <img
                            v-if="item.image?.length !== 0"
                            :src="`${URL}/${item.image.at(0)?.response}`"
                            :alt="item.image.at(0)?.name"
                            class="absolute inset-0 -z-10 h-full w-full object-cover"
                          />
                          <img
                            v-else
                            src="@/assets/images/allBlogs/notfound.png"
                            alt="Placeholder Image"
                            class="absolute inset-0 -z-10 h-full w-full object-cover"
                          />
                          <div
                            class="absolute inset-0 -z-10 bg-gradient-to-t from-gray-900 via-gray-900/60"
                          />
                          <div
                            class="absolute inset-0 -z-10 rounded-2xl ring-1 ring-inset ring-gray-900/10"
                          />

                          <div class="flex flex-col items-start">
                            <div
                              class="flex flex-wrap items-center gap-y-1 overflow-hidden text-sm leading-6 text-gray-300"
                            >
                              <div class="mr-8">
                                {{ blogsSt.formatReadableDate(item.createdAt) }}
                              </div>
                              <div class="-ml-4 flex items-center gap-x-4">
                                <svg
                                  viewBox="0 0 2 2"
                                  class="-ml-0.5 h-0.5 w-0.5 flex-none fill-white/50"
                                >
                                  <circle cx="1" cy="1" r="1" />
                                </svg>
                                <div class="flex gap-x-2.5">
                                  <img
                                    src="https://images.unsplash.com/photo-1496128858413-b36217c2ce36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=3603&q=80"
                                    alt=""
                                    class="h-6 w-6 flex-none rounded-full bg-white/10"
                                  />
                                  {{ item.userId.name }} {{ item.userId.lname }}
                                </div>
                              </div>
                            </div>
                            <h3 class="mt-3 text-lg font-semibold leading-6 text-white">
                              <a href="#">
                                <span class="absolute inset-0" />
                                {{ item.title }}
                              </a>
                            </h3>
                          </div>
                          <div class="flex flex-col gap-2 items-end">
                            <div class="flex items-center gap-1 text-gray-300 text-sm">
                              <svg
                                xmlns="http://www.w3.org/2000/svg"
                                fill="red"
                                viewBox="0 0 24 24"
                                stroke-width="1.5"
                                stroke="red"
                                class="size-6"
                              >
                                <path
                                  stroke-linecap="round"
                                  stroke-linejoin="round"
                                  d="M21 8.25c0-2.485-2.099-4.5-4.688-4.5-1.935 0-3.597 1.126-4.312 2.733-.715-1.607-2.377-2.733-4.313-2.733C5.1 3.75 3 5.765 3 8.25c0 7.22 9 12 9 12s9-4.78 9-12Z"
                                />
                              </svg>
                              {{ item.likeCount }}
                            </div>
                            <div class="flex items-center gap-1 text-gray-300 text-sm">
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
                                  d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                                />
                              </svg>
                              {{ item.commentCount }}
                            </div>
                          </div>
                        </article>
                      </div>
                    </div>
                  </div>
                </form>
              </DialogPanel>
            </TransitionChild>
          </div>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>

<script setup>
import { ref, reactive, watch, computed, onMounted } from 'vue'
import { Dialog, DialogPanel, DialogTitle, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { MagnifyingGlassIcon } from '@heroicons/vue/20/solid'
import { modalStore } from '@/stores/others/modal'
import { blogsStore } from '@/stores/data/blogs'
import { hashtagsStore } from '@/stores/data/hashtag'
import { filter } from '@/stores/others/filter'
import { URL } from '@/helpers/api'

const blogsSt = blogsStore()
const modalSt = modalStore()
const hashtagsSt = hashtagsStore()
const open = ref(false)
const searchingText = ref('')

const gotoPost = (blogId,state) => {
  console.log(blogId)
  modalSt.setToggle(blogId, state)
  console.log('Comments page is ' + state + ' for a blog with id:' + blogId)
}

watch(
  () => ({ searchingItem: modalSt.searchingItem, searchToggle: modalSt.searchToggle }),
  ({ searchingItem, searchToggle }) => {
    open.value = searchToggle
    if (searchingItem) {
      searchingText.value = searchingItem
      selectTab('Hashtag')
    }
  },
)

const tabs = reactive([
  { name: 'Hisob', current: true },
  { name: 'Post', current: false },
  { name: 'Hashtag', current: false },
])

const people = reactive([
  {
    name: 'Leslie Alexander',
    email: 'leslie.alexander@example.com',
    role: 'user',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Wesleyan Brown',
    email: 'wesleyanBrown@example.com',
    role: 'user',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Adam Gramt',
    email: 'gramtAdam@example.com',
    role: 'user',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  {
    name: 'Jack Paul',
    email: 'jackpaul@example.com',
    role: 'user',
    imageUrl:
      'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80',
  },
  // More people...
])

const selectTab = (tabName) => {
  tabs.forEach((t) => (t.current = t.name === tabName))
}
const activeTab = computed(() => tabs.find((tab) => tab.current)?.name || 'Hisob')
console.log('Selected Tab: ', activeTab)

const filteredItems = computed(() => {
  let dataArray = []
  switch (activeTab.value) {
    case 'Hisob':
      dataArray = people || []
      break
    case 'Post':
      dataArray = blogsSt.blogs.data || []
      break
    case 'Hashtag':
      dataArray = hashtagsSt.hashtags.data || []
      break
    default:
      break
  }
  return filter(searchingText, activeTab.value, dataArray)
})

const close = () => {
  open.value = false
  searchingText.value = ''
  setTimeout(() => {
    modalSt.closeSearchingModal()
  }, 300)
}
onMounted(async () => {
  await blogsSt.allBlogs()
  await hashtagsSt.allHashtags()
})
</script>
