<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const types = ['乳腺癌', '胰腺癌', '肺癌', '胃癌', '肝癌', '食道癌']
const router = useRouter()

const selected = ref('乳腺癌') // 当前仅允许选择乳腺癌

const handleNext = () => {
  if (selected.value !== '乳腺癌') return
  router.push('/upload')
}
</script>

<template>
  <div class="type-page">
    <el-steps :active="1" finish-status="success" align-center>
      <el-step title="病理类型" />
      <el-step title="上传图片" />
      <el-step title="查看分析" />
      <el-step title="保存报告" />
    </el-steps>

    <div class="pathology-box">
      <h2>病理类型</h2>
      <div class="grid">
        <el-button
          v-for="type in types"
          :key="type"
          :type="type === selected ? 'primary' : 'info'"
          :disabled="type !== '乳腺癌'"
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

.pathology-box {
  background-color: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  max-width: 500px;
  margin: 3rem auto 0 auto;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 2rem 0;
}
</style>
