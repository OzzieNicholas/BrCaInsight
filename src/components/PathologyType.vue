<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const types = ['乳腺癌', '胰腺癌', '肺癌', '胃癌', '肝癌', '食道癌']
const router = useRouter()

const selected = ref('乳腺癌')

const handleNext = () => {
  router.push({
    path: '/upload',
    query: { 
      type: encodeURIComponent(selected.value)
    }
  })
}
</script>

<template>
  <div class="type-page">
    
    <div class="logo-section">
      <img src="/logo.png" alt="系统logo" class="logo">
      <span class="system-title">病理报告<br />生成系统</span>
    </div>
    
    <div class="progress-bar">
      <el-steps :active="1" finish-status="success" align-center>
        <el-step title="病理类型" />
        <el-step title="上传图片" />
        <el-step title="查看分析" />
        <el-step title="保存报告" />
      </el-steps>
    </div>

    
    <div class="pathology-box">
      <h2>病理类型</h2>
      <div class="grid">
        <el-button
          v-for="type in types"
          :key="type"
          :type="type === selected ? 'primary' : 'info'"
          @click="selected = type"
        >
          {{ type }}
        </el-button>
      </div>

      <el-button type="success" size="large" @click="handleNext">
        下一步
      </el-button>
    </div>
  </div>
</template>

<style scoped>
.type-page {
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.logo-section {
    display: flex;
    align-items: center; 
}

.logo {
  height: auto;
  width: 100px;
  margin-right: 1rem; 
}

.system-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1.0rem;
  color: #333;
  line-height: 1.5;
}

.pathology-box {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin: 3rem auto 0 auto;
  text-align: center;
}

.progress-bar {
  width: 100%;
  max-width: 1200px;
  margin: 0 auto;
  margin-top: -5rem;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
}

</style>