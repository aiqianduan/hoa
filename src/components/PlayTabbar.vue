<template>
    <div :class="playPageFlag ? 'full' : ''">
        <audio :src="mp3Link" muted preload ref="mp3" @canplay="canplay" @timeupdate="timeupdate" @ended="ended">
            Your browser does not support the audio element.
        </audio>
        <div :class="playPageFlag ? 'hidden' : 'playtabbar'">
            <img class="avator" :src="imgUrl" @click="playPage">
            <span :class="['iconfont', flag ? 'icon-ai07' : 'icon-ai23', touchOpt ? 'touch' : '']"
                @click="opt" @touchstart="touchstartOpt" @touchend="touchendOpt"></span>
            <span :class="['iconfont', 'icon-ai09', touchNext? 'touch' : '']"
                @click="next" @touchstart="touchstartNext" @touchend="touchendNext"></span>
        </div>
        <div :class="playPageFlag ? 'musicplay' : 'hidden'">
            <img :src="imgUrl" class="cover">
            <!-- mp3 ui -->
            <div class="audio-ui">
                <div class="progress">
                    <div class="progress-bar" ref="progressbar"></div>
                    <div class="progress-cover" ref="progressbaCover"></div>
                    <div class="progress-btn" @touchmove="touchmove" ref="progressbaButton"></div>
                </div>
                <div class="play">
                    <img :src="imgs.prevSong" @click="prev-song" class="green">
                    <img :src="flag ? imgs.play : imgs.pause" class="yellow" @touchstart="acStart" @touchend="acEnd">
                    <img :src="imgs.nextSong" @click="next" class="green">
                </div>
            </div>
            <!-- return -->
            <div class="return">
                <img :src="imgs.return" @click="returnMain">
            </div>
        </div>
    </div>
</template>

<script>
import { EventBus } from '../eventbus.js'
import $ from 'jquery'
export default {
    data () {
        return {
            mp3Link: '',
            arrs: [],
            status: '',
            imgUrl: '',
            load: false, // 判断音频资源是否加载完毕
            routeName: '', // 路由name,用于判断该进行组件通信
            flag: false,
            songs: [425710576, 1317536023, 502242110, 29593809, 28987543,
                456185374, 381825, 28815250, 521417027, 29593805, 525241956, 1387110808, 66159, 1318568346,
                347230, 28892408, 1400256289, 168091, 461864856, 355992,
                25638273, 28160015, 167975, 1368371706, 519250024],
            id: '',
            touchOpt: false,
            touchNext: false,
            playPageFlag: false,
            imgs: {
                prevSong: require('../assets/musicplay/prev-song.png'),
                nextSong: require('../assets/musicplay/next-song.png'),
                pause: require('../assets/musicplay/pause.png'),
                play: require('../assets/musicplay/play.png'),
                return: require('../assets/musicplay/return.png')
            }
        }
    },
    computed: {
        storeIds () {
            return this.$store.state.ids
        }
    },
    methods: {
        canplay () {
            this.load = true
            if (this.flag) {
                this.$refs.mp3.play()
            }
        },
        async play (info) {
            const { status, time, id } = info
            if (time === 1) {
                // 第一次点击才加载audio(避免重复加载)
                this.loadMusicAndImg(id)
            }
            if (status === 'play' && this.load) {
                this.$refs.mp3.play()
            }
            if (status === 'pause' && this.load) {
                this.$refs.mp3.pause()
            }
            this.flag = !this.flag
        },
        timeupdate () {
            // 动态进度修改
            const progress = this.$refs.mp3.currentTime / this.$refs.mp3.duration * 100
            this.$refs.progressbaCover.style.width = `${progress}%`
            $('.progress-btn').css({
                left: this.$refs.progressbaCover.clientWidth - 5
            })
        },
        opt () {
            if (!this.load) return
            if (this.flag) {
                this.$refs.mp3.pause()
                $('.cover').addClass('rotate').css({
                    animationPlayState: 'paused'
                })
            } else {
                this.$refs.mp3.play()
                $('.cover').addClass('rotate').css({
                    animationPlayState: 'running'
                })
            }
            this.flag = !this.flag
        },
        async loadMusicAndImg (id) {
            // 加载歌曲
            const { res: mp3Link, data: imgUrl } = await this.axios.all([
                // 请求音频资源
                this.axios.get(`/netease/url?id=${id}&quality=128&isRedirect=0`),
                // 请求图片资源
                this.axios.get(`/netease/pic?id=${id}&isRedirect=0`)])
                .then(this.axios.spread((res, data) => {
                    res = res.data.data
                    data = data.data.data
                    return { res, data }
                }))
                .catch(err => err)
            // * 重置播放状态
            this.load = false
            this.mp3Link = mp3Link
            this.imgUrl = imgUrl
            this.id = id
        },
        next () {
            this.songs.push(this.songs.shift())
            this.loadMusicAndImg(this.songs[0])
        },
        ended () {
            this.next()
        },
        touchstartOpt () { // 手指按下
            this.touchOpt = true
        },
        touchendOpt () { // 手指松开
            this.touchOpt = false
        },
        touchstartNext () { // 手指按下
            this.touchNext = true
        },
        touchendNext () { // 手指松开
            this.touchNext = false
        },
        playPage () {
            this.playPageFlag = true
        },
        touchmove (ev) {
            const left = ev.touches[0].pageX - this.$refs.progressbaButton.offsetParent.offsetLeft
            if (left > 0 && left < this.$refs.progressbar.clientWidth - 14) {
                $('.progress-btn').css({
                    left
                })
                const percent = Number.parseInt($('.progress-btn').css('left').replace('px', '')) / this.$refs.progressbar.clientWidth
                const seconds = this.$refs.mp3.duration * percent
                this.$refs.mp3.currentTime = seconds
            }
        },
        acStart (el) {
            $(el.touches[0].target).addClass('active')
        },
        acEnd (el) {
            $(el.target).removeClass('active')
            // 切换暂停/播放
            this.opt()
        },
        returnMain () {
            this.playPageFlag = false
        }
    },
    async mounted () {
        if (this.$route.name === 'MusicPlay') {
            $('.playtabbar').css({
                display: 'none'
            })
        }
        // 随机歌曲Id,当用户未选择歌曲
        this.$store.commit('pushIds', this.songs)
        this.loadMusicAndImg(this.songs[0])
        EventBus.$on('play', info => {
            this.play(info)
        })
    },
    watch: {
        storeIds: function (newVal, oldVal) {
            if (newVal.length !== oldVal.length) {
                this.loadMusicAndImg(newVal[0])
            }
        },
        $route: function (to, from) {
            if (to.name === 'MusicPlay') {
                this.routeName = 'MusicPlay'
            }
            if (to.name === 'MusicList') {
                this.routeName = 'MusicList'
            }
        }
    }
}
</script>

<style scoped>
.avator {
    width: 55px;
    border-radius: 50%;
}

.playtabbar {
    height: 100%;
    display: flex;
    justify-content: space-around;
    align-items: center;
    box-shadow: 0 -2px 10px #dfe6e9;
    background: white;
}

.iconfont {
    color: #636e72;
    font-size: 20px;
    display: block;
    padding: 10px;
}

.touch {
    transition: background-color ease infinite;
    background-color: rgba(29, 209, 161,.3);
    border-radius: 50%;
}

.musicplay {
    width: 100vw;
    height: 100vh;
    display: flex;
    flex-direction: column;
    align-items: center;
    justify-content: center;
    background-color: white;
}

.hidden {
    height: 0;
    visibility:hidden;
}

.full {
    height: 100vh;
    width: 100vw;
}

.audio-ui {
    position: relative;
    margin-top: 15vh;
    height: 40vh;
}

.progress {
    width: 90vw;
    margin: 0 auto;
    position: relative;
}

.progress-bar {
    width: 90vw;
    height: 5px;
    background-color: #dfe6e9;
    border-radius: 5px;
}

.progress-cover {
    width: 0;
    height: 5px;
    background-color: #1dd1a1;
    border-radius: 5px;
    position: absolute;
    top: 0;
}

.progress-btn {
    width: 20px;
    height: 20px;
    background-color: #1dd1a1;
    border-radius: 50%;
    position: absolute;
    position: absolute;
    top: -7px;
}

.play {
    margin-top: 10vh;
    width: 100vw;
    display: flex;
    align-items: center;
    justify-content: space-evenly;
}

.return {
    width: 100vw;
}

.return img {
    width: 25px;
    height: 25px;
}

img.green {
    width: 40px;
    height: 40px;
}

img.yellow {
    width: 60px;
}

.cover {
    margin-top: 25vh;
    width: 60vw;
    max-width: 400px;
    max-height: 400px;
    border-radius: 50%;
}

.rotate {
    animation: rotate 10s linear infinite;
}

.active {
    padding: 5px;
    border-radius: 50%;
    transition: padding 2s ease;
    z-index: -2;
}

.yellow.active {
    background-color: #FFB584;
    opacity: .4;
}

.return img {
    width: 40px;
    height: 40px;
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
