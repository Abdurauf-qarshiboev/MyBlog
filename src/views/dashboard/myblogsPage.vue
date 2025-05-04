<template>
  <myBlogsTable></myBlogsTable>
  <blogCommentsPage></blogCommentsPage>
  <searchModal></searchModal>
</template>

<script setup>
import searchModal from '@/components/layout/search/searchModal.vue';
import blogCommentsPage from './blogs/blogCommentsPage.vue'
import myBlogsTable from '@/components/main/myBlogsTable.vue'
</script>

<style lang="scss"></style>
