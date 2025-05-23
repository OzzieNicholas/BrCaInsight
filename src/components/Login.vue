<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const username = ref('')
const password = ref('')
const router = useRouter()

const login = () => {
  if (username.value === 'JFRX' && password.value === '120120') {
    router.push('/type')
  } else {
    ElMessage.error('用户名或密码错误')
  }
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <h1 class="title">病理报告<br />生成系统</h1>

      <el-input
        v-model="username"
        placeholder="用户名"
        size="large"
        style="margin-bottom: 1rem"
      />
      <el-input
        v-model="password"
        type="password"
        placeholder="密码"
        size="large"
        show-password
        style="margin-bottom: 1rem"
      />

      <el-button type="primary" size="large" style="width: 100%" @click="login">
        登录
      </el-button>

      <p class="tips">默认用户名：JFRX，默认密码：120120</p>
    </div>
  </div>
</template>

<style scoped>
.login-page {
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  display: flex;
  justify-content: center;
  align-items: center;
}

.login-box {
  background-color: rgba(255, 255, 255, 0.9);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
  width: 300px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}

.title {
  font-size: 1.4rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  line-height: 1.5;
}

.tips {
  margin-top: 1rem;
  font-size: 0.85rem;
  color: #666;
}
</style>
