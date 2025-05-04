import { ref } from 'vue'

export const passwordInput = ref(null)
export const lnameInput = ref(null)
export const emailInput = ref(null)
export const phoneInput = ref(null)

export const focusPassword = () => {
  if (passwordInput.value) {
    passwordInput.value.focus()
  }
}

export const focusLname = () => {
  if (lnameInput.value) {
    lnameInput.value.focus()
  }
}

export const focusEmail = () => {
  if (emailInput.value) {
    emailInput.value.focus()
  }
}

export const focusPhone = () => {
  if (phoneInput.value) {
    phoneInput.value.focus()
  }
}
