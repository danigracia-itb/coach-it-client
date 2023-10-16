import { createApp } from 'vue'

import router from "./router";
import App from './App.vue'

//Bootstrap
import "bootstrap/dist/js/bootstrap.bundle"

// import './scss/main.scss';

createApp(App)
.use(router)
.mount('#app')

