<template>
  <div class="signup">
    <h1 class="title faculty-bold">Ro`yxatdan o`tish</h1>
    <p class="haveAccount redtext">
      * Iltimos, ro`yxatdan o`tish uchun quyidagi formani kerakli ma`lumotlar bilan to`ldiring.
    </p>
    <el-form
      :model="user"
      :rules="inputRules"
      label-position="top"
      status-icon
      class="form"
      ref="form"
    >
      <el-divider content-position="left">Shaxsiy ma`lumotlar</el-divider>
      <el-row :gutter="30">
        <el-col :span="12">
          <el-form-item label="Ism" prop="name">
            <el-input
              clearable
              v-model="user.name"
              ref="nameInput"
              :prefix-icon="UserFilled"
              @keyup.enter="focusLname"
              placeholder="Sadulla"
            ></el-input>
          </el-form-item>
        </el-col>
        <el-col :span="12">
          <el-form-item label="Familiya" prop="lname">
            <el-input
              clearable
              v-model="user.lname"
              ref="lnameInput"
              placeholder="Abdullaev"
              :prefix-icon="Tickets"
              @keyup.enter="focusEmail"
            ></el-input>
          </el-form-item>
        </el-col>
      </el-row>
      <el-row gutter="20">
        <el-col :span="16">
          <el-form-item label="Email" prop="email">
            <el-input
              clearable
              v-model="user.email"
              ref="emailInput"
              placeholder="adminbek"
              :prefix-icon="ChatDotRound"
              @keyup.enter="focusPhone"
            >
              <template #append> @gmail.com </template>
            </el-input>
          </el-form-item>
          <el-form-item label="Telefon raqam" prop="phone">
            <el-input
              clearable
              v-model="user.phone"
              ref="phoneInput"
              v-maska="'(##)-###-##-##'"
              placeholder="(93)-165-65-10"
            >
              <template #prepend>+998</template>
            </el-input>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item label="Profil rasmi" label-position="top" class="avatarUploader">
            <uploadPhoto v-model="user.avatar" model="avatar" />
          </el-form-item>
        </el-col>
      </el-row>

      <el-divider content-position="left">Login va Parol</el-divider>
      <el-form-item label="Login" prop="login">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Shaxsiy ma`lumotlar to`ldirilmagan"
          placement="top"
          v-if="isInfosComplete"
        >
          <el-input
            v-model="user.login"
            ref="loginInput"
            :prefix-icon="User"
            :disabled="isInfosComplete"
            :placeholder="!isInfosComplete ? 'adminbek' : ''"
            @keyup.enter="focusPassword"
          ></el-input>
        </el-tooltip>
        <el-input
          v-model="user.login"
          ref="loginInput"
          :prefix-icon="User"
          :disabled="isInfosComplete"
          :placeholder="!isInfosComplete ? 'adminbek' : ''"
          @keyup.enter="focusPassword"
          v-if="!isInfosComplete"
        ></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-tooltip
          class="box-item"
          effect="dark"
          content="Shaxsiy ma`lumotlar to`ldirilmagan"
          placement="top"
          v-if="isInfosComplete"
        >
          <el-input
            ref="passwordInput"
            type="password"
            v-model="user.password"
            :prefix-icon="Lock"
            show-password
            :placeholder="!isInfosComplete ? 'adminbek12345' : ''"
            :disabled="isInfosComplete"
            @keyup.enter="signup"
          ></el-input>
        </el-tooltip>

        <el-input
          ref="passwordInput"
          type="password"
          v-model="user.password"
          :prefix-icon="Lock"
          show-password
          :placeholder="!isInfosComplete ? 'adminbek12345' : ''"
          :disabled="isInfosComplete"
          @keyup.enter="signup"
          v-if="!isInfosComplete"
        ></el-input>
      </el-form-item>
      <el-form-item>
        <el-button class="submit-btn" type="success" @click="signup"
          >Ro`yxatdan o`tish</el-button
        >
      </el-form-item>
    </el-form>
    <p class="haveAccount">
      Akkaunt bormi?
      {{ ' ' }}
      <router-link :to="{ name: 'login' }" class="thenlogin">Tizimga kiring</router-link>
    </p>
  </div>
</template>

<script setup>
import { authStore } from '@/stores/auth/user'
import { inputRules } from '@/stores/others/rules'
import { User, Lock, ChatDotRound, UserFilled, Tickets } from '@element-plus/icons-vue'
import { ElDivider, ElMessage, ElRow } from 'element-plus'
import { ref, computed } from 'vue'
import {
  passwordInput,
  lnameInput,
  emailInput,
  phoneInput,
  focusPassword,
  focusLname,
  focusEmail,
  focusPhone,
} from '@/stores/others/useFocus'
import uploadPhoto from '@/components/layout/uploadPhoto.vue'
const user = ref({})
const form = ref()
const store = authStore()

const isInfosComplete = computed(() => {
  return !(user.value.name && user.value.lname && user.value.email && user.value.phone)
})

const signup = async () => {
  if (!form.value) return false
  await form.value.validate(async (valid) => {
    if (valid) {
      console.log(user.value)
      await store.signup(user.value)
    } else {
      ElMessage.error('Barcha maydonlarni to`ldiring!')
    }
  })
}

import { vMaska } from 'maska/vue'
</script>

<style lang="scss" scoped>
@import '@/styles/layout/signupStyles.scss';
</style>
