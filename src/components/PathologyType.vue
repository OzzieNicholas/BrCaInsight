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
  background-size: cover;
  background-position: center;
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