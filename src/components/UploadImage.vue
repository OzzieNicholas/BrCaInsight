<script setup>
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'
import { UploadFilled } from '@element-plus/icons-vue'

const router = useRouter()

const goPrev = () => {
  router.push('/type')
}

const goNext = () => {
  ElMessage.success('图片上传成功（模拟）')
  router.push('/analyze')
}

const handleSuccess = (res) => {
  ElMessage.success(`文件 ${res.filename} 上传成功！`)
}
</script>

<template>
  <div class="upload-page">
    <el-steps :active="2" finish-status="success" align-center>
      <el-step title="病理类型" />
      <el-step title="上传图片" />
      <el-step title="查看分析" />
      <el-step title="保存报告" />
    </el-steps>

    <div class="upload-box">
      <p class="tip">请上传 .svs 类型的乳腺癌病理图像</p>

      <el-upload
        class="upload-area"
        drag
        action="http://localhost:8000/upload"
        :show-file-list="false"
        :on-success="handleSuccess"
        accept=".png, .jpg, .jpeg, .svs"
      >
        <el-icon><UploadFilled /></el-icon>
        <div class="el-upload__text">点击或拖拽上传</div>
        <template #tip>
          <div class="el-upload__tip">仅支持 .png/.jpg/jpeg/.svs 文件</div>
        </template>
      </el-upload>

      <div class="btns">
        <el-button @click="goPrev">上一步</el-button>
        <el-button type="primary" @click="goNext">下一步</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.upload-page {
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.upload-box {
  max-width: 600px;
  margin: 3rem auto;
  padding: 2rem;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  text-align: center;
}

.tip {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.upload-area {
  margin-bottom: 2rem;
}

.btns {
  display: flex;
  justify-content: space-between;
}
</style>
