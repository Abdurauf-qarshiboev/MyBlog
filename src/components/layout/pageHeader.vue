<template>
  <header class="headpart">
    <div class="creatingPage--top">
      <h1 class="subtitle">
        {{ route?.meta?.title || '' }}
      </h1>
    </div>
    <div class="btns">
      <slot></slot>
      <router-link
        class="el-button el-button--primary"
        v-if="routeName"
        :to="{ name: routeName }"
      >
        {{ routerTitle || 'Yangi post' }}
      </router-link>
    </div>
  </header>
</template>

<script setup>
import { useRoute } from 'vue-router'
const route = useRoute()

defineProps({
  toggleBtn: {
    type: Boolean,
    default: true,
  },
  routeName: {
    type: String,
    default: '',
  },
  routerTitle: {
    type: String,
    default: '',
  },
})
</script>

<style lang="scss">
.el-button {
  text-decoration: none;
}
.headpart {
  margin-bottom: 10px;
  .creatingPage--top {
    display: flex;
    gap: 20px;
    align-items: center;
  }
  .btns {
    display: flex;
    align-items: center;
  }
}
</style>
