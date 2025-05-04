<template>
  <el-empty v-if="blogsSt.myblogs.data.length == 0" description="Hozircha postlar mavjud emas..." />
  <div class="bg-white px-0 py-5 pb-16 sm:px-2" v-else>
    <div class="rounded-lg p-0 mx-auto max-w-7xl">
      <div
        class="mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 sm:gap-x-5 lg:gap-x-8 gap-y-5"
      >
        <article
          v-for="blog of blogsSt.myblogs.data"
          :key="blog._id"
          class="flex flex-col items-start justify-start"
        >
          <div class="relative w-full px-3 mb-2 md:mb-3 flex items-center gap-x-2 md:gap-x-3">
            <img
              v-if="user.avatar?.length !== 0"
              :src="`${URL}/${user.avatar?.at(0)?.response}`"
              alt=""
              class="size-7 sm:size-8 md:size-9 rounded-full bg-gray-100"
            />
            <img
              v-else
              src="@/assets/images/defaults/default_avatar.jpg"
              alt=""
              class="h-8 w-8 rounded-full"
            />
            <div class="flex items-center justify-center gap-1 text-sm leading-6">
              <p class="font-bold text-black">
                <a href="#" class="font-semibold text-black w-fit">
                  {{ user?.name }}
                  {{ user?.lname }}
                </a>
              </p>
            </div>
          </div>
          <div class="relative w-full h-[288px] overflow-hidden">
            <Splide
              class="h-full"
              :options="{
                ...options,
                arrows: blog.image?.length > 1,
                pagination: blog.image?.length > 1,
              }"
              aria-label="My Favorite Images"
            >
              <SplideSlide
                class="h-[18rem] aspect-[18/20]"
                v-for="(img, index) in blog.image"
                :key="index"
              >
                <img
                  v-if="blog.image?.length > 0"
                  :src="`${URL}/${img.response}`"
                  alt=""
                  class="w-full h-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
              <SplideSlide
                class="h-[18rem] aspect-[18/20]"
                v-if="!blog.image || blog.image.length === 0"
              >
                <img
                  src="../../assets/images/allBlogs/notfound.png"
                  alt="Placeholder Image"
                  class="w-full h-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
            </Splide>
            <div class="absolute inset-0 sm:rounded ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div class="flex flex-col flex-1 w-full px-3 md:px-1">
            <div class="mt-2 md-mt-4 flex items-center justify-between gap-x-2 md:gap-x-4 text-xs">
              <div class="flex items-center gap-4 text-xs z-1">
                <button
                  @click="toggleLike(blog, user._id)"
                  class="relative text-sm rounded-full flex items-center justify-center gap-1"
                >
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    :fill="blog?.liked ? 'red' : 'white'"
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
                  {{ blog.likeCount }}
                </button>
                <button
                  @click="openCommentsPage(blog._id, true)"
                  class="relative text-sm rounded-full flex items-center justify-center gap-1 hover:text-gray-500"
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
                      d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                    />
                  </svg>
                  {{ blog.commentCount }} ta izoh
                </button>
                <p
                  :class="[
                    blog.status == 1
                      ? 'text-green-700 bg-green-50 ring-green-600/20'
                      : 'text-red-800 bg-red-50 ring-red-600/20',
                    'rounded-md whitespace-nowrap mt-0.5 px-2 py-0.5 text-xs font-medium ring-1 ring-inset',
                  ]"
                >
                  {{ blog.status == 1 ? 'Faol' : 'Nofaol' }}
                </p>
              </div>
              <div>
                <Menu as="div" class="relative flex-none">
                  <MenuButton class="block text-gray-500 hover:text-black">
                    <span class="sr-only">Actions</span>
                    <EllipsisVerticalIcon class="h-5 w-5" aria-hidden="true" />
                  </MenuButton>
                  <transition
                    enter-active-class="transition ease-out duration-100"
                    enter-from-class="transform opacity-0 scale-95"
                    enter-to-class="transform opacity-100 scale-100"
                    leave-active-class="transition ease-in duration-75"
                    leave-from-class="transform opacity-100 scale-100"
                    leave-to-class="transform opacity-0 scale-95"
                  >
                    <MenuItems
                      class="absolute right-5 top-0 z-10 mt-2 w-44 origin-top-right rounded-md bg-white py-0 overflow-hidden shadow-lg ring-1 ring-gray-900/5 focus:outline-none"
                    >
                      <MenuItem v-slot="{ active }">
                        <router-link
                          :to="{
                            name: 'edit-blogs',
                            params: {
                              id: blog._id,
                            },
                          }"
                          :key="blog._id"
                          :class="[
                            active ? 'bg-gray-50' : '',
                            'flex items-center justify-between px-3 py-1 text-sm leading-6 text-yellow-600 w-full text-left',
                          ]"
                        >
                          Tahrirlash
                          <svg
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
                              d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                            />
                          </svg>
                          <span class="sr-only">, {{ blog.title }}</span>
                        </router-link>
                      </MenuItem>
                      <MenuItem>
                        <button
                          @click="statusBlogs(blog._id)"
                          class="flex items-center justify-between"
                          :class="[
                            blog.status == 0
                              ? 'block px-3 py-1 text-sm leading-6 bg-green-50 w-full text-green-700 text-left'
                              : 'block px-3 py-1 text-sm leading-6 bg-red-50 text-red-700 w-full text-left',
                          ]"
                        >
                          {{ blog.status == 0 ? 'Faollashtirish' : 'Faolsizlantirish' }}
                          <svg
                            v-if="blog.status == 1"
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
                              d="M12 9v3.75m-9.303 3.376c-.866 1.5.217 3.374 1.948 3.374h14.71c1.73 0 2.813-1.874 1.948-3.374L13.949 3.378c-.866-1.5-3.032-1.5-3.898 0L2.697 16.126ZM12 15.75h.007v.008H12v-.008Z"
                            />
                          </svg>
                          <svg
                            v-if="blog.status == 0"
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
                              d="M9 12.75 11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
                            />
                          </svg>

                          <span class="sr-only">, {{ blog.title }}</span>
                        </button>
                      </MenuItem>
                      <MenuItem v-slot="{ active }">
                        <button
                          @click="remove(blog._id)"
                          :class="[
                            active ? 'bg-gray-50' : '',
                            ' px-3 py-1 text-sm leading-6 text-black flex items-center justify-between w-full text-left',
                          ]"
                        >
                          O`chirish
                          <svg
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
                              d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                            />
                          </svg>

                          <span class="sr-only">, {{ blog.title }}</span>
                        </button>
                      </MenuItem>
                    </MenuItems>
                  </transition>
                </Menu>
              </div>
            </div>
            <div class="relative">
              <div class="mt-2 md:mt-3 text-sm font-semibold leading-5 text-black">
                {{ blog.title }}
              </div>
              <div @click="handleHashtagClick">
                <p
                  :innerHTML="processedText(blog.text)"
                  class="mt-1 text-sm text-black line-clamp-2"
                ></p>
              </div>
            </div>
            <div
              class="flex gap-x-4 gap-y-1 sm:flex-col lg:flex-row mt-2 rounded py-1 px-2 bg-gray-100"
            >
              <div class="text-xs sm:text-sm text-gray-600">
                <span class="text-green-600">Yaratilgan:</span>
                {{ blogsSt.timeSince(blog.createdAt) }}
              </div>
              <div class="text-xs sm:text-sm text-gray-600">
                <span class="text-orange-600">Tahrirlangan:</span>
                {{ blogsSt.timeSince(blog.updatedAt) }}
              </div>
            </div>
            <div class="mt-1 md:mt-2 text-xs w-fit sm:text-sm text-gray-600">
              <button @click="openCommentsPage(blog._id, true)" :key="blog._id">
                {{
                  blog.commentCount == 0
                    ? 'Bu postga izohlar qoldirilmagan'
                    : 'Barcha izohlarni ko`rish'
                }}
              </button>
            </div>
            <!-- my comment -->
            <div class="mt-2 hidden">
              <!-- comments array will be rendered from api here -->
            </div>
            <!-- commenting -->
            <div class="mt-auto flex items-start space-x-4 border-b border-gray-200 pb-2">
              <div class="min-w-0 flex-1">
                <form @submit.prevent="submitComment(blog._id, user._id)">
                  <div class="relative">
                    <label for="comment" class="sr-only">Izoh qoldirish</label>
                    <textarea
                      :value="commentsSt.getCommentDraft(blog._id)"
                      @input="commentsSt.updateCommentDraft(blog._id, $event.target.value)"
                      rows="2"
                      name="comment"
                      id="comment"
                      class="block w-full resize-none border-0 border-transparent p-0 pr-10 text-gray-800 placeholder:text-gray-400 text-sm placeholder:text-sm focus:border-0 focus:ring-0 sm:leading-6"
                      placeholder="Izoh qoldirish..."
                    />
                    <!-- v-if="commentsSt.getCommentDraft(blog._d).length > 0" -->
                    <button
                      class="inline-flex items-center rounded-md px-3 py-2 text-sm font-semibold bg-transparent text-gray-400 hover:text-gray-500 absolute top-0 right-0"
                      type="submit"
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
                          d="M6 12 3.269 3.125A59.769 59.769 0 0 1 21.485 12 59.768 59.768 0 0 1 3.27 20.875L5.999 12Zm0 0h7.5"
                        />
                      </svg>
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisVerticalIcon } from '@heroicons/vue/20/solid'
import { ElMessage, ElMessageBox } from 'element-plus'
import { blogsStore } from '@/stores/data/blogs'
import { modalStore } from '@/stores/others/modal'
import { authStore } from '@/stores/auth/user'
import { hashtagsStore } from '@/stores/data/hashtag'
import { onMounted } from 'vue'
import { URL, options } from '@/helpers/api'
import { ref } from 'vue'
import { commentsStore } from '@/stores/data/comments'
import {
  getLikesFromLocalStorage,
  updateLikesInLocalStorage,
} from '@/stores/others/localStorageUtils'

const modalSt = modalStore()
const blogsSt = blogsStore()
const authSt = authStore()
const commentsSt = commentsStore()
const hashtagSt = hashtagsStore()

const user = ref({})

const processedText = (text) => {
  return hashtagSt.processedText(text)
}

const openCommentsPage = (blogId, state) => {
  modalSt.setToggle(blogId, state)
  console.log('Comments page is ' + state + ' for a blog with id:' + blogId)
}

const handleHashtagClick = (event) => {
  modalSt.handleHashtagClick(event)
}

const toggleLike = async (blog, userId) => {
  if (!blog) return
  try {
    const isLiked = await blogsSt.likeBlog(blog._id, userId) // Call store method
    blog.liked = isLiked // Update the `liked` state locally
    updateLikesInLocalStorage(blog._id, isLiked)
    console.log('Updated like status:', isLiked)
  } catch (error) {
    console.error('Failed to toggle like:', error)
  }
}

const submitComment = async (blogId, userId) => {
  await commentsSt.submitComment(blogId, userId)
}

const statusBlogs = async (blogId) => {
  await blogsSt.statusBlogs(blogId)
}

const remove = (id) => {
  ElMessageBox.confirm("Ma'lumot butunlay o'chiriladi, rozimisiz?", 'Diqqat!', {
    confirmButtonText: 'ha,roziman',
    cancelButtonText: 'bekor qilish',
    type: 'warning',
  })
    .then(async () => {
      await blogsSt.removeBlogs(id)
    })
    .catch(() => {
      ElMessage({
        type: 'info',
        message: "O'chirish bekor qilindi!",
      })
    })
}

onMounted(async () => {
  await blogsSt.myBlogs()
  // authSt.checkuser()
  await hashtagSt.allHashtags()
  user.value = { ...authSt.user }

  // for blog likes
  const likes = getLikesFromLocalStorage()
  blogsSt.myblogs.data.forEach((blog) => {
    blog.liked = likes[blog._id] || false
  })
})
</script>

<style lang="scss">
@import '@/styles/blogs/blogsTable.scss';
</style>
