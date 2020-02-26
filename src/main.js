import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iconfont js
import '@/assets/icons/iconfont.css'

// 引入axios
import axios from 'axios'
import vueAxios from 'vue-axios'

// 引入aos
import 'aos/dist/aos.css'
import Aos from 'aos/dist/aos.js'

// 引入animate.css
// import animate from 'animate.css/animate.min.css'

// 引入vue-lazyload
import VueLazyLoad from 'vue-lazyload'
Vue.use(VueLazyLoad, {
    attempt: 4,
    loading: require('./assets/loading.gif')
})

// aos初始化
Aos.init()

// Vue.use
Vue.use(vueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
