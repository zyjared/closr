import ElementPlus from 'element-plus'
import { createApp } from 'vue'
import { createRouter, createWebHashHistory } from 'vue-router'
import { routes } from 'vue-router/auto-routes'

import App from './App.vue'
import './styles/main.scss'
// import 'uno.css'

const app = createApp(App)
const router = createRouter({
  routes,
  history: createWebHashHistory(import.meta.env.BASE_URL),
})
app.use(router)
app.use(ElementPlus)
app.mount('#app')
