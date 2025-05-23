<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'

const router = useRouter()

const goPrev = () => {
  router.push('/upload')
}

const goNext = () => {
  router.push('/report')
}

const patches = ref(['patch 1', 'patch 2'])
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
        <div class="preview-placeholder">图像预览区域</div>
      </div>

      <div class="right-info">
        <div class="meta">
          <el-descriptions title="病理信息" :column="2" border>
            <el-descriptions-item label="病理号">XXXXXX</el-descriptions-item>
            <el-descriptions-item label="姓名">XXX</el-descriptions-item>
            <el-descriptions-item label="年龄">XX</el-descriptions-item>
            <el-descriptions-item label="送检科室">XXX科</el-descriptions-item>
            <el-descriptions-item label="病理形态">XXXXX</el-descriptions-item>
            <el-descriptions-item label="病理诊断">XXXXXX</el-descriptions-item>
          </el-descriptions>
        </div>

        <div class="patches">
          <h3>Patch 区域</h3>
          <div class="patch-list">
            <el-button
              v-for="(p, index) in patches"
              :key="index"
              type="primary"
              style="margin: 0.5rem"
            >
              {{ p }}
            </el-button>
            <el-button type="success" plain>添加 Patch</el-button>
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
}

.btns {
  display: flex;
  justify-content: space-between;
  margin-top: 2rem;
}
</style>
