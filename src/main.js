import { createApp } from 'vue'
import App from './App.vue'
import VueSweetalert2 from 'vue-sweetalert2'
import 'sweetalert2/dist/sweetalert2.min.css'

// add routing script to the main
import router from './router'

createApp(App).use(VueSweetalert2).use(router).mount('#app')
