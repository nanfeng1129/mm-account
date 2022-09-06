import { createApp } from 'vue'
import App from './App.vue'
import TDesign from 'tdesign-vue-next'
import 'tdesign-vue-next/es/style/index.css'
import './styles/index.scss'
import './style.scss'
import router from './router'
import 'animate.css';
import AOS from 'aos'
import 'aos/dist/aos.css';


AOS.init();


createApp(App).use(router).use(TDesign).mount('#app')

