<template>
  <div class="bg-white px-2 py-5 sm:px-6 sm:py-10 lg:px-8 overflow-auto">
    <div class="flex items-center justify-between">
      <h2
        class="text-start text-xl sm:text-2xl font-semibold tracking-tight text-gray-900 lg:text-3xl"
      >
        Profilim
      </h2>
      <button
        @click="turnOnEditingMode"
        class="block w-fit whitespace-nowrap rounded-md bg-cyan-600 px-3 py-2 sm:px-3 sm:py-2 text-center text-xs sm:text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-cyan-600"
      >
        Tahrirlash
      </button>
    </div>

    <div class="flex items-center gap-1 mt-12 max-w-2xl text-center">
      <Warning />
      <p class="text-balance text-base sm:text-lg font-semibold tracking-tight text-gray-900">
        Shaxsiy ma'lumotlar
      </p>
    </div>
    <el-divider />
    <form @submit.prevent="updateUser" class="mx-auto mt-6 sm:mt-6">
      <div class="grid grid-cols-2 gap-x-8 gap-y-6">
        <div
          class="col-span-2 sm:col-span-1 grid place-items-center w-3/5 h-56 mx-auto rounded-lg overflow-hidden"
        >
          <div class="relative inline-block">
            <Splide
              :options="{
                ...options,
                arrows: user.avatar?.length > 1,
                pagination: user.avatar?.length > 1,
              }"
              aria-label="Post media"
            >
              <SplideSlide class="aspect-[32/28]" v-for="(img, index) in user.avatar" :key="index">
                <img
                  v-if="user.avatar?.length !== 0"
                  :src="`${URL}/${img.response}`"
                  alt=""
                  class="h-full w-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
              <SplideSlide v-if="user.avatar?.length === 0">
                <img
                  src="@/assets/images/defaults/default_avatar.jpg"
                  alt=""
                  class="h-full w-full sm:rounded bg-gray-100 object-cover"
                />
              </SplideSlide>
            </Splide>
            <!-- <button
              class="absolute bottom-0 right-0 block translate-x-1/2 translate-y-1/2 transform rounded-full border-2 border-white group"
            >
              <PencilSquareIcon
                class="block size-5 rounded-full bg-white group-hover:scale-110 transition-all ease-out"
              />
            </button> -->
          </div>
        </div>
        <div
          class="col-span-2 sm:col-span-1 space-y-4 flex flex-col items-center justify-center md:block"
        >
          <div class="w-4/5">
            <label for="name" class="block text-sm/6 font-semibold text-gray-900">Ism</label>
            <div class="mt-1">
              <input
                type="text"
                name="name"
                id="name"
                class="w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm/6"
                :disabled="!isEditing"
                :class="!isEditing ? 'bg-gray-100' : ''"
                :value="user.name"
                v-model="user.name"
              />
            </div>
          </div>
          <div class="w-4/5">
            <label for="lname" class="block text-sm/6 font-semibold text-gray-900">Familiya</label>
            <div class="mt-1">
              <input
                type="text"
                name="lname"
                id="lname"
                class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm/6"
                :disabled="!isEditing"
                :class="!isEditing ? 'bg-gray-100' : ''"
                :value="user.lname"
                v-model="user.lname"
              />
            </div>
          </div>
        </div>

        <div class="sm:col-span-1 w-4/5">
          <label for="email" class="block text-sm/6 font-semibold text-gray-900">Email</label>
          <div class="mt-1">
            <input
              type="email"
              name="email"
              id="email"
              autocomplete="email"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm/6"
              :disabled="!isEditing"
              :class="!isEditing ? 'bg-gray-100' : ''"
              :value="user.email"
              v-model="user.email"
            />
          </div>
        </div>
        <div class="sm:col-span-1 w-4/5">
          <label for="phone" class="block text-sm/6 font-semibold text-gray-900"
            >Telefon raqami</label
          >
          <div class="relative mt-1">
            <input
              type="tel"
              name="phone"
              id="phone"
              autocomplete="tel"
              class="block text-sm w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm/6"
              :disabled="!isEditing"
              :class="!isEditing ? 'bg-gray-100' : ''"
              :value="user.phone"
              v-model="user.phone"
            />
          </div>
        </div>
      </div>
    </form>
    <div class="flex items-center gap-1 mt-16 max-w-2xl text-center">
      <Lock />
      <p class="text-balance text-base sm:text-lg font-semibold tracking-tight text-gray-900">
        Xavfsizlik
      </p>
    </div>
    <el-divider />
    <form @submit.prevent="updateUser" class="mx-auto mt-6 sm:mt-6">
      <div class="grid grid-cols-1 gap-x-8 gap-y-6 sm:grid-cols-2">
        <div class="sm:col-span-1 w-4/5 mx-auto">
          <label for="login" class="block text-sm/6 font-semibold text-gray-900">Login</label>
          <div class="mt-1">
            <input
              type="text"
              name="login"
              id="login"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm/6"
              :disabled="!isEditing"
              :class="!isEditing ? 'bg-gray-100' : ''"
              :value="user.login"
              v-model="user.login"
            />
          </div>
        </div>
        <div class="sm:col-span-1 w-4/5 mx-auto">
          <label for="password" class="block text-sm/6 font-semibold text-gray-900">Parol</label>
          <div class="mt-1">
            <input
              type="password"
              name="password"
              id="password"
              class="block w-full rounded-md border-0 px-3.5 py-2 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 text-sm sm:text-sm/6"
              :disabled="!isEditing"
              :class="!isEditing ? 'bg-gray-100' : ''"
              :value="user.password"
              v-model="user.password"
            />
          </div>
        </div>
      </div>
    </form>
    <el-divider v-if="isEditing"></el-divider>
    <div v-if="isEditing" class="flex items-center justify-end gap-4 mt-10">
      <button
        @click="resetAll"
        type="submit"
        class="block w-fit ml-auto rounded-md bg-red-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white whitespace-nowrap shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
      >
        Bekor qilish
      </button>
      <button
        @click="updateUser"
        type="submit"
        class="block w-fit whitespace-nowrap rounded-md bg-green-600 px-3.5 py-2.5 text-center text-sm font-semibold text-white shadow-sm hover:bg-green-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-green-600"
      >
        Saqlash
      </button>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { authStore } from '@/stores/auth/user'
import { options, URL } from '@/helpers/api'
const authSt = authStore()
const user = ref({})
let isEditing = ref(false)

const turnOnEditingMode = () => {
  isEditing.value = true
}
const updateUser = async () => {
  const updatedUser = {
    login: user.value.login,
    password: user.value.password, // Ensure you're handling passwords securely
    name: user.value.name,
    lname: user.value.lname,
    phone: user.value.phone,
    email: user.value.email,
    // avatar: user.value.avatar, // Handle avatar if necessary
  }

  authSt.updateUser(updatedUser).then(() => {
    isEditing.value = false
    // Exit editing mode on success
  })
}

onMounted(() => {
  authSt.checkuser()
  user.value = { ...authSt.user }
  console.log(user.value)
})
</script>
