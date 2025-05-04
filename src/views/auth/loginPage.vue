<template>
  <div class="signin">
    <h1 class="title faculty-bold">Tizimga kirish</h1>
    <el-form :model="user" :rules="rules" label-position="top" status-icon class="form" ref="form">
      <el-form-item label="Login" prop="login">
        <el-input clearable type="text" v-model="user.login" :prefix-icon="User" @keyup.enter="focusPassword"></el-input>
      </el-form-item>
      <el-form-item label="Password" prop="password">
        <el-input
          ref="passwordInput"
          type="password"
          clearable
          v-model="user.password"
          :prefix-icon="Lock"
          show-password
          @keyup.enter="login"
        ></el-input>
      </el-form-item>

      <el-form-item>
        <el-button class="submit-btn" type="success" @click="login">Kirish</el-button>
      </el-form-item>
    </el-form>
    <p class="haveAccount">
      Akkaunt yo`qmi?
      {{ ' ' }}
      <router-link @click="log"
        :to="{ name: 'signup' }"
        class="thensignup"
        >Ro`yxatdan o`ting</router-link
      >
    </p>
  </div>
</template>

<script setup>
import { authStore } from '@/stores/auth/user'
import { User, Lock } from '@element-plus/icons-vue'
import { ElMessage } from 'element-plus'
import { ref } from 'vue'

const user = ref({})
const form = ref()
const passwordInput = ref(null)
const rules = {
  login: [
    {
      required: true,
      message: 'Loginni kiriting!',
      trigger: 'blur',
    },
  ],
  password: [
    {
      required: true,
      message: 'Parolni kiriting!',
      trigger: 'blur',
    },
  ],
}

const focusPassword = () => {
  if (passwordInput.value) {
    passwordInput.value.focus()
  }
}

const log = () => {
  console.log('alpha');

}

const store = authStore()
const login = async () => {
  if (!form.value) return false
  await form.value.validate(async (valid) => {
    if (valid) {
      console.log(user.value)
      await store.login(user.value)
    } else {
      ElMessage.error('Barcha maydonlarni to`ldiring!')
    }
  })
}
</script>

<style lang="scss" scoped>
.signin {
  background-color: #fff;
  padding: 20px;
  border-radius: 20px;
  width: 400px;
  .title {
    font-size: 20px;
    margin-bottom: 16px;
    text-align: center;
  }
}
.haveAccount {
  margin-top: 10px;
  text-align: center;
  font-size: 14px;
  color: gray;
  .thensignup {
    font-weight: 600;
    color: $dodgeblue;
    &:hover {
      color: lighten($dodgeblue, 30%);
    }
  }
}

.submit-btn {
  width: 100%;
  margin: 16px auto 0px;
}
</style>
