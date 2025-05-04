<template>
  <el-aside class="aside">
    <div class="logo">BLOGS</div>
    <div class="navigation">
      <router-link
        v-for="link of mainMenu"
        :key="link.name"
        :to="{ name: link.name }"
        class="link"
        :class="`link ${link.name} ${route.name == link.name ? 'active' : ''}`"
      >
        <component :is="link?.meta?.icon"></component>
        {{ link?.meta?.title }}
      </router-link>
      <div class="actions">
        <el-popconfirm
          width="200"
          title="Tizimdan chiqmoqchimisiz?"
          confirm-button-text="Ha"
          cancel-button-text="Yo`q"
          confirm-button-type="danger"
          cancel-button-type="success"
          @confirm="handleLogout"
        >
          <template #reference>
            <el-button class="exit-btn" type="warning">
              <Back class="exit-svg" />

            </el-button>
          </template>
        </el-popconfirm>
        <el-divider direction="vertical" class="custom-divider"/>
        <router-link
          :to="{ name: 'profile' }"
          :key="profile.name"
          class="profile-btn"
          :class="` ${profile.name} ${route.name == 'profile' ? 'active' : ''}`"
        >
          <Avatar />
        </router-link>
      </div>
    </div>
  </el-aside>
</template>

<script setup>
import { useRoute } from 'vue-router'
import { authStore } from '@/stores/auth/user'
import { mainMenu } from '@/router/nav/routes'
import { profile } from '@/router/nav/routes'

const route = useRoute()
const authSt = authStore()

const handleLogout = () => {
  authSt.logout()
}
</script>

<style lang="scss" scoped>
.actions {
  display: flex;
  align-items: center;
  justify-content: center;
  margin-top: auto;
  padding: 6px;
  .exit-btn,
  .profile-btn {
    border-radius: 10px;
    padding: 8px;
    font-size: 16px;
    flex-basis: 50%;
    text-decoration: none;
    color: #fff;
    display: flex;
    align-items: center;
    justify-content: center;
    height: 34px;
    gap: 8px;
    .exit-svg {
      margin-right: 8px;
    }
  }
  .profile-btn {
    background-color: rgba(255, 255, 255, 0.3);
    &:hover {
      background-color: rgba(255, 255, 255, 0.2);
    }
    &.active {
      background-color: rgba(255, 255, 255, 0.8);
      color: $dodgeblue;
      &:hover {
        background-color: rgba(255, 255, 255, 0.8);
      }
    }
  }
}
.custom-divider {
  height: 32px;
  margin: 0px 16px;
}
@import '@/styles/layout/customAside';
</style>
