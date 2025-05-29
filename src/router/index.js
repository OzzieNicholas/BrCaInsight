import { createRouter, createWebHistory } from 'vue-router'

// 页面组件
import Login from '../components/Login.vue'
import PathologyType from '../components/PathologyType.vue'
import UploadImage from '../components/UploadImage.vue'
import AnalyzeView from '../components/AnalyzeView.vue'
import ReportView from '../components/ReportView.vue'

// 引入布局
import MainLayout from '../components/MainLayout.vue'

const routes = [
  // 单独登录页，不嵌套 layout
  {
    path: '/',
    component: Login,
  },

  // 所有带有顶部Logo + 步骤条的页面，走 MainLayout 作为父组件
  {
    path: '/',
    component: MainLayout,
    children: [
      {
        path: '/type',
        component: PathologyType,
      },
      {
        path: '/upload',
        component: UploadImage,
      },
      {
        path: '/analyze',
        component: AnalyzeView,
      },
      {
        path: '/report',
        component: ReportView,
      },
    ]
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
})

export default router
