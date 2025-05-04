import { ref } from 'vue'
import { defineStore } from 'pinia'

export const modalStore = defineStore('modalStore', () => {
  const toggle = ref(false)
  const editToggle = ref(false)
  const id = ref('')
  const comments = ref([])
  const searchToggle = ref(false)
  const searchingItem = ref('')

  const setSearchToggle = (value,item) => {
    searchToggle.value = value
    searchingItem.value = item
  }

  const setToggle = (_id, value) => {
    id.value = _id
    toggle.value = value
    console.log('current blog: ' + id.value, 'modal state' + toggle.value)
  }

  const editPost = (_id) => {
    id.value = _id
    toggle.value = true
    editToggle.value = true
  }

  const closeEdit = () => {
    toggle.value = false
    id.value = ''
    editToggle.value = false
  }

  const closeModal = () => {
    toggle.value = false
    id.value = ''
  }
  const closeSearchingModal = () => {
    searchToggle.value = false
    searchingItem.value = ''
  }

  const handleHashtagClick = (event) => {
    const target = event.target
    if (target.tagName === 'A' && target.classList.contains('hashtag-link')) {
      const hashtag = target.textContent
      setSearchToggle(true, hashtag)
      console.log('Searching for:', hashtag)
    }
  }

  return {
    closeEdit,
    setToggle,
    toggle,
    id,
    searchToggle,
    searchingItem,
    closeModal,
    editPost,
    comments,
    setSearchToggle,
    handleHashtagClick,
    closeSearchingModal,
  }
})
