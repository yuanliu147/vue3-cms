import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import { ElLoading } from 'element-plus'
import 'element-plus/dist/index.css'
createApp(App).use(ElLoading).use(store).use(router).mount('#app')
