import { api, URL } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const commentsStore = defineStore('commentsStore', () => {
  const url = `${URL}/comment`

  const comments = reactive({
    data: [],
    count: 0,
  })
  const commentDrafts = reactive({})

  const allComments = async () => {
    try {
      const { data } = await api.get(`${url}/all`)
      console.log('all comments:', data)
      comments.data = data.comments
      comments.count = data.count
    } catch (err) {
      console.error('Error in allComments:', err)
    }
  }

  const getComment = async (id) => {
    try {
      const { data } = await api.get(`${url}/findone/${id}`)
      return data
    } catch (err) {
      console.error(`Error fetching comment with id ${id}:`, err)
    }
  }

  const editComment = async (id, blogId, userId) => {
    const updatedCommentText = commentDrafts[blogId]
    const commentToUpdate = {
      _id: id,
      blogId: blogId,
      from: userId,
      to: 'too',
      text: updatedCommentText,
    }
    try {
      const { data } = await api.put(`${url}`, commentToUpdate)
      comments.data = comments.data.map((item) => (item._id === data._id ? data : item))
      ElMessage({
        type: 'success',
        message: "Izoh ma'lumotlari muvaffaqiyatli yangilandi!",
      })
      updateCommentDraft(blogId, '')
    } catch (err) {
      console.error('Error in editComment:', err)
      ElMessage({
        type: 'danger',
        message: 'Izohni yangilashda muammo yuz berdi!',
      })
    }
  }

  const removeComments = async (id) => {
    try {
      await api.delete(`${url}/delete/${id}`)
      comments.data = comments.data.filter((item) => item._id !== id)
      comments.count -= 1
      ElMessage({
        type: 'success',
        message: "Izoh muvaffaqiyatli o'chirildi!",
      })
    } catch (err) {
      console.error(`Error removing comment with id ${id}:`, err)
      ElMessage({
        type: 'error',
        message: "Izohni o'chirishda muammo yuz berdi!",
      })
    }
  }

  const updateCommentDraft = (blogId, text) => {
    commentDrafts[blogId] = text
    console.log(commentDrafts)
  }

  const getCommentDraft = (blogId) => {
    return commentDrafts[blogId] || ''
  }

  const submitComment = async (blogId, userId) => {
    const commentText = commentDrafts[blogId]
    if (commentText.trim() !== '') {
      const newComment = {
        blogId: blogId,
        from: userId,
        to: 'too',
        text: commentText,
      }
      try {
        const data = await api.post(`${url}/create`, newComment)
        console.log('new comment is submitted', data)
        comments.data = [data, ...comments.data]
        comments.count += 1
        ElMessage({
          type: 'success',
          message: "Yangi izoh muvaffaqiyatli qo'shildi!",
        })
        updateCommentDraft(blogId, '')
      } catch (err) {
        console.error('Error in newComments:', err)
        ElMessage({
          type: 'danger',
          message: err.response.data,
        })
        if (err.response?.data?.msg == 'Duplicate key error:') {
          ElMessage({
            type: 'danger',
            message: 'Bunday kodga ega izoh mavjud!!',
          })
        }
      }
    } else {
      ElMessage({
        type: 'warning',
        message: 'Izoh matni kiritilmagan!',
      })
    }
  }
  return {
    comments,
    allComments,
    getComment,
    removeComments,
    editComment,
    updateCommentDraft,
    getCommentDraft,
    submitComment,
  }
})
