import { createApp } from 'vue'

import router from "./router";
import App from './App.vue'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

//Bootstrap
import "bootstrap/dist/js/bootstrap.bundle"

// import ContextMenu
import '@imengyu/vue3-context-menu/lib/vue3-context-menu.css'
import ContextMenu from '@imengyu/vue3-context-menu'

//tooltips
import FloatingVue from 'floating-vue'
import 'floating-vue/dist/style.css'

// FONTAWESOME
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { fas } from '@fortawesome/free-solid-svg-icons'
import { far } from '@fortawesome/free-regular-svg-icons'
import { fab } from '@fortawesome/free-brands-svg-icons'

//Pinia
import { createPinia } from 'pinia'
import piniaPluginPersistedstate from 'pinia-plugin-persistedstate'

//charts
import VueApexCharts from "vue3-apexcharts";

//toasts
import 'vue-toast-notification/dist/theme-bootstrap.css';

const pinia = createPinia()
pinia.use(piniaPluginPersistedstate)

library.add(fas, far, fab)

createApp(App)
.component('font-awesome-icon', FontAwesomeIcon)
.use(router)
.use(pinia)
.use(ContextMenu)
.use(FloatingVue)
.use(VueApexCharts)
.mount('#app')
