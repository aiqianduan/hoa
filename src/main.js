import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'

// 引入iconfont js
import '@/assets/icons/iconfont.css'

// 引入axios
import axios from 'axios'
import vueAxios from 'vue-axios'

Vue.use(vueAxios, axios)

Vue.config.productionTip = false

new Vue({
    router,
    store,
    render: h => h(App)
}).$mount('#app')
