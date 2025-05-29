<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ElMessage } from 'element-plus'
import { UploadFilled, Picture } from '@element-plus/icons-vue'
import { computed, ref } from 'vue'

const route = useRoute()
const router = useRouter()

// **新增：模拟数据库存储的病理信息**
const mockDatabase = {
  'image001.png': { // 图片文件名作为键
    pathologyNumber: 'XXXXXX',
    name: 'XXXXXX',
    age: 'XX',
    department: 'XXX科',
    morphology: '肿瘤组织呈巢片状，浸润性生长，巢团中央可见坏死，肿瘤细胞异型性明显，细胞核大深染。',
    diagnosis: '左乳：切除一切乳腺\n标本，大小20cm×16cm×4cm，梭形\n皮肤15cm×6cm，距乳头0.5cm上方可见一个2.5cm×2.5cm×2cm的肿物，切面灰白质硬\n\n东院免疫结果：Er（0%阳性），HER2（3+），\nKi（阳性细胞数70%），P53（0%阳性），AR（0%阳性），\nCK5/6（0%阳性），P63（浸润区肌上皮-），\nCalponin（浸润区肌上皮-）左乳：瘤床处乳腺浸润性导管癌Ⅲ级，未见明确脉管瘤栓及神经受侵（MP分级3级）。\n底源（-）。\n乳头（-）。\n淋巴结：第一水平1/12，第二水平0/1，腋静脉上淋巴结0/2，肌间组织0/1转移。'
  }
}

const pathologyType = computed(() => {
  const type = route.query.type
  return type ? decodeURIComponent(type) : '乳腺癌'
})

// 新增状态：存储上传的文件信息
const uploadedFile = ref(null)
const previewVisible = ref(false)
const previewImageUrl = ref('')

const goPrev = () => {
  router.push('/type')
}

const goNext = () => {
  if (!uploadedFile.value) {
    ElMessage.warning('请先上传图片')
    return
  }

  // 从模拟数据库获取病理信息
  const fileName = uploadedFile.value.name // 获取上传的文件名
  const pathologyData = mockDatabase[fileName] || {} // 根据文件名匹配数据

  if (!pathologyData.pathologyNumber) {
    ElMessage.error('未找到该图片对应的病理信息')
    return
  }

  ElMessage.success('图片上传成功')

  // 传递病理信息和图片URL到分析页面
  const fileUrl = URL.createObjectURL(uploadedFile.value.raw)
  router.push({
    path: '/analyze',
    query: { 
      type: pathologyType.value,
      imageUrl: fileUrl,
      // **新增参数：传递病理信息**
      pathologyNumber: pathologyData.pathologyNumber,
      name: pathologyData.name,
      age: pathologyData.age,
      department: pathologyData.department,
      morphology: pathologyData.morphology,
      diagnosis: pathologyData.diagnosis
    }
  })
}

const handleSuccess = (response, file) => {
  uploadedFile.value = file
  ElMessage.success(`文件 ${file.name} 上传成功！`)
}

const handleRemove = () => {
  uploadedFile.value = null
}

const handlePreview = () => {
  if (uploadedFile.value) {
    previewImageUrl.value = URL.createObjectURL(uploadedFile.value.raw)
    previewVisible.value = true
  }
}
</script>

<template>
  <div class="upload-page">
    <div class="logo-section">
      <img src="/logo.png" alt="系统logo" class="logo">
      <span class="system-title">病理报告<br />生成系统</span>
    </div>

    <div class="progress-bar">
      <el-steps :active="2" finish-status="success" align-center>
        <el-step title="病理类型" />
        <el-step title="上传图片" />
        <el-step title="查看分析" />
        <el-step title="保存报告" />
      </el-steps>
    </div>

    <div class="upload-box">
      <p class="tip">请上传 .svs 类型的{{ pathologyType }}病理图像</p>

      <el-upload
        class="upload-area"
        drag
        action="http://localhost:8000/upload"
        :show-file-list="false"
        :on-success="handleSuccess"
        accept=".png, .jpg, .jpeg, .svs"
      >
        <template v-if="!uploadedFile">
          <el-icon><UploadFilled /></el-icon>
          <div class="el-upload__text">点击或拖拽上传</div>
        </template>
        <template v-else>
          <div class="uploaded-file-container">
            <div class="delete-btn" @click.stop="handleRemove">×</div>
            <div class="uploaded-file">
              <el-icon><Picture /></el-icon>
              <el-link type="primary" @click.stop="handlePreview">
                {{ uploadedFile.name }}
              </el-link>
            </div>
          </div>
        </template>
        <template #tip>
          <div class="el-upload__tip">仅支持 .png/.jpg/.jpeg/.svs 文件</div>
        </template>
      </el-upload>

      <el-dialog v-model="previewVisible" title="图片预览" width="70%">
        <img :src="previewImageUrl" style="width: 100%" alt="预览图片" />
      </el-dialog>

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

.logo-section {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
}

.logo {
  width: 100px;
}

.system-title {
  font-size: 1.8rem;
  line-height: 1.2;
  word-break: bold;
}

.progress-bar {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -4.2rem;
}

.tip {
  font-size: 1.1rem;
  margin-bottom: 1.5rem;
}

.upload-area {
  margin-bottom: 2rem;
  position: relative;
}

.uploaded-file-container {
  position: relative;
  width: 100%;
  height: 100%;
}

.uploaded-file {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  gap: 8px;
  padding: 20px;
  height: 100%;
}

.uploaded-file .el-icon {
  font-size: 48px;
  color: var(--el-color-primary);
}

.delete-btn {
  position: absolute;
  top: 5px;
  right: 220px;
  font-size: 20px;
  cursor: pointer;
  color: #999;
  width: 24px;
  height: 24px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
}

.delete-btn:hover {
  color: #ff4d4f;
  background-color: #fff2f0;
}

.btns {
  display: flex;
  justify-content: space-between;
}

</style>  