<template>
    <div>
        <!-- 歌单列表 -->
        <div class="musicList">
            <template v-for="info in infos">
                <div class="info-div" :key="info.id">
                    <router-link :to="'/musicList/'+info.id"><img class="cover-img-url" :src="info.coverImgUrl"></router-link>
                    <span class="cover-name" v-text="info.name"></span>
                </div>
            </template>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
export default {
    data () {
        return {
            infos: []
        }
    },
    async mounted () {
        // 请求数据
        const data = await this.axios.get('https://v1.itooi.cn/netease/songList/hot?pageSize=10&page=5')
        if (data.status === 200) {
            this.infos = data.data.data
        }
    }
}
</script>

<style scoped>
.musicList {
    display: flex;
    height: 250px;
    overflow-x: scroll;
    overflow-y: hidden;
    margin: 0 auto;
}

.cover-img-url {
    margin-right: 10px;
    height: 100%;
    border-radius: 5px;
}

.cover-name {
    letter-spacing: .2em;
    color: #eee;
    position: absolute;
    left: 50%;
    transform: translateX(-50%);
    top: 20%;
    font-weight: bold;
}

.info-div {
    position: relative;
    width: 100%;
}

/* 滚动条样式(不显示) */
.musicList::-webkit-scrollbar {
  width: 0;
}
</style>
