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

createApp(App)
.use(router)
.mount('#app')

