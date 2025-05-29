<script setup>
import { useRouter, useRoute } from 'vue-router'
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const router = useRouter()
const route = useRoute()

// 接收路由参数
const pathologyInfo = ref({
  number: route.query.pathologyNumber || '',
  name: route.query.name || '',
  age: route.query.age || '',
  department: route.query.department || '',
  morphology: route.query.morphology || '',
  diagnosis: route.query.diagnosis || ''
})

// 接收 Patch 数据
const patches = ref(
  route.query.patchNames 
    ? JSON.parse(route.query.patchNames)
    : ['patch 1', 'patch 2']
)

const patchImages = ref(
  route.query.patchImages
    ? JSON.parse(route.query.patchImages)
    : []
)

const goFinish = () => {
  router.push('/')  // 回到首页
}

const exportPDF = () => {
  const element = document.getElementById('report-content')
  if (element) {
    html2pdf().set({
      margin: 10,
      filename: `病理报告_${pathologyInfo.value.number || 'XXXXXX'}.pdf`,
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save()
  }
}
</script>

<template>
  <div class="report-page">

    <div class="logo-section">
      <img src="/logo.png" alt="系统logo" class="logo">
      <span class="system-title">病理报告<br />生成系统</span>
    </div>

    <div class="progress-bar">
      <el-steps :active="4" finish-status="success" align-center>
        <el-step title="病理类型"/>
        <el-step title="上传图片"/>
        <el-step title="查看分析"/>
        <el-step title="保存报告"/>
      </el-steps>
    </div>

    <div class="report-box">
      <h2>人工智能辅助报告下载</h2>

      <div id="report-content" class="report-body">
        <div class="label-header">
          <div class="label-title">病理报告</div>
        </div>
        
        <div class="label-body">
          <div class="label-grid">
            <div class="grid-row">
              <div class="grid-item">
                  <div class="label-field">病理号  {{ pathologyInfo.number || 'XXXXXX' }}</div>
              </div>
              <div class="grid-item">
                <div class="label-row inline">
                  <div class="label-field">姓名  {{ pathologyInfo.name || 'XXX' }}</div>
                </div>
              </div>
            </div>
            <div class="grid-row">
              <div class="grid-item">
                <div class="label-field">年龄  {{ pathologyInfo.age || 'XX' }}</div>
              </div>
              <div class="grid-item">
                <div class="label-field">送检科室    {{ pathologyInfo.department || 'XXX科' }}</div>
              </div>
            </div>
            <div class="grid-row full-width">
              <div class="grid-item">
                <div class="label-field">病理形态</div>
                <div class="label-value">
                  <span>{{ pathologyInfo.morphology || '未填写' }}</span>
                </div>
              </div>
            </div>
            <div class="grid-row full-width">
              <div class="grid-item">
                <div class="label-field">病理诊断</div>
                <div class="label-value">
                  <span>{{ pathologyInfo.diagnosis || '未填写' }}</span>
                </div>
              </div>
            </div>
            <div class="grid-row full-width">
              <div class="grid-item">
                <div class="label-field">报告日期</div>
                <div class="label-value">
                  <span>{{ new Date().toLocaleDateString() }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
        
        <div class="label-footer">
          <div class="patch-list">
            <div class="label-section-title">Patch 区域</div>
            <div class="patch-container">
              <div v-for="(patch, i) in patches" :key="i" class="patch-item">
                <img :src="patchImages[i]" alt="病理切片" />
              </div>
            </div>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <el-button disabled>保存 Word</el-button>
        <el-button @click="exportPDF">保存 PDF</el-button>
        <el-button type="success" @click="goFinish">完成</el-button>
      </div>
    </div>
  </div>
</template>

<style scoped>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  overflow: hidden;
  font-family: 'Arial', sans-serif;
}

.report-page {
  height: 100vh;
  display: flex;
  flex-direction: column;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  box-sizing: border-box;
  padding: 1rem;
}



.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 0.5rem;
}

.logo {
  width: 80px;
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

.report-box {
  flex: 1;
  width: 75%; 
  margin: 1rem auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 1rem;
  border-radius: 10px;
  text-align: center;
  display: flex;
  flex-direction: column;
  overflow: hidden;
  min-height: 0;
}

.report-body {
  flex: 1;
  background: #fff;
  border-radius: 5px;
  box-shadow: 0 2px 5px rgba(0,0,0,0.2);
  padding: 0;
  border: none;
  overflow: auto;
  text-align: left;
  min-height: 0;
}

.label-header {
  background: #3498db;
  color: white;
  padding: 10px 15px;
  border-radius: 5px 5px 0 0;
}

.label-title {
  font-size: 1.1em;
  font-weight: bold;
  text-align: center;
}

.label-body {
  padding: 10px;
}

.label-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 8px;
}

.grid-row {
  display: contents;
}

.grid-item {
  display: flex;
  flex-direction: column;
}

.full-width .grid-item {
  grid-column: 1 / -1;
}

.label-field {
  font-weight: bold;
  color: #555;
  font-size: 0.9em;
  margin-bottom: 2px;
}

.label-footer {
  padding: 10px;
  border-top: 1px solid #eee;
}

.label-section-title {
  font-weight: bold;
  margin-bottom: 10px;
  color: #333;
  text-align: center;
}

.patch-container {
  display: flex;
  flex-wrap: wrap;
  gap: 10px;
  justify-content: center;
  padding: 0.5rem;
}

.patch-item {
  text-align: center;
  flex: 0 0 auto;
}

.patch-item img {
  width: 200px;
  height: 100px;
  object-fit: cover;
  border: 1px solid #ddd;
  border-radius: 4px;
  padding: 3px;
  max-width: 100%;
}

.action-buttons {
  margin-top: 1rem;
  display: flex;
  justify-content: space-between;
  gap: 1rem;
  flex-shrink: 0;
}

.action-buttons .el-button {
  flex: 1;
  font-size: 0.9rem;
  padding: 0.4rem 0;
}

@media (max-width: 768px) {
  .label-grid {
    grid-template-columns: 1fr;
  }

  .patch-item img {
    width: 100%;
    height: auto;
  }

  .action-buttons {
    flex-direction: column;
  }

  .action-buttons .el-button {
    width: 100%;
  }

  .logo-section {
    flex-direction: column;
    align-items: flex-start;
  }

  .system-title {
    font-size: 1.5rem;
  }
}


</style>