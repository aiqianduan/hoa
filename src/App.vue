<template>
    <div id="app">
        <!-- headbar component -->
        <Headbar class="headbar"></Headbar>
        <router-view class="page"></router-view>
        <!-- tabbar component -->
        <Tabbar class="tabbar"></Tabbar>
    </div>
</template>

<script>
import Headbar from '@/components/Headbar.vue'
import Tabbar from '@/components/Tabbar.vue'
export default {
    components: {
        Headbar,
        Tabbar
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
    height: 60px;
    z-index: 99;
    background-color: white;
    top: 0;
    left: 0;
}

.page {
    position: absolute;
    top: 60px;
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
    /* box-sizing: border-box; */
}
</style>
