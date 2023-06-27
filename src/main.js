import './assets/main.css'

import { createApp } from 'vue'
import { createPinia } from 'pinia'

import App from './App.vue'
import router from './router'
import i18n from './boot/i18n'
import vuetify from './vueitfy'

import { QuillEditor } from '@vueup/vue-quill'
import '@vueup/vue-quill/dist/vue-quill.snow.css';

const app = createApp(App)
app.use(i18n)

app.use(vuetify);
app.use(createPinia())
app.use(router)
app.component('QuillEditor', QuillEditor)
app.mount('#app')
