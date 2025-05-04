import { createApp } from 'vue'
import { createPinia } from 'pinia'

// styles
import '@/styles/main.scss'
import '@splidejs/vue-splide/css'

// element-plus
import ElementPlus from 'element-plus'
import 'element-plus/dist/index.css'
import * as ElementPlusIconsVue from '@element-plus/icons-vue'

import App from './App.vue'
import router from './router'
import VueSplide from '@splidejs/vue-splide'

const app = createApp(App)

app.use(createPinia())
app.use(router)
app.use(VueSplide)
app.use(ElementPlus)
for (const [key, component] of Object.entries(ElementPlusIconsVue)) {
  app.component(key, component)
}
app.mount('#app')
