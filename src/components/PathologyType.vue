<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const types = ['乳腺癌', '胰腺癌', '肺癌', '胃癌', '肝癌', '食道癌']
const router = useRouter()

const selected = ref('乳腺癌')

const handleNext = () => {
  // 确保参数正确编码传递
  router.push({
    path: '/upload',
    query: { 
      type: encodeURIComponent(selected.value) // 编码参数确保特殊字符正确处理
    }
  })
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
  margin: 10rem auto 0 auto;
  text-align: center;
}

.grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1rem;
  margin: 3rem 0;
}
</style>