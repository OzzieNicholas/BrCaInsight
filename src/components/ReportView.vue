<script setup>
import { useRouter } from 'vue-router'
import { ref } from 'vue'
import html2pdf from 'html2pdf.js'

const router = useRouter()

const goFinish = () => {
  router.push('/')  // 回到首页
}

const exportPDF = () => {
  const element = document.getElementById('report-content')
  if (element) {
    html2pdf().set({
      margin: 10,
      filename: '病理报告.pdf',
      html2canvas: { scale: 2 },
      jsPDF: { unit: 'mm', format: 'a4', orientation: 'portrait' }
    }).from(element).save()
  }
}

const patches = ref(['patch 1', 'patch 2'])
</script>

<template>
  <div class="report-page">
    <el-steps :active="4" finish-status="success" align-center>
      <el-step title="病理类型" />
      <el-step title="上传图片" />
      <el-step title="查看分析" />
      <el-step title="保存报告" />
    </el-steps>

    <div class="report-box">
      <h2>人工智能辅助报告下载</h2>

      <div id="report-content" class="report-body">
        <h3>病理报告</h3>
        <div class="report-info">
          <p>病理号：XXXXXX</p>
          <p>姓名：XXX</p>
          <p>年龄：XX</p>
          <p>送检科室：XXX科</p>
          <p>病理形态：XXXX</p>
          <p>病理诊断：XXXXXX</p>
          <p>报告日期：{{ new Date().toLocaleDateString() }}</p>
        </div>

        <div class="patch-list">
          <el-button
            v-for="(patch, i) in patches"
            :key="i"
            type="primary"
            plain
            style="margin: 0.5rem"
          >
            {{ patch }}
          </el-button>
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
.report-page {
  height: 100vh;
  background-image: url('../assets/bg.png');
  background-size: cover;
  background-position: center;
  padding: 2rem;
}

.report-box {
  max-width: 700px;
  margin: 2rem auto;
  background: rgba(255, 255, 255, 0.95);
  padding: 2rem;
  border-radius: 10px;
  text-align: center;
}

.report-body {
  text-align: left;
  margin-top: 1rem;
  padding: 1rem;
  border: 1px solid #ccc;
  border-radius: 8px;
  background: #fefefe;
}

.report-info p {
  margin: 0.5rem 0;
}

.patch-list {
  margin-top: 1rem;
}

.action-buttons {
  margin-top: 2rem;
  display: flex;
  justify-content: space-between;
}
</style>
