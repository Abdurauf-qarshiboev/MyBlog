import { api } from '@/helpers/api'
import router from '@/router'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { ref } from 'vue'
export const authStore = defineStore('authStore', () => {
  const user = ref({})
  const isAuth = ref(false)

  const signup = async (signupUser) => {
    try {
      const { data } = await api.post('auth/registration', signupUser)
      user.value = signupUser
      if (data?.error) {
        ElMessage.warning({
          title: 'Bunday foydalanuvchi mavjud!',
          message: 'Iltimos, boshqa login yozing!',
        })
      } else {
        ElMessage.success({
          title: 'Muvafaqqiyatli ro`yhatdan o`tdingiz',
          message: 'Tizimga login va parolingiz orqali kirishingiz mumkin.',
        })
        router.push({ name: 'login' })
      }
    } catch (error) {
      console.error(error)
      ElMessage.error('Ro`yxatdan o`tishda xatolik yuz berdi! Iltimos, qayta urinib ko`ring.')
    }
  }

  const login = async (loginuser) => {
    try {
      const { data } = await api.post(`auth/login`, loginuser)
      if (data) console.log(data)
      sessionStorage.setItem('token', data.token)
      user.value = { ...data.user }
      isAuth.value = true
      router.push({ name: 'home' })
    } catch (err) {
      console.error(err);
      ElMessage.error(err?.response?.data.message)
    }
  }

  const logout = () => {
    user.value = {}
    isAuth.value = false
    sessionStorage.removeItem('token')
    router.push({ name: 'login' })
    ElMessage.success('Tizimdan muvaffaqiyatli chiqdingiz!')
  }

  const checkuser = async () => {
    try {
      const { data } = await api.get('auth/checkuser')
      // console.log(data);
      user.value = { ...data }
      isAuth.value = true
    } catch (err) {
      console.log(err)
      logout()
    }
  }

  const updateUser = async (updatedUser) => {
    try {
      const userId = user.value._id // Assuming user ID is stored in the user object
      const { data } = await api.put(`auth/update/${userId}`, updatedUser)

      // Update local user state with the response data
      user.value = { ...data }
      ElMessage.success('Foydalanuvchi muvaffaqiyatli yangilandi!')
    } catch (error) {
      console.error(error)
      ElMessage.error('Foydalanuvchini yangilashda xatolik yuz berdi!')
    }
  }

  return {
    signup,
    login,
    user,
    isAuth,
    logout,
    checkuser,
    updateUser,
  }
})
