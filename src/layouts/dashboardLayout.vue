<template>
  <loader v-if="isLoading"></loader>
  <div v-else>
    <el-container>
      <el-header class="header">
        <headerNavigation />
      </el-header>
      <el-main class="scrollbar-hidden">
        <router-view />
      </el-main>
    </el-container>
  </div>
</template>
<script setup>
import headerNavigation from '@/components/layout/headerNavigation.vue'
import loader from '@/stores/others/loader.vue'
import { ref, onMounted } from 'vue'
import { blogsStore } from '@/stores/data/blogs'
import { hashtagsStore } from '@/stores/data/hashtag'
// import { commentsStore } from '@/stores/data/comments'

const blogsSt = blogsStore()
const hashtagSt = hashtagsStore()
// const commentsSt = commentsStore()

const isLoading = ref(true)

onMounted(async () => {
  try {
    isLoading.value = true
    await blogsSt.allBlogs()
    await hashtagSt.allHashtags()
  } catch (err) {
    console.error('Error fetching data:', err)
  } finally {
    // Set loading state to false after fetching is complete
    isLoading.value = false
  }
})
</script>
<style lang="scss">
.el-main {
  background-color: #fff;
  padding: 0;
}
.scrollbar-hidden {
  scrollbar-width: none;
}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.header {
  z-index: 10;
  height: 64px;
}
</style>
