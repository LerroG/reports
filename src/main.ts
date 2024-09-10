import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import i18n, { loadLocaleMessages } from '@/lib/i18n'

const app = createApp(App)

app.use(router)
loadLocaleMessages('ru')

app.use(i18n)

app.mount('#app')
