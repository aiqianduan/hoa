import Vue from 'vue'
import VueRouter from 'vue-router'
import Home from '../views/Home.vue'
import MusicList from '@/views/MusicList.vue'

Vue.use(VueRouter)

const routes = [
    {
        path: '/',
        redirect: '/home'
    },
    {
        path: '/home',
        name: 'Home',
        component: Home
    },
    {
        path: '/musicList/:id',
        name: 'MusicList',
        component: MusicList
    }
]

const router = new VueRouter({
    routes
})

export default router
