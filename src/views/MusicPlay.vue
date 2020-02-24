<template>
    <div class="page">
        <audio :src="mp3Link" muted @timeupdate="timeupdate" @canplay="canplay" ref="mp3">
            Your browser does not support the audio element.
        </audio>
        <img :src="imgUrl" class="cover">
        <!-- mp3 ui -->
        <div class="audio-ui">
            <div class="progress-bar" ref="progressbar"></div>
            <div class="progress-cover" ref="progressbaCover"></div>
            <div class="play">
                <img :src="imgs.prevSong" @click="prev-song">
                <img :src="playFlag ? imgs.play : imgs.pause" @click="option">
                <img :src="imgs.nextSong" @click="next-song">
            </div>
        </div>
    </div>
</template>

<script>
import $ from 'jquery'
export default {
    data () {
        return {
            currentId: '',
            mp3Link: '',
            imgs: {
                prevSong: require('../assets/musicplay/prev-song.png'),
                nextSong: require('../assets/musicplay/next-song.png'),
                pause: require('../assets/musicplay/pause.png'),
                play: require('../assets/musicplay/play.png')
            },
            playFlag: false,
            duration: 0,
            imgUrl: ''
        }
    },
    methods: {
        canplay () {
            // 允许播放
        },
        // 操作按钮(播放暂停)
        option () {
            // 切换暂停/播放
            this.playFlag = !this.playFlag
            if (this.playFlag) {
                this.$refs.mp3.play()
                $('.cover').addClass('rotate').css({
                    animationPlayState: 'running'
                })
            } else {
                this.$refs.mp3.pause()
                $('.cover').addClass('rotate').css({
                    animationPlayState: 'paused'
                })
            }
        },
        timeupdate (el) {
            // 动态进度修改
            const progress = this.$refs.mp3.currentTime / this.$refs.mp3.duration * 100
            this.$refs.progressbaCover.style.width = `${progress}%`
        }
    },
    async created () {
        this.currentId = this.$route.params.id
        const res = await this.axios.get(`https://v1.itooi.cn/netease/url?id=${this.currentId}&quality=flac&isRedirect=0`)
        const data = await this.axios.get(`https://v1.itooi.cn/netease/song?id=${this.currentId}`)
        if (data.status === 200) {
            this.imgUrl = data.data.data.songs[0].al.picUrl
        }
        if (res.status === 200) {
            this.mp3Link = res.data.data
        }
    }
}
</script>

<style scoped>
/* audio {
    display: none;
} */

.page {
    width: 100vw;
    display: flex;
    /* flex-direction: column; */
    justify-content: center;
}

.audio-ui {
    position: relative;
    width: 90vw;
    margin: 0 auto;
}

.progress-bar {
    margin-top: 100px;
    width: 90vw;
    height: 5px;
    background-color: #dfe6e9;
    border-radius: 5px;
    position: absolute;
    top: 50vh;
    left: 50%;
    transform: translateX(-50%);
}

.progress-cover {
    margin-top: 100px;
    width: 0;
    height: 5px;
    background-color: #1dd1a1;
    border-radius: 5px;
    position: absolute;
    top: 50vh;
}

.play {
    margin-top: 70vh;
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.cover {
    width: 60vw;
    max-width: 400px;
    position: absolute;
    top: 10vh;
    border-radius: 50%;
}

.rotate {
    animation: rotate 10s linear infinite;
    margin: 0 auto;
}

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
