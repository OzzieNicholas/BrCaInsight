<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref, onMounted } from 'vue'

const router = useRouter()
const route = useRoute()

// 接收上传的图片URL
const imageUrl = ref('')

const goPrev = () => {
  router.push('/upload')
}

const goNext = () => {
  router.push({
    path: '/report',
    query: {
      // 传递病理信息
      pathologyNumber: pathologyNumber.value,
      name: name.value,
      age: age.value,
      department: department.value,
      morphology: morphology.value,
      diagnosis: diagnosis.value,
      // 传递 Patch 信息
      patchNames: JSON.stringify(displayedPatches.value.map(p => p.name)),
      patchImages: JSON.stringify(displayedPatches.value.map(p => p.image))
    }
  })
}

// 存储所有可用的Patch
const allPatches = ref([
  { name: 'patch 1', image: '/patches/patch1.png' },
  { name: 'patch 2', image: '/patches/patch2.png' },
  { name: 'patch 3', image: '/patches/patch3.png' },
  { name: 'patch 4', image: '/patches/patch4.png' },
  { name: 'patch 5', image: '/patches/patch5.png' },
  { name: 'patch 6', image: '/patches/patch6.png' },
])

// 当前显示的Patch（默认显示前2个）
const displayedPatches = ref(allPatches.value.slice(0, 2))

// 控制是否显示编辑模式
const showEditMode = ref(false)

// 在编辑模式下选中的Patch
const selectedPatches = ref([])

// 切换编辑模式
const toggleEditMode = () => {
  showEditMode.value = !showEditMode.value
  if (!showEditMode.value) {
    selectedPatches.value = []
  }
}

// 选择Patch
const selectPatch = (patch) => {
  const index = selectedPatches.value.findIndex(p => p.name === patch.name)
  if (index === -1) {
    selectedPatches.value.push(patch)
  } else {
    selectedPatches.value.splice(index, 1)
  }
}

// 确认选择
const confirmSelection = () => {
  if (selectedPatches.value.length === 2) {
    displayedPatches.value = [...selectedPatches.value]
    showEditMode.value = false
    selectedPatches.value = []
  } else {
    ElMessage.warning('请选择2个Patch')
  }
}

// **新增：接收病理信息参数**
const pathologyNumber = ref('')
const name = ref('')
const age = ref('')
const department = ref('')
const morphology = ref('')
const diagnosis = ref('')

onMounted(() => {
  // 从路由参数中获取图片URL
  imageUrl.value = route.query.imageUrl || ''

  // **从路由参数中获取病理信息**
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
    <el-steps :active="3" finish-status="success" align-center>
      <el-step title="病理类型" />
      <el-step title="上传图片" />
      <el-step title="查看分析" />
      <el-step title="保存报告" />
    </el-steps>

    <div class="analyze-box">
      <div class="left-preview">
        <div v-if="!imageUrl" class="preview-placeholder">图像预览区域</div>
        <img v-else :src="imageUrl" alt="上传的病理图像" style="max-width: 100%; max-height: 400px" />
      </div>

      <div class="right-info">
        <div class="meta">
          <el-descriptions title="病理信息" :column="2" border>
            <el-descriptions-item label="病理号">{{ pathologyNumber }}</el-descriptions-item>
            <el-descriptions-item label="姓名">{{ name }}</el-descriptions-item>
            <el-descriptions-item label="年龄">{{ age }}</el-descriptions-item>
            <el-descriptions-item label="送检科室">{{ department }}</el-descriptions-item>
              <!-- 病理形态横跨两列并向下跨三行 -->
            <el-descriptions-item label="病理形态" :span="2" :row-span="3">
              <div class="description-content">{{ morphology }}</div>
            </el-descriptions-item>

            <!-- 病理诊断 -->
            <el-descriptions-item label="病理诊断" :span="2">
              <div class="description-content" style="white-space: pre-wrap;">{{ diagnosis }}</div>
            </el-descriptions-item>
          </el-descriptions>
        </div>
    
        <div class="patches">
          <h3>Patch 区域</h3>
          <div class="patch-list">
            <!-- 默认显示模式 -->
            <template v-if="!showEditMode">
              <div v-for="(patch, index) in displayedPatches" :key="index" class="patch-item">
                <img :src="patch.image" class="patch-image" />
              </div>
              <el-button type="success" plain @click="toggleEditMode">编辑 Patch</el-button>
            </template>
            
            <!-- 编辑模式 -->
            <template v-else>
              <div v-for="(patch, index) in allPatches" :key="index" class="patch-item">
                <img 
                  :src="patch.image" 
                  class="patch-image" 
                  :class="{ 'selected-patch': selectedPatches.some(p => p.name === patch.name) }"
                  @click="selectPatch(patch)"
                />
              </div>
              <div class="edit-actions">
                <el-button @click="toggleEditMode">取消</el-button>
                <el-button type="primary" @click="confirmSelection">确认</el-button>
              </div>
            </template>
          </div>
        </div>

        <div class="btns">
          <el-button @click="goPrev">上一步</el-button>
          <el-button type="primary" @click="goNext">下一步</el-button>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
.analyze-page {
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.analyze-box {
  display: flex;
  margin: 2rem auto;
  max-width: 1200px;
  background: rgba(255, 255, 255, 0.95);
  border-radius: 10px;
  padding: 2rem;
  gap: 2rem;
}

.left-preview {
  flex: 1;
  display: flex;
  justify-content: center;
  align-items: center;
  border: 2px dashed #ccc;
  min-height: 400px;
  background-color: white;
}

.preview-placeholder {
  font-size: 1.2rem;
  color: #999;
}

.right-info {
  flex: 1.5;
  display: flex;
  flex-direction: column;
  gap: 1rem;
}

.patches {
  margin-top: 1rem;
}

.patch-list {
  display: flex;
  flex-wrap: wrap;
  align-items: center;
  gap: 10px;
}

.patch-item {
  display: flex;
  flex-direction: column;
  align-items: center;
}

.patch-image {
  width: 100px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  cursor: pointer;
  transition: all 0.3s;
}

.patch-image:hover {
  transform: scale(1.05);
}

.selected-patch {
  border: 2px solid #409EFF;
  box-shadow: 0 0 8px rgba(64, 158, 255, 0.6);
}



.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}

.edit-actions {
  display: flex;
  gap: 10px;
  margin-left: 10px;
}

.diagnosis-content {
  white-space: pre-line;
}
</style>