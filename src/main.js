import { createApp } from 'vue'
import App from './App.vue'
//add routing script to the main
import router from './router'

createApp(App).use(router).mount('#app')