<template>
    <div class="page">
        <template v-for="music in musicList">
            <img v-lazy="music.al.picUrl" :key="music.id" @click="add(music.id)">
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
        const data = await this.axios.get(`/netease/songList?id=${musicListId}`).catch(err => err)
        if (data.status === 200) {
            this.musicIds = data.data.data.tracks.map(item => item.id)
            // 查询歌单单独歌曲信息
            const musicData = await this.axios.get(`/netease/song?id=${this.musicIds.join(',')}`)
            if (musicData.status === 200) {
                this.musicList = musicData.data.data.songs
            }
        }
    },
    methods: {
        add (id) {
            this.$store.commit('pushIds', id)
        }
    }
}
</script>

<style scoped>
.page img {
    width: 42vw;
    margin: 4vw;
    border-radius: 5px;
}
</style>
