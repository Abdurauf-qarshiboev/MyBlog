import { api, URL } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const blogsStore = defineStore('blogsStore', () => {
  const url = `${URL}/blog`

  const blogs = reactive({
    data: [],
    count: 0,
  })

  const myblogs = reactive({
    data: [],
    count: 0,
  })

  function timeSince(isoDateString) {
    if (!isoDateString) return 'Invalid date'

    const date = new Date(isoDateString)
    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }

    const now = new Date()
    const seconds = Math.floor((now - date) / 1000)

    // If the time difference is greater than 6 months (~26 weeks)
    if (seconds > 26 * 7 * 24 * 60 * 60) {
      return formatReadableDate(isoDateString)
    }

    const intervals = [
      { label: 'yil', seconds: 365 * 24 * 60 * 60 },
      { label: 'oy', seconds: 30 * 24 * 60 * 60 },
      { label: 'hafta', seconds: 7 * 24 * 60 * 60 },
      { label: 'kun', seconds: 24 * 60 * 60 },
      { label: 'soat', seconds: 60 * 60 },
      { label: 'minut', seconds: 60 },
      { label: 'sekund', seconds: 1 },
    ]

    for (const interval of intervals) {
      const count = Math.floor(seconds / interval.seconds)
      if (count > 0) {
        return `${count} ${interval.label} oldin`
      }
    }
    return 'hozir'
  }

  function formatReadableDate(isoDateString) {
    if (!isoDateString) return 'Invalid date'
    const date = new Date(isoDateString)
    if (isNaN(date.getTime())) {
      return 'Invalid date'
    }
    const options = {
      month: 'long',
      day: 'numeric',
      year: 'numeric',
      hour12: false,
    }
    return new Intl.DateTimeFormat('en-US', options)?.format(date)
  }

  const allBlogs = async () => {
    try {
      const { data } = await api.get(`${url}/all`)
      console.log('all blogs:', data)
      blogs.data = [...data.blogs]
      blogs.count = data.count
    } catch (err) {
      console.error('Error in allBlogs:', err)
    }
  }

  const myBlogs = async (params) => {
    try {
      const { data } = await api.get(`${url}/my`, { params })
      myblogs.data = [...data.blogs]
      myblogs.count = data.count
      console.log('my blogs:', myblogs)
    } catch (err) {
      console.error('Error in myBlogs:', err)
    }
  }

  const newBlogs = async (newBlog) => {
    console.log({...newBlog});
    try {
      const data = await api.post(`${url}/create`, newBlog)
      blogs.data = [data, ...blogs.data]
      blogs.count += 1
      ElMessage({
        type: 'success',
        message: "Yangi post muvaffaqiyatli qo'shildi!",
      })
    } catch (err) {
      console.error('Error in newBlogs:', err)
      if (err.response?.data?.msg == 'Duplicate key error:') {
        ElMessage({
          type: 'danger',
          message: 'Bunday kodga ega post mavjud!!',
        })
      }
    }
  }
  const getBlogById = (id) => {
    return blogs.data.find((blog) => blog._id === id)
  }

  const getBlog = async (id) => {
    try {
      return await api.get(`${url}/findone/${id}`)
    } catch (err) {
      console.error(`Error fetching blog with id ${id}:`, err)
    }
  }

  const saveBlogs = async (update) => {
    console.log(update);
    try {
      const { data } = await api.put(`${url}`, {
        ...update,
      })
      blogs.data = blogs.data.map((item) => (item._id === data._id ? data : item))
      ElMessage({
        type: 'success',
        message: "Post muvaffaqiyatli yangilandi!",
      })
    } catch (err) {
      console.error('Error in saveBlogs:', err)
    }
  }

  const statusBlogs = async (blogId) => {
    try {
      const { data } = await api.get(`${url}/change/${blogId}`)
      blogs.data = blogs.data.map((item) => (item._id === data._id ? data : item))

      ElMessage({
        type: 'success',
        message: 'Post holati yangilandi!',
      })
    } catch (err) {
      console.error(
        `Error with changing the status of the blog  with blogID : ${blogId}:`,
        err.response?.data?.message || err.message || err,
      )
      ElMessage({
        type: 'error',
        message: 'Post holatini yangilashda xatolik yuz berdi!',
      })
    }
  }

  const removeBlogs = async (id) => {
    try {
      await api.delete(`${url}/delete/${id}`)
      blogs.data = blogs.data.filter((item) => item._id !== id)
      blogs.count -= 1
      ElMessage({
        type: 'success',
        message: "Post muvaffaqiyatli o'chirildi!",
      })
    } catch (err) {
      console.error(`Error removing blog with id ${id}:`, err)
      ElMessage({
        type: 'error',
        message: "Postni o'chirishda muammo yuz berdi!",
      })
    }
  }


  const likeBlog = async (blogId, userId) => {
      const res = await api.post(`${URL}/like`, { blogId, userId })
      console.log(res, blogId, userId, res.data);
      const isLiked = res.data === 'yes';
      ElMessage({
        type: 'success',
        message: `Post ${isLiked ? 'liked' : 'unliked'} successfully!`,
      })
      return isLiked
  }

  return {
    blogs,
    allBlogs,
    newBlogs,
    getBlog,
    removeBlogs,
    saveBlogs,
    statusBlogs,
    myBlogs,
    myblogs,
    formatReadableDate,
    timeSince,
    getBlogById,
    likeBlog,
  }
})
