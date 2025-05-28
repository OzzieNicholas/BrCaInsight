<script setup>
import { ref } from 'vue'
import { useRouter } from 'vue-router'
import { ElMessage } from 'element-plus'

const username = ref('')
const password = ref('')
const confirmPassword = ref('')
const isRegistering = ref(false)
const router = useRouter()

// 从本地存储获取用户数据（修正初始化语法）
const users = ref(JSON.parse(localStorage.getItem('users')) || {})

const validateInput = () => {
  if (!username.value || !password.value) {
    ElMessage.error('用户名和密码不能为空')
    return false
  }
  
  if (username.value.length < 4 || username.value.length > 16) {
    ElMessage.error('用户名长度应在4-16个字符之间')
    return false
  }
  
  if (password.value.length < 6) {
    ElMessage.error('密码长度不能少于6个字符')
    return false
  }
  
  return true
}

const login = () => {
  if (!validateInput()) return
  
  if (users.value[username.value] && users.value[username.value] === password.value) {
    ElMessage.success('登录成功')
    localStorage.setItem('currentUser', username.value)
    router.push('/type')
  } else {
    ElMessage.error('用户名或密码错误')
  }
}

const register = () => {
  if (!validateInput()) return
  
  if (password.value !== confirmPassword.value) {
    ElMessage.error('两次输入的密码不一致')
    return
  }
  
  // 修正用户存在性检查语法
  if (users.value[username.value]) {
    ElMessage.error('用户名已存在')
    return
  }
  
  // 添加新用户（确保更新响应式对象）
  users.value = {
    ...users.value,
    [username.value]: password.value
  }
  localStorage.setItem('users', JSON.stringify(users.value))
  
  ElMessage.success('注册成功')
  switchMode()
}

const switchMode = () => {
  isRegistering.value = !isRegistering.value
  username.value = ''
  password.value = ''
  confirmPassword.value = ''
}
</script>

<template>
  <div class="login-page">
    <div class="login-box">
      <div class="header-container">
        <img src="/logo.png" alt="系统 Logo" class="logo">
        <h1 class="title">病理报告<br />生成系统</h1>
      </div>
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
      
      <el-input
        v-if="isRegistering"
        v-model="confirmPassword"
        type="password"
        placeholder="确认密码"
        size="large"
        show-password
        style="margin-bottom: 1rem"
      />

      <el-button 
        type="primary" 
        size="large" 
        style="width: 100%; margin-bottom: 1rem" 
        @click="isRegistering ? register() : login()"
      >
        {{ isRegistering ? '注册' : '登录' }}
      </el-button>

      <el-button 
        type="text" 
        size="small" 
        @click="switchMode"
      >
        {{ isRegistering ? '已有账号？去登录' : '没有账号？去注册' }}
      </el-button>

      <div class="tips" v-if="isRegistering">
        提示：用户名4-16位，密码至少6位
      </div>
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
  width: 450px;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
}


.header-container {
  display: flex;
  align-items: center; 
  justify-content: center; 
  gap: 2rem; 
  padding-right: 10px; 
  margin-bottom: 2rem; 
}

.logo {
  height: 120px; 
  width: 80px;
}


.title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
  color: #333;
  line-height: 2;
}


.tips {
  margin-top: 2rem;
  font-size: 0.rem;
  color: #666;
}
</style>