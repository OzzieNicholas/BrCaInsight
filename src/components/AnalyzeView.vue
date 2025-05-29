<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'

const router = useRouter()
const route = useRoute()

const imageUrl = ref('')
const heatmapDialogVisible = ref(false) // 新增：控制热图对话框显示

const goPrev = () => {
  router.push('/upload')
}

const goNext = () => {
  router.push({
    path: '/report',
    query: {
      pathologyNumber: pathologyNumber.value,
      name: name.value,
      age: age.value,
      department: department.value,
      morphology: morphology.value,
      diagnosis: diagnosis.value,
      patchNames: JSON.stringify(displayedPatches.value.map(p => p.name)),
      patchImages: JSON.stringify(displayedPatches.value.map(p => p.image))
    }
  })
}

const openZoomViewer = () => {
  window.open('/src/components/openseadragon/zoomFiles/test.html', '_blank')
}

// 新增：打开热图对话框
const openHeatmapDialog = () => {
  if (!imageUrl.value) {
    ElMessage.warning('请先上传图片')
    return
  }
  heatmapDialogVisible.value = true
}

const allPatches = ref([
  { name: 'patch 1', image: '/patches/patch1.png' },
  { name: 'patch 2', image: '/patches/patch2.png' },
  { name: 'patch 3', image: '/patches/patch3.png' },
  { name: 'patch 4', image: '/patches/patch4.png' },
  { name: 'patch 5', image: '/patches/patch5.png' },
  { name: 'patch 6', image: '/patches/patch6.png' },
])

const displayedPatches = ref(allPatches.value.slice(0, 2))
const editDialogVisible = ref(false)
const selectedPatches = ref([])

const openEditDialog = () => {
  selectedPatches.value = [...displayedPatches.value]
  editDialogVisible.value = true
}

const selectPatch = (patch) => {
  const index = selectedPatches.value.findIndex(p => p.name === patch.name)
  if (index === -1) {
    if (selectedPatches.value.length < 2) {
      selectedPatches.value.push(patch)
    } else {
      ElMessage.warning('最多只能选择2个Patch')
    }
  } else {
    selectedPatches.value.splice(index, 1)
  }
}

const saveEdits = () => {
  if (selectedPatches.value.length === 2) {
    displayedPatches.value = [...selectedPatches.value]
    editDialogVisible.value = false
  } else {
    ElMessage.warning('请选择2个Patch')
  }
}

const pathologyNumber = ref('')
const name = ref('')
const age = ref('')
const department = ref('')
const morphology = ref('')
const diagnosis = ref('')

onMounted(() => {
  imageUrl.value = route.query.imageUrl || ''
  pathologyNumber.value = route.query.pathologyNumber || 'XXXXXX'
  name.value = route.query.name || 'XXX'
  age.value = route.query.age || 'XX'
  department.value = route.query.department || 'XXX科'
  morphology.value = route.query.morphology || ''
  diagnosis.value = route.query.diagnosis || ''
})
</script>

<template>
  <div class="analyze-page">
    <div class="analyze-box">
      <div class="left-preview">
        <div v-if="!imageUrl" class="preview-placeholder">图像预览区域</div>
        <img 
          v-else 
          :src="imageUrl" 
          alt="上传的病理图像" 
          class="preview-image"
          @click="openZoomViewer"
        />
      </div>

      <div class="right-info">
        <div class="meta">
          <el-descriptions title="病理信息" :column="2" border>
            <el-descriptions-item label="病理号">{{ pathologyNumber }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ name }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ age }}</el-descriptions-item>
            <el-descriptions-item label="送检科室">{{ department }}</el-descriptions-item>
            <el-descriptions-item label="病理形态" :span="2" :row-span="3">
              <div class="description-content">{{ morphology }}</div>
            </el-descriptions-item>
            <el-descriptions-item label="病理诊断" :span="2">
              <div class="description-content" style="white-space: pre-wrap;">{{ diagnosis }}</div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
    
        <div class="patches">
          <h3>Patch 区域</h3>
          <div class="patch-list">
            <div v-for="(patch, index) in displayedPatches" :key="index" class="patch-item">
              <img :src="patch.image" class="patch-image" />
            </div>
          </div>
        </div>

        <div class="btns">
          <el-button @click="goPrev">上一步</el-button>
          <el-button type="success" plain @click="openHeatmapDialog">可视化热图</el-button>
          <el-button type="success" plain @click="openEditDialog">编辑报告</el-button>
          <el-button type="primary" @click="goNext">下一步</el-button>
        </div>
      </div>
    </div>

    <!-- 热图对话框 -->
    <el-dialog
      v-model="heatmapDialogVisible"
      title="可视化热图"
      width="70%"
      top="5vh"
    >
      <div class="heatmap-container">
        <div class="image-column">
          <h3>原始图像</h3>
          <img 
            v-if="imageUrl"
            :src="imageUrl" 
            alt="原始病理图像" 
            class="heatmap-image"
          />
          <div v-else class="empty-placeholder">无原始图像</div>
        </div>
        <div class="image-column">
          <h3>热图分析</h3>
          <img 
            src="/可视化热图.png" 
            alt="可视化热图" 
            class="heatmap-image"
          />
        </div>
      </div>
      
      <template #footer>
        <span class="dialog-footer">
          <el-button type="primary" @click="heatmapDialogVisible = false">关闭</el-button>
        </span>
      </template>
    </el-dialog>
  
    <!-- 编辑报告对话框 -->
    <el-dialog
      v-model="editDialogVisible"
      title="编辑病理信息"
      width="80%"
      top="5vh"
    >
      <div class="edit-dialog-content">
        <div class="edit-form">
          <el-form label-width="120px">
            <el-form-item label="病理形态">
              <el-input
                v-model="morphology"
                type="textarea"
                :rows="5"
                placeholder="请输入病理形态描述"
                class="fixed-textarea morphology-textarea"
              />
            </el-form-item>
            <el-form-item label="病理诊断">
              <el-input
                v-model="diagnosis"
                type="textarea"
                :rows="10"
                placeholder="请输入病理诊断"
                class="fixed-textarea diagnosis-textarea"
              />
            </el-form-item>
          </el-form>
        </div>
      </div>

        <div class="patch-selection">
          <h3>选择 Patch (最多选择2个)</h3>
          <div class="patch-row">
            <div
              v-for="(patch, index) in allPatches"
              :key="index"
              class="patch-select-item"
              @click="selectPatch(patch)"
            >
              <img
                :src="patch.image"
                class="patch-select-image"
                :class="{ 'selected-patch': selectedPatches.some(p => p.name === patch.name) }"
              />
            </div>
          </div>
        </div>

      <template #footer>
        <span class="dialog-footer">
          <el-button @click="editDialogVisible = false">取消</el-button>
          <el-button type="primary" @click="saveEdits">
            确认
          </el-button>
        </span>
      </template>
    </el-dialog>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden; /* 禁止滚动条 */
}

.analyze-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  overflow: hidden;
}


.system-title {
  font-size: 1.8rem;
  word-break: bold;
  line-height: 1.2;
}

.progress-bar {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -4.2rem;
}
.analyze-box {
  flex: 1; /* 占满剩余高度 */
  display: flex;
  flex-direction: row;
  width: 75%; 
  gap: 1rem;
  margin: 0 auto;
  background-color: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 1rem;
  overflow: hidden;
  min-height: 0;
}

.left-preview {
  flex: 1;
  min-width: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #fff;
  border: 1px dashed #ccc;
}

.preview-image {
  max-width: 100%;
  max-height: 100%;
  object-fit: contain;
}

.right-info {
  flex: 1.5;
  min-width: 0;
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  overflow: hidden;
}

.meta {
  flex: 1;
  overflow: auto;
}

.patches {
  flex-shrink: 0;
}

.patch-list {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.patch-image {
  width: 120px;
  height: 60px;
  object-fit: cover;
  border: 1px solid #ccc;
  border-radius: 4px;
}

.patch-row {
  display: flex; 
  justify-content: flex-start; 
  gap: 12px; 
  overflow-x: auto; 
  padding: 10px 0;
  min-width: 0; 
}

.patch-select-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  cursor: pointer;
  margin: 5px;
}

.patch-select-image {
  width: 120px;
  height: 120px;
  object-fit: cover;
  border: 2px solid #ddd;
  border-radius: 4px;
  transition: all 0.2s;
}

.patch-select-image:hover {
  transform: scale(1.03);
}

.selected-patch {
  border: 3px solid #409EFF;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.4);
}

.patch-row {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
}


.btns {
  display: flex;
  gap: 0.5rem;
  flex-shrink: 0;
}

.btns .el-button {
  flex: 1;
  padding: 0.4rem 0;
  font-size: 0.9rem;
}

.description-content {
  white-space: pre-wrap;
  font-size: 0.85rem;
}


.heatmap-container {
  display: flex;
  flex-wrap: wrap;
  gap: 1rem;
}

.image-column {
  flex: 1 1 300px;
  text-align: center;
}

.heatmap-image {
  max-width: 100%;
  max-height: 400px;
}

.empty-placeholder {
  height: 300px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #999;
  border: 1px dashed #ccc;
}

@media (max-width: 768px) {
  .analyze-box {
    flex-direction: column;
  }

  .btns {
    flex-direction: column;
  }

  .patch-list {
    justify-content: center;
  }
}


</style>