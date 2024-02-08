import { createApp } from 'vue'

// Import our custom CSS
import './scss/styles.scss'

// Import all of Bootstrap's JS
import * as bootstrap from 'bootstrap'

import router from "./router";
import App from './App.vue'

//Bootstrap
import "bootstrap/dist/js/bootstrap.bundle"

// import './scss/main.scss';

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

import VueApexCharts from "vue3-apexcharts";

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
