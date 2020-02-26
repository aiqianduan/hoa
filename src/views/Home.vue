<template>
    <div>
        <div class="recommend">
            <span>歌单推荐</span>
            <span>more>></span>
        </div>
        <!-- 歌单列表 -->
        <div class="musicList">
            <template v-for="(info, index) in infos">
                <div class="info-div" :key="info.id">
                    <router-link :to="'/musicList/'+info.id">
                        <img data-aos-duration="3000" data-aos-easing="linear"
                            :data-aos="index % 3 == 0 ? 'fade-right' : index % 3 === 1 ? 'zoom-in' : 'fade-left'"
                            class="cover-img-url" v-lazy="info.coverImgUrl">
                    </router-link>
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
        const data = await this.axios.get('/netease/songList/hot?pageSize=6&page=5')
        if (data.status === 200) {
            this.infos = data.data.data
        }
    },
    computed: {
        storeIds () {
            return this.$store.state.ids
        }
    },
    watch: {
        storeIds: newVal => {
            console.log(newVal)
        }
    }
}
</script>

<style scoped>
.recommend {
    letter-spacing: .1em;
    color: #576574;
    position: relative;
    font-weight: bold;
    font-size: 10px;
    display: flex;
    margin: 0 25px 0px 25px;
    justify-content: space-between;
}
.musicList {
    margin: 10px;
    display: flex;
    /* height: 280px; */
    overflow: hidden;
    flex-wrap: wrap;
    justify-content: center;
}

.cover-img-url {
    border-radius: 5px;
    width: 100%;
    /* 比例换算得来 */
    min-height: 29vw;
}

.cover-name {
    letter-spacing: .1em;
    color: #576574;
    position: relative;
    font-weight: bold;
    font-size: 10px;
}

.info-div {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 30%;
    margin: 10px 3px 0 3px;
}

/* 滚动条样式(不显示) */
.musicList::-webkit-scrollbar {
  width: 0;
}
</style>
