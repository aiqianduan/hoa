<template>
    <div id="app">
        <!-- headbar component -->
        <Headbar class="headbar"></Headbar>
        <router-view class="page"></router-view>
        <PlayTabbar class="tabbar"></PlayTabbar>
        <!-- tabbar component -->
        <!-- <Tabbar class="tabbar"></Tabbar> -->
    </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import PlayTabbar from '@/components/PlayTabbar.vue'
// import Tabbar from '@/components/Tabbar.vue'
export default {
    components: {
        Headbar,
        PlayTabbar
        // Tabbar
    }
}
</script>

<style>
#app {
    width: 100vw;
    height: 100vh;
    position: relative;
    overflow-y: hidden;
}

.headbar {
    position: fixed;
    width: 100vw;
    height: 10vh;
    z-index: 99;
    background-color: white;
    top: 0;
    left: 0;
}

.page {
    position: absolute;
    top: 80px;
    bottom: 60px;
    left: 0;
    overflow: auto;
}

.tabbar {
    left: 0;
    width: 100vw;
    height: 60px;
    bottom: 0;
    position: fixed;
    z-index: 99;
}

html,body {
    margin: 0;
    padding: 0;
    box-sizing: border-box;
}
</style>
