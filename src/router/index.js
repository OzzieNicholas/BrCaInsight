import { createRouter, createWebHistory } from 'vue-router'
import Login from '../components/Login.vue'
import PathologyType from '../components/PathologyType.vue'
import UploadImage from '../components/UploadImage.vue'
import AnalyzeView from '../components/AnalyzeView.vue'
import ReportView from '../components/ReportView.vue'

const routes = [
  { path: '/', component: Login },
  { path: '/type', component: PathologyType },
  { path: '/upload', component: UploadImage },
  { path: '/analyze', component: AnalyzeView },
  { path: '/report', component: ReportView },
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
