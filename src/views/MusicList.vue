<template>
    <div class="page">
        <template v-for="music in musicList">
            <router-link :to="'/music/play/'+music.id" :key="music.id">
                <img v-lazy="music.al.picUrl">
            </router-link>
        </template>
    </div>
</template>

<script>
export default {
    data () {
        return {
            musicIds: [],
            musicList: []
        }
    },
    async mounted () {
        const musicListId = this.$route.params.id
        // 查询歌单详情
        const data = await this.axios.get(`/netease/songList?id=${musicListId}`)
        if (data.status === 200) {
            this.musicIds = data.data.data.tracks.map(item => item.id)
            // 查询歌单单独歌曲信息
            const musicData = await this.axios.get(`/netease/song?id=${this.musicIds.join(',')}`)
            if (musicData.status === 200) {
                this.musicList = musicData.data.data.songs
            }
        }
    }
}
</script>

<style scoped>
/* .page {
    position: relative;
    width: 100vw;
    height: 80vh;
    overflow: auto;
    top: 60px;
} */

.page img {
    width: 42vw;
    margin: 4vw;
    border-radius: 5px;
}
</style>
