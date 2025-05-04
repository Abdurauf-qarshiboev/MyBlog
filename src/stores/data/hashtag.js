import { api, URL } from '@/helpers/api'
import { ElMessage } from 'element-plus'
import { defineStore } from 'pinia'
import { reactive } from 'vue'
export const hashtagsStore = defineStore('hashtagsStore', () => {
  const url = `${URL}/hashtag`
  const hashtagRegex = /#\w+(_\w+)*/g

  const hashtags = reactive({
    data: [],
    count: 0,
  })

  const processedText = (text) => {
    return text?.replace(
      hashtagRegex,
      (hashtag) => `<a href="#" class="hashtag-link text-blue-900 decoration-none">${hashtag}</a>`,
    )
  }

  const extractHashtags = (text) => {
    const postHashtags = text.match(hashtagRegex) || []
    console.log(postHashtags)
    return postHashtags
  }

  const allHashtags = async (title) => {
    try {
      const { data } = await api.get(`${url}/ `, { title })
      hashtags.data = [...data]
      hashtags.count = data.length
      console.log('all hashtags:', hashtags.data, 'hashtag count', hashtags.count)
    } catch (err) {
      console.error('Error in allHashtag:', err)
    }
  }

  const checkAndCreateHashtags = async (text) => {
    if (!text || text.trim().length === 0) {
      ElMessage({
        type: 'danger',
        message: 'Hashtag yaratishda muammo, matn mavjud emas!',
      })
      return
    }

    try {
      await allHashtags()

      const hashtagsFromText = extractHashtags(text)
      console.log(`Extracted hashtags from text:`, hashtagsFromText)

      const existingHashtags = hashtags.data.map((tag) => tag.name)
      const newHashtags = []

      for (const hashtag of hashtagsFromText) {
        if (!existingHashtags.includes(hashtag)) {
          const result = await newHashtag({ name: hashtag })
          console.log(result)
          if (result) newHashtags.push(result)
        }
      }

      console.log('New hashtags created:', newHashtags)

      return {
        allHashtags: [...hashtagsFromText, ...existingHashtags],
        newHashtags,
      }
    } catch (err) {
      console.error('Error in checkAndCreateHashtags:', err)
      throw err
    }
  }

  const newHashtag = async (name) => {
    try {
      const data = await api.post(`${url}`, name)
      console.log(data)
      hashtags.data = [data, ...hashtags.data]
      hashtags.count += 1
      ElMessage({
        type: 'success',
        message: "Yangi hashtag muvaffaqiyatli qo'shildi!",
      })
    } catch (err) {
      console.error('Error with creating new hashtag:', err)
      if (err.response?.data?.msg == 'Duplicate key error:') {
        ElMessage({
          type: 'danger',
          message: 'Bunday kodga ega hashtag mavjud!',
        })
      }
    }
  }

  const removeHashtag = async (id) => {
    try {
      await api.delete(`${url}/${id}`)
      hashtags.data = hashtags.data.filter((item) => item._id !== id)
      hashtags.count -= 1
      ElMessage({
        type: 'success',
        message: "Hashtag muvaffaqiyatli o'chirildi!",
      })
    } catch (err) {
      console.error(`Error removing hashtag with id ${id}:`, err)
      ElMessage({
        type: 'error',
        message: "hashtagni o'chirishda muammo yuz berdi!",
      })
    }
  }

  return {
    hashtags,
    hashtagRegex,
    processedText,
    extractHashtags,
    allHashtags,
    checkAndCreateHashtags,
    newHashtag,
    removeHashtag,
  }
})
