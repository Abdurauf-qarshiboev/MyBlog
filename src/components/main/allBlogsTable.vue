<template>
  <el-empty v-if="blogsSt.blogs.data.length == 0" description="Hozircha postlar mavjud emas..." />
  <div class="bg-white px-0 py-5 pb-16 sm:px-1" v-else>
    <div class="rounded-lg p-0 mx-auto max-w-7xl">
      <div class="mx-auto grid max-w-[32rem] grid-cols-1 gap-x-8 gap-y-5">
        <article
          v-for="blog of blogsSt.blogs.data"
          :key="blog._id"
          class="flex flex-col items-start justify-between"
        >
          <div class="relative w-full pl-1 pb-2 flex items-center gap-x-2">
            <a href="#">
              <img
                src="https://images.unsplash.com/photo-1519244703995-f4e0f30006d5?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                alt=""
                class="size-7 sm:size-9 rounded-full bg-gray-100"
              />
            </a>
            <div class="flex items-center justify-center gap-1 text-sm leading-6">
              <p class="font-bold text-black">
                <a href="#" class="font-semibold text-black w-fit">
                  {{ blog.userId?.name }}
                  {{ blog.userId?.lname }}
                </a>
              </p>
              <span class="hidden sm:block">·</span>
              <div class="hidden sm:block time text-sm text-gray-500">
                {{ blogsSt.timeSince(blog.createdAt) }}
              </div>
            </div>
          </div>
          <div class="relative w-full">
            <Splide
              :options="{
                ...options,
                arrows: blog.image?.length > 1,
                pagination: blog.image?.length > 1,
              }"
              aria-label="Post media"
            >
              <SplideSlide class="aspect-[32/28]" v-for="(img, index) in blog.image" :key="index">
                <img
                  v-if="blog.image?.length > 0"
                  :src="`${URL}/${img.response}`"
                  alt=""
                  class="h-full w-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
              <SplideSlide class="h-96" v-if="!blog.image || blog.image.length === 0">
                <img
                  src="@/assets/images/allBlogs/notfound.png"
                  alt="Placeholder Image"
                  class="w-full h-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
            </Splide>

            <div class="absolute inset-0 sm:rounded ring-1 ring-inset ring-gray-900/10" />
          </div>
          <div class="w-full px-1">
            <div class="mt-2 md-mt-4 flex items-center gap-x-3 text-xs">
              <button
                @click="toggleLike(blog, user._id)"
                href="#"
                class="relative rounded-full flex items-center justify-center gap-1 text-red-600 text-sm"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  :fill="blog?.liked ? 'red' : 'white'"
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
                @click="openCommentsPage(blog._id, true)"
                :key="blog._id"
                class="relative text-sm rounded-full flex items-center justify-center gap-1 hover:text-gray-500"
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
                {{ blog.commentCount }} ta izoh
              </button>
            </div>
            <div class="relative">
              <div class="mt-2 md:mt-3 text-sm sm:text-base font-semibold leading-5 text-black">
                {{ blog.title }}
              </div>
              <div @click="handleHashtagClick">
                <p :innerHTML="processedText(blog.text)" class="mt-1 text-sm text-black"></p>
              </div>
            </div>
            <div class="block sm:hidden mt-2">
              <div class="time text-xs sm:text-sm text-gray-600">
                {{ blogsSt.timeSince(blog.createdAt) }}
              </div>
            </div>
            <div
              v-if="blog.commentCount !== 0"
              class="hidden sm:block md:mt-2 text-xs sm:text-sm w-fit text-gray-600"
            >
              <button @click="openCommentsPage(blog._id, true)" :key="blog._id">
                Barcha izohlarni ko`rish
              </button>
            </div>
            <!-- my comment -->
            <div class="mt-3 hidden">
              <!-- comments array will be rendered from api here -->
            </div>
            <!-- commenting -->
            <div class="hidden sm:flex mt-3 items-start space-x-4 border-b border-gray-200 pb-2">
              <div class="min-w-0 flex-1">
                <form @submit.prevent="submitComment(blog._id, user._id)">
                  <div class="relative">
                    <label for="blogcomment" class="sr-only">Izoh qoldirish</label>
                    <textarea
                      :value="commentsSt.getCommentDraft(blog._id)"
                      @input="commentsSt.updateCommentDraft(blog._id, $event.target.value)"
                      rows="2"
                      name="blogcomment"
                      id="blogcomment"
                      class="block w-full resize-none border-0 border-transparent p-0 pr-10 text-gray-800 placeholder:text-gray-400 placeholder:text-sm focus:border-0 focus:ring-0 sm:text-sm sm:leading-6"
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
        </article>
      </div>
    </div>
  </div>
</template>

<script setup>
// import { ref } from 'vue'
import { authStore } from '@/stores/auth/user'
import { blogsStore } from '@/stores/data/blogs'
import { modalStore } from '@/stores/others/modal'
import { commentsStore } from '@/stores/data/comments'
import { hashtagsStore } from '@/stores/data/hashtag'
import { onMounted } from 'vue'
import { URL, options } from '@/helpers/api'
import {
  getLikesFromLocalStorage,
  updateLikesInLocalStorage,
} from '@/stores/others/localStorageUtils'
import { ref } from 'vue'

const authSt = authStore()
const blogsSt = blogsStore()
const modalSt = modalStore()
const commentsSt = commentsStore()
const hashtagSt = hashtagsStore()

const user = ref({})
console.log(user)

const processedText = (text) => {
  return hashtagSt.processedText(text)
}

const openCommentsPage = (blogId, state) => {
  modalSt.setToggle(blogId, state)
  console.log('Comments page is ' + state + ' for a blog with id:' + blogId)
}

const handleHashtagClick = (event) => {
  const target = event.target
  if (target.tagName === 'A' && target.classList.contains('hashtag-link')) {
    const hashtag = target.textContent
    modalSt.setSearchToggle(true, hashtag)
    console.log('Searching for:', hashtag)
  }
}

const toggleLike = async (blog, userId) => {
  if (!blog) return
  try {
    const isLiked = await blogsSt.likeBlog(blog._id, userId) // Call store method
    blog.liked = isLiked // Update the `liked` state locally
    console.log(blog)
    updateLikesInLocalStorage(blog._id, isLiked)
    console.log('Updated like  status:', isLiked)
  } catch (error) {
    console.error('Failed to toggle like:', error)
  }
}

const submitComment = (blogId, userId) => {
  commentsSt.submitComment(blogId, userId)
}

onMounted(async () => {
  try {
    await blogsSt.allBlogs()
    await hashtagSt.allHashtags()

    user.value = { ...authSt.user }
    const likes = getLikesFromLocalStorage()
    blogsSt.blogs.data.forEach((blog) => {
      blog.liked = likes[blog._id] || false
    })
  } catch (err) {
    console.error('Error loading blogs or hashtags:', err)
  }
})
</script>

<style lang="scss">
.scrollbar-hidden {
  scrollbar-width: none;
  

}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}

.comment-line-clamp-5 {
  display: -webkit-box;
  -webkit-line-clamp: 5;
  line-clamp: 5;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.comment-line-clamp-none {
  display: block;
  -webkit-line-clamp: unset;
  line-clamp: unset;
}
</style>
