<template>
  <div class="p-2">
    <pageHeader :toggleBtn="false">
      <slot>
        <el-button type="default" @click="close"> Bekor qilish </el-button>
        <el-button :loading="isLoading" type="primary" @click="save"> Saqlash </el-button>
      </slot>
    </pageHeader>
    <el-form
      class="scrollbar-hidden"
      style="height: 80vh"
      :model="form"
      v-loading="isLoading"
      ref="elform"
    >
      <el-row :gutter="10" style="width: 100%">
        <el-col :span="24">
          <el-form-item
            class="postIMG"
            label="Post uchun  rasm(lar)"
            label-position="top"
            prop="photo"
          >
            <UploadPhoto v-model="form.image" model="media"></UploadPhoto>
          </el-form-item>
        </el-col>
        <el-col :span="24">
          <el-form-item
            label="Post sarlavhasi"
            label-position="top"
            prop="title"
            :rules="[
              {
                required: true,
                message: 'Ilimos, post sarlavhasini yozing!',
                trigger: 'blur',
              },
            ]"
          >
            <el-input v-model="form.title" autocomplete="off" placeholder="Post sarlavhasi" />
          </el-form-item>
        </el-col>
      </el-row>
      <div class="el-form-item__label">Post matni</div>
      <QuillEditor
        class="quill"
        :modules="modules"
        :toolbar="[
          ['bold', 'italic', 'underline', 'strike'], // toggled buttons
          ['blockquote'],
          ['link', 'image'],

          [{ header: 1 }, { header: 2 }], // custom button values
          [{ list: 'ordered' }, { list: 'bullet' }, { list: 'check' }],
          [{ script: 'sub' }, { script: 'super' }], // superscript/subscript
          [{ indent: '-1' }, { indent: '+1' }], // outdent/indent
          [{ direction: 'rtl' }],

          [{ color: [] }, { background: [] }], // dropdown with defaults from theme
          [{ font: [] }],
          [{ align: [] }],

          ['clean'], // Remove formatting
        ]"
        contentType="html"
        v-model:content="form.text"
        style="height: 490px"
        theme="snow"
      />
    </el-form>
  </div>
</template>

<script setup>
import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css'
import pageHeader from '@/components/layout/pageHeader.vue'
import { onMounted, ref } from 'vue'
import { modules, URL } from '@/helpers/api'
import UploadPhoto from '@/components/layout/uploadPhoto.vue'
import { blogsStore } from '@/stores/data/blogs'
import { hashtagsStore } from '@/stores/data/hashtag'
import { ElMessage } from 'element-plus'
import { useRouter, useRoute } from 'vue-router'

const router = useRouter()
const route = useRoute()
const elform = ref()
const form = ref({})
const blogsSt = blogsStore()
const hashtagSt = hashtagsStore()
const isLoading = ref(false)

const close = () => {
  form.value = {_id: '', title: '', text: '', image: [] }
  if (!elform.value) return false
  elform.value.resetFields()
  router.push({ name: 'myblogs' })
}

onMounted(async () => {
  isLoading.value = true
  form.value._id = route.params.id
  try {
    const { data } = await blogsSt.getBlog(form.value._id)
    console.log(data)
    form.value = {
      ...data,
      image: data.image.map((img) => ({
        ...img,
        url: img.response ? `${URL}/${img.response}` : img.url,
      })),
    }
  } catch (error) {
    console.error(error)
    ElMessage.error('Blogni yuklashda xatolik yuz berdi!')
  } finally {
    isLoading.value = false
  }
})

const save = async () => {
  console.log('saved')
  if (!elform.value) return false
  await elform.value.validate(async (valid) => {
    if (valid) {
      try {
        const { allHashtags } = await hashtagSt.checkAndCreateHashtags(form.value?.text)
        console.log(allHashtags)
        const { _id, title, text, image } = form.value
        await blogsSt.saveBlogs({ _id , title, text, image })
        close()
      } catch (error) {
        console.error(error)
        ElMessage.error('Blogni saqlashda xatolik yuz berdi!')
      } finally {
        isLoading.value = false
      }
    } else {
      ElMessage.error('Barcha maydonlarni to`ldiring!')
      isLoading.value = false
    }
  })
}
</script>

<style lang="scss">
.scrollbar-hidden {
  scrollbar-width: none;
}
.scrollbar-hidden::-webkit-scrollbar {
  display: none;
}
.el-form {
  margin-top: 40px;
  overflow-y: scroll;
}

.el-form-item__label {
  margin-bottom: 10px;
  margin-left: 6px;
  font-size: 14px;
  font-weight: 500;
}
.quill {
  margin-bottom: 40px;
}
.postIMG {
  display: flex;
  flex-direction: column;
  align-items: start;
  justify-content: start;
}
</style>
