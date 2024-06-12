import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import Toast from "vue-toastification";
import "vue-toastification/dist/index.css";
import store from '@/helpers/store'
import vClickOutside from "click-outside-vue3"

const app = createApp(App)

app.use(router)
app.use(Toast)
app.use(store)
app.use(vClickOutside)
app.mount('#app')
