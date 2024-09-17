import { createApp } from 'vue'
import App from './App.vue'
import './assets/index.css'
import router from './router'
import i18n, { loadLocaleMessages } from '@/lib/i18n'
import { VueQueryPlugin } from '@tanstack/vue-query'

const app = createApp(App)

loadLocaleMessages(localStorage.getItem('lang') || 'ru')

app.use(router)
app.use(VueQueryPlugin)
app.use(i18n)

app.mount('#app')
