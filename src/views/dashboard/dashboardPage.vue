<template>
  <allBlogsTable></allBlogsTable>
  <blogCommentsPage></blogCommentsPage>
  <searchModal></searchModal>
</template>

<script setup>
import searchModal from '@/components/layout/search/searchModal.vue'
import blogCommentsPage from './blogs/blogCommentsPage.vue'
import allBlogsTable from '@/components/main/allBlogsTable.vue'
</script>

<style lang="scss"></style>
