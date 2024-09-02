import './assets/main.css'
import "bootstrap/dist/js/bootstrap.bundle.min.js"
import "bootstrap/dist/css/bootstrap.min.css"

import { createApp } from 'vue'
import { createPinia } from 'pinia'
import App from './App.vue'
import piniaPluginPersistedState from "pinia-plugin-persistedstate"

const pinia = createPinia()
pinia.use(piniaPluginPersistedState)

const app = createApp(App)

app.use(pinia)
app.mount('#app')

import { useSkillStore as skillStore } from '@/stores/skills'
import { useDiaStore as diaStore } from '@/stores/dialog'
if (localStorage.getItem('global-version')) {
    skillStore().loadAll()
}
if (skillStore().flags.intro == false) {
    diaStore().startDia('intro')
}