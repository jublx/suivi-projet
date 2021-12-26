import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import axiosInstance from './axios'

import '@fortawesome/fontawesome-free/css/all.css'
import '@fortawesome/fontawesome-free/js/all.js'
import './styles/index.css'

const app = createApp(App).use(router)
app.config.globalProperties.axios = axiosInstance

app.mount('#app')
