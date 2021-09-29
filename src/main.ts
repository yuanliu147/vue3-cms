import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import registerElementPlus from './global/register-elem'

createApp(App).use(registerElementPlus).use(store).use(router).mount('#app')
