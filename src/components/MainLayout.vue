<script setup>
import { useRoute } from 'vue-router'
import { computed } from 'vue'

const route = useRoute()

const pathToStep = {
  '/type': 1,
  '/upload': 2,
  '/analyze': 3,
  '/report': 4,
}

const activeStep = computed(() => pathToStep[route.path] || 1)
</script>

<template>
  <div class="main-layout">
    <!-- 顶部 -->
    <div class="logo-section">
      <img src="/logo.png" alt="系统logo" class="logo">
      <span class="system-title">病理报告<br />生成系统</span>
    </div>

    <!-- 步骤条 -->
    <div class="progress-bar">
      <el-steps :active="activeStep" finish-status="success" align-center>
        <el-step title="病理类型" />
        <el-step title="上传图片" />
        <el-step title="查看分析" />
        <el-step title="保存报告" />
      </el-steps>
    </div>

    <!-- 内容占位 -->
    <div class="content">
      <router-view />
    </div>
  </div>
</template>

<style scoped>
.main-layout {
  display: flex;
  flex-direction: column;
  min-height: 100vh;
  overflow: hidden;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
}

.logo-section {
  display: flex;
  align-items: center;
  gap: 1rem;
  margin-bottom: 1rem;
  padding: 0 2rem;
}

.logo {
  width: 80px;
}

.system-title {
  font-size: 1.8rem;
  line-height: 1.2;
  font-weight: bold;
}

.progress-bar {
  width: 80%;
  max-width: 1200px;
  margin: 0 auto;
  margin-bottom: 1.5rem;
}

.content {
  flex: 1;
  overflow: auto;
}
</style>
