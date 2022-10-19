import { createApp } from 'vue'
import App from './App.vue'
import 'element-plus/theme-chalk/dark/css-vars.css'
import 'element-plus/theme-chalk/el-message.css'
import '@/assets/fonts/font.scss'
import './styles/index.scss'
import './styles/style.scss'
import router from './router'
import 'animate.css';
import AOS from 'aos'
import 'aos/dist/aos.css';



AOS.init();


createApp(App).use(router).mount('#app')

