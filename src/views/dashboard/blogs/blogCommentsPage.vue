<template>
  <TransitionRoot as="template" :show="open">
    <Dialog as="div" class="relative z-10" @close="close">
      <TransitionChild
        as="template"
        enter="ease-out duration-300"
        enter-from="opacity-0"
        enter-to="opacity-100"
        leave="ease-in duration-200"
        leave-from="opacity-100"
        leave-to="opacity-0"
      >
        <div class="fixed inset-0 bg-black bg-opacity-70 transition-opacity" />
      </TransitionChild>

      <div class="fixed inset-0 z-10 overflow-y-auto" :class="open ? '' : 'hidden'">
        <div class="absolute right-0 top-0 pr-3 pt-3">
          <button
            type="button"
            class="rounded-md bg-transparent text-white focus:outline-none focus:ring-0 focus:ring-none focus:ring-offset-0"
            @click="close"
          >
            <span class="sr-only">Close</span>
            <XMarkIcon class="size-7" aria-hidden="true" />
          </button>
        </div>
        <div
          class="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0"
        >
          <TransitionChild
            as="template"
            enter="ease-out duration-300"
            enter-from="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
            enter-to="opacity-100 translate-y-0 sm:scale-100"
            leave="ease-in duration-200"
            leave-from="opacity-100 translate-y-0 sm:scale-100"
            leave-to="opacity-0 translate-y-4 sm:translate-y-0 sm:scale-95"
          >
            <DialogPanel
              class="relative transform overflow-hidden shadow-xl transition-all my-auto flex min-h-[20rem] sm:min-h-[30rem] md:min-h-[48rem] max-h-[54rem] sm:w-[calc(100%-64px-64px)] mx-auto max-w-[80rem] bg-white rounded"
            >
              <div
                class="flex flex-col items-center justify-center max-w-[45rem] w-full lg:w-100 bg-black rounded-l"
              >
                <div class="grid place-content-center w-full h-full">
                  <Splide
                    class="w-full h-full"
                    :options="{
                      ...options,
                      arrows: blog.image?.length > 1,
                      pagination: blog.image?.length > 1,
                    }"
                    aria-label="My Favorite Images"
                  >
                    <SplideSlide v-for="(img, index) in blog.image" :key="index">
                      <img
                        v-if="blog.image?.length > 0"
                        :src="`${URL}/${img.response}`"
                        alt=""
                        class="bg-transprent object-contain w-full h-auto"
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
                </div>
              </div>
              <div
                class="relative hidden flex-1 lg:min-w-[25rem] min-w-[21rem] md:min-w-[23rem] sm:flex flex-col items-start justify-center pt-2"
              >
                <!-- top -->
                <div class="w-full flex items-center gap-x-3 mb-2 lg:mb-3 px-3 lg:px-4 py-1">
                  <img
                    src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                    alt=""
                    class="size-9 rounded-full bg-gray-100"
                  />
                  <div class="flex items-center justify-center gap-1 text-sm leading-6">
                    <a href="#" class="font-semibold hover:text-gray-500 leading-5 text-sm">
                      {{ blog.userId?.name }}
                      {{ blog.userId?.lname }}
                    </a>
                  </div>
                </div>
                <!-- center -->
                <div
                  class="flex-1 w-full overflow-y-auto p-3 lg:p-4 border-b border-t border-gray-200 scrollbar-hidden"
                >
                  <div class="flex gap-x-3 pb-2 lg:pb-3">
                    <a href="#" class="size-8 flex-none">
                      <img
                        src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                        alt=""
                        class="rounded-full bg-gray-100"
                    /></a>
                    <div class="flex-auto">
                      <div class="flex items-baseline justify-between gap-x-3 text-sm">
                        <a href="#" class="font-semibold hover:text-gray-500 leading-5 text-sm">
                          {{ blog.userId?.name }}
                          {{ blog.userId?.lname }}
                        </a>
                      </div>
                      <div @click="handleHashtagClick">
                        <div
                          :innerHTML="processedText(blog.text)"
                          class="text-sm leading-5 text-black text-left"
                        ></div>
                      </div>
                    </div>
                  </div>
                  <ul role="list" class="h-auto">
                    <li
                      v-for="comment in comments"
                      :key="comment._id"
                      class="flex gap-x-3 lg:py-3 py-2"
                    >
                      <a href="#" class="size-8 flex-none"
                        ><img
                          class="rounded-full bg-gray-50"
                          src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                          alt=""
                      /></a>
                      <div class="flex-auto">
                        <div class="flex items-center justify-between">
                          <div class="flex items-center justify-start gap-x-2">
                            <div
                              class="text-sm font-semibold leading-5 text-black hover:text-gray-500 cursor-pointer"
                            >
                              {{ comment.from.name }} {{ comment.from.lname }}
                            </div>
                          </div>
                        </div>
                        <div class="flex flex-col items-center" id="commentContainer">
                          <div @click="handleHashtagClick" class="w-full">
                            <p
                              :innerHTML="processedText(comment.text)"
                              class="text-sm text-left w-full leading-5 text-black"
                              :class="
                                expandedComments.includes(comment._id)
                                  ? 'line-clamp-none'
                                  : 'line-clamp-4'
                              "
                            ></p>
                          </div>
                          <button
                            v-if="comment.isTruncated"
                            @click="toggleCommentExpansion(comment._id)"
                            class="w-fit mt-1 font-semibold text-[#737373] text-xs hover:text-[#737373b3]"
                          >
                            {{
                              expandedComments.includes(comment._id)
                                ? '(Kamroq o`qish)'
                                : '(Barchasini o`qish)'
                            }}
                          </button>
                        </div>
                        <div class="flex items-center gap-x-2 group">
                          <div class="flex-none text-xs leading-5 text-gray-600">
                            {{ blogsSt.timeSince(comment.createdAt) }}
                          </div>
                          <div>
                            <Menu
                              v-if="comment.from._id == user._id"
                              as="div"
                              class="relative flex-none"
                            >
                              <MenuButton class="block text-gray-500 hover:text-black">
                                <span class="sr-only">Actions</span>
                                <EllipsisHorizontalIcon class="h-4 w-4" aria-hidden="true" />
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
                                  class="absolute right-3 top-1 z-10 w-24 origin-top-right rounded-md bg-white py-0 overflow-hidden shadow-lg ring-1 px-[6px] ring-gray-900/5 focus:outline-none"
                                >
                                  <MenuItem v-slot="{ active }">
                                    <button
                                      @click="
                                        editComment(comment._id, comment.text), focusTextarea()
                                      "
                                      :class="[
                                        active ? 'bg-gray-50' : '',
                                        'flex items-center justify-between px-0 py-1 text-sm leading-6 text-yellow-600 w-full text-left',
                                      ]"
                                    >
                                      Tahrirlash
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="currentColor"
                                        class="size-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m16.862 4.487 1.687-1.688a1.875 1.875 0 1 1 2.652 2.652L10.582 16.07a4.5 4.5 0 0 1-1.897 1.13L6 18l.8-2.685a4.5 4.5 0 0 1 1.13-1.897l8.932-8.931Zm0 0L19.5 7.125M18 14v4.75A2.25 2.25 0 0 1 15.75 21H5.25A2.25 2.25 0 0 1 3 18.75V8.25A2.25 2.25 0 0 1 5.25 6H10"
                                        />
                                      </svg>
                                      <span class="sr-only">, {{ comment._id }}</span>
                                    </button>
                                  </MenuItem>
                                  <MenuItem v-slot="{ active }">
                                    <button
                                      @click="removeComment(comment._id)"
                                      :class="[
                                        active ? 'bg-gray-50' : '',
                                        ' px-0 py-1 text-sm leading-6 text-red-700 flex items-center justify-between w-full text-left',
                                      ]"
                                    >
                                      O`chirish
                                      <svg
                                        xmlns="http://www.w3.org/2000/svg"
                                        fill="none"
                                        viewBox="0 0 24 24"
                                        stroke-width="1.5"
                                        stroke="#C62828"
                                        class="size-4"
                                      >
                                        <path
                                          stroke-linecap="round"
                                          stroke-linejoin="round"
                                          d="m14.74 9-.346 9m-4.788 0L9.26 9m9.968-3.21c.342.052.682.107 1.022.166m-1.022-.165L18.16 19.673a2.25 2.25 0 0 1-2.244 2.077H8.084a2.25 2.25 0 0 1-2.244-2.077L4.772 5.79m14.456 0a48.108 48.108 0 0 0-3.478-.397m-12 .562c.34-.059.68-.114 1.022-.165m0 0a48.11 48.11 0 0 1 3.478-.397m7.5 0v-.916c0-1.18-.91-2.164-2.09-2.201a51.964 51.964 0 0 0-3.32 0c-1.18.037-2.09 1.022-2.09 2.201v.916m7.5 0a48.667 48.667 0 0 0-7.5 0"
                                        />
                                      </svg>

                                      <span class="sr-only"> {{ comment._id }}</span>
                                    </button>
                                  </MenuItem>
                                </MenuItems>
                              </transition>
                            </Menu>
                          </div>
                        </div>
                      </div>
                    </li>
                  </ul>
                </div>
                <!-- bottom -->
                <div class="w-full">
                  <!-- actions -->
                  <div class="w-full flex items-center gap-x-2 text-sm mt-1 px-3 lg:px-4 py-1">
                    <button
                      @click="toggleLike(blog, user._id)"
                      class="relative z-10 rounded-full flex items-center justify-center gap-1 text-red-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        :fill="blog?.liked ? 'red' : 'white' || 'white'"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="red"
                        class="size-7"
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
                      @click="focusTextarea"
                      class="relative z-10 rounded-full flex items-center justify-center gap-1 hover:text-gray-500"
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke-width="1.5"
                        stroke="currentColor"
                        class="size-7"
                      >
                        <path
                          stroke-linecap="round"
                          stroke-linejoin="round"
                          d="M12 20.25c4.97 0 9-3.694 9-8.25s-4.03-8.25-9-8.25S3 7.444 3 12c0 2.104.859 4.023 2.273 5.48.432.447.74 1.04.586 1.641a4.483 4.483 0 0 1-.923 1.785A5.969 5.969 0 0 0 6 21c1.282 0 2.47-.402 3.445-1.087.81.22 1.668.337 2.555.337Z"
                        />
                      </svg>
                    </button>
                  </div>
                  <!-- stats -->
                  <div class="w-full flex flex-col items-start justify-center px-4 lg:px-5 py-1">
                    <div class="text-sm text-gray-700 font-bold">{{ comments.length }} ta izoh</div>
                    <div class="time text-sm text-gray-500">
                      {{ blogsSt.timeSince(blog.createdAt) }}
                    </div>
                  </div>
                  <!-- commenting -->
                  <div
                    class="w-full mt-1 py-2 px-3 lg:px-4 flex items-start space-x-4 border-t border-gray-300"
                  >
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
                            class="block w-full resize-none border-0 border-transparent p-0 pr-10 text-gray-800 placeholder:text-gray-400 placeholder:text-sm focus:border-0 focus:ring-0 sm:text-sm sm:leading-6 scrollbar-none"
                            placeholder="Izoh qoldirish..."
                          />
                          <button
                            type="submit"
                            class="inline-flex items-center rounded-md text-sm font-semibold bg-transparent text-gray-400 hover:text-gray-500 absolute top-1 right-0"
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
              </div>
            </DialogPanel>
          </TransitionChild>
        </div>
      </div>
    </Dialog>
  </TransitionRoot>
</template>
<script setup>
import { ref, onMounted, watch } from 'vue'
import { Dialog, DialogPanel, TransitionChild, TransitionRoot } from '@headlessui/vue'
import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/vue'
import { EllipsisHorizontalIcon } from '@heroicons/vue/20/solid'
import { XMarkIcon } from '@heroicons/vue/24/outline'
import { modalStore } from '@/stores/others/modal'
import { blogsStore } from '@/stores/data/blogs'
import { authStore } from '@/stores/auth/user'
import { commentsStore } from '@/stores/data/comments'
import {
  getLikesFromLocalStorage,
  updateLikesInLocalStorage,
} from '@/stores/others/localStorageUtils'
import { URL, options } from '@/helpers/api'
import { hashtagsStore } from '@/stores/data/hashtag'

const blogsSt = blogsStore()
const modalSt = modalStore()
const commentsSt = commentsStore()
const hashtagSt = hashtagsStore()
const authSt = authStore()
const user = ref({})

const blog = ref({})
const comments = ref([])
const open = ref(false)

const editingCommentId = ref(null)

watch(
  () => modalSt.id,
  (to) => {
    blog.value = blogsSt.getBlogById(to)
    if (blog.value) {
      comments.value = [...blog.value.comments]
      comments.value = comments.value.map((comment) => ({
        ...comment,
        isTruncated: comment.text.length > 200,
      }))
      console.log(comments.value)
    }
  },
)
watch(
  () => modalSt.toggle,
  (to) => {
    open.value = to
    if (!to) {
      blog.value = {}
      comments.value = []
    }
  },
)

const processedText = (text) => {
  return hashtagSt.processedText(text)
}

const handleHashtagClick = (event) => {
  close()
  modalSt.handleHashtagClick(event)
}

const toggleLike = async (blog, userId) => {
  if (!blog) return
  try {
    const isLiked = await blogsSt.likeBlog(blog._id, userId)
    blog.liked = isLiked
    updateLikesInLocalStorage(blog._id, isLiked)
    console.log('Updated like status:', isLiked)
  } catch (error) {
    console.error('Failed to toggle like:', error)
  }
}

const close = () => {
  open.value = false
  setTimeout(() => {
    modalSt.closeModal()
    blog.value = {}
    comments.value = []
  }, 300)
}

const expandedComments = ref([])

const focusTextarea = () => {
  const textarea = document.getElementById('comment')
  textarea.scrollIntoView({ behavior: 'smooth', block: 'center' })
  textarea.focus()
}

const toggleCommentExpansion = (commentId) => {
  if (expandedComments.value.includes(commentId)) {
    expandedComments.value = expandedComments.value.filter((id) => id !== commentId)
  } else {
    expandedComments.value.push(commentId)
  }
}

const editComment = async (commentId) => {
  const data = await commentsSt.getComment(commentId)
  console.log(data?.text)
  if (data) {
    editingCommentId.value = data._id
    commentsSt.updateCommentDraft(blog.value._id, data.text)
  }
}

const submitComment = async (blogId, userId) => {
  if (editingCommentId.value) {
    const updatedCommentText = commentsSt.getCommentDraft(blogId)
    const { allHashtags } = await hashtagSt.checkAndCreateHashtags(updatedCommentText)
    console.log('comment hashtags after editing: ', allHashtags)
    await commentsSt.editComment(editingCommentId.value, blogId, userId)
    editingCommentId.value = null
  } else {
    const commentText = commentsSt.getCommentDraft(blogId)
    const { allHashtags } = await hashtagSt.checkAndCreateHashtags(commentText)
    console.log('comment hashtags at first attempt: ', allHashtags)
    await commentsSt.submitComment(blogId, userId)
  }
}

const removeComment = async (id) => {
  try {
    await commentsSt.removeComments(id)
  } catch (err) {
    console.error(id, ' Izohni o`chirishda muammo: ', err)
  }
}

onMounted(async () => {
  await blogsSt.allBlogs()
  user.value = { ...authSt.user }

  const likes = getLikesFromLocalStorage()
  blogsSt.blogs.data.forEach((blog) => {
    blog.liked = likes[blog._id] || false
  })
})
</script>
<style lang=""></style>
