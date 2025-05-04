<template>
  <el-upload
    v-model:file-list="fileList"
    class="avatar-uploader"
    :action="`${URL}/blog/images`"
    list-type="picture-card"
    :headers="{
      Authorization: `Bearer ${token}`,
    }"
    :show-file-list="true"
    :before-upload="beforeUpload"
    :on-success="handleSuccess"
    :on-error="handleError"
    :on-remove="handleRemove"
    :on-preview="handlePreview"
    multiple
    
  >
    <el-icon class="avatar-uploader-icon"><Plus /></el-icon>
  </el-upload>
</template>

<script lang="ts" setup>
import { URL } from '@/helpers/api'
import { Plus } from '@element-plus/icons-vue'
import { computed } from 'vue'
import { ElMessage } from 'element-plus'

const fileList = defineModel()

const token = computed(() => {
  return sessionStorage.getItem('token') || ''
})

const beforeUpload = (file) => {
  const isImage = file.type.startsWith('image/')
  const isLt2M = file.size / 1024 / 1024 < 2
  if (!isImage) {
    ElMessage.error('Faqat rasm yuklash mumkin!')
  }
  if (!isLt2M) {
    ElMessage.error('Rasm hajmi 2MB dan katta bo`lmasligi kerak!')
  }
  return isImage && isLt2M
}

const handleSuccess = (response) => {
  console.log('Success',response);

  ElMessage.success('Rasm muvaffaqiyatli yuklandi!')
}

const handleError = (err) => {
  console.error('Upload error:', err)
  ElMessage.error('Rasmni yuklashda xatolik yuz berdi!')
}

const handleRemove = (file, fileList) => {
  console.log('Removed file:', file)
  console.log('Updated file list:', fileList)
}

const handlePreview = (file) => {
  window.open(file.url || file.response.url, '_blank')
}

</script>

<style scoped>
.avatar-uploader .avatar {
  width: 100px;
  height: 100px;
  display: block;
  object-fit: cover;
}
</style>

<style>
.avatar-uploader .el-upload {
  border: 1px dashed var(--el-border-color);
  border-radius: 6px;
  cursor: pointer;
  position: relative;
  overflow: hidden;
  transition: var(--el-transition-duration-fast);
}

.avatar-uploader .el-upload:hover {
  border-color: var(--el-color-primary);
}

.avatar-uploader-icon {
  font-size: 28px;
  color: var(--el-text-color-secondary);
  width: 100px;
  height: 100px;
  text-align: center;
}
</style>
