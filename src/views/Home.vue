<template>
    <div>
        <!-- 轮播图 -->
        <div class="swiper-container">
            <!-- Additional required wrapper -->
            <div class="swiper-wrapper">
                <div class="swiper-slide" v-for="(imgUrl,index) in swiperImgs" :key="index">
                    <img :src="imgUrl.picUrl">
                </div>
            </div>
            <!-- Add Pagination -->
            <div class="swiper-pagination"></div>
        </div>
        <div class="recommend">
            <span>歌单推荐</span>
            <span>more>></span>
        </div>
        <!-- 歌单列表 -->
        <div class="musicList">
            <template v-for="info in infos">
                <div class="info-div" :key="info.id">
                    <router-link :to="'/musicList/'+info.id">
                        <img class="cover-img-url" v-lazy="info.coverImgUrl">
                    </router-link>
                    <span class="cover-name" v-text="info.name"></span>
                </div>
            </template>
        </div>
        <router-view></router-view>
    </div>
</template>

<script>
// 引入swiper
import 'swiper/css/swiper.min.css'
import Swiper from 'swiper'
export default {
    data () {
        return {
            infos: [],
            swiperImgs: []
        }
    },
    async created () {
        // 请求数据
        const { param1: infos, param2: swiperImgs } = await this.axios.all([
            // 请求热门歌单资源
            this.axios.get('/netease/songList/hot?pageSize=6&page=4'),
            // 请求轮播图资源
            this.axios.get('/netease/banner')])
            .then(this.axios.spread((param1, param2) => {
                param1 = param1.data.data
                param2 = param2.data.data
                return { param1, param2 }
            }))
            .catch(err => err)
        this.infos = infos
        this.swiperImgs = swiperImgs
        // * 必须dom加载完毕再执行
        this.$nextTick(() => {
            // eslint-disable-next-line no-new
            new Swiper('.swiper-container', {
                loop: true,
                speed: 2000,
                spaceBetween: 20,
                autoplay: {
                    delay: 5000
                },
                pagination: {
                    el: '.swiper-pagination',
                    dynamicBullets: true
                }
            })
        })
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
    font-size: 10px;
}

.info-div {
    display: flex;
    flex-direction: column;
    position: relative;
    width: 30%;
    margin: 10px 5px 0 5px;
}

.swiper-container {
    width: 94vw;
}

.swiper-slide img {
    width: 100%;
    border-radius: 5px;
}

/* 滚动条样式(不显示) */
.musicList::-webkit-scrollbar {
    width: 0;
}
</style>
