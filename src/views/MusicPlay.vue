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
            <div class="progress-btn" @touchmove="touchmove" ref="progressbaButton"></div>
            <div class="play">
                <img :src="imgs.prevSong" @click="prev-song" class="green">
                <img :src="playFlag ? imgs.play : imgs.pause" class="yellow" @touchstart="acStart" @touchend="acEnd">
                <img :src="imgs.nextSong" @click="next-song" class="green">
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
            $('.progress-btn').css({
                left: this.$refs.progressbaCover.clientWidth - 5
            })
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
            this.option()
        }
    },
    async created () {
        this.currentId = this.$route.params.id
        const res = await this.axios.get(`/netease/url?id=${this.currentId}&quality=flac&isRedirect=0`)
        const data = await this.axios.get(`/netease/song?id=${this.currentId}`)
        if (data.status === 200) {
            this.imgUrl = data.data.data.songs[0].al.picUrl
        }
        if (res.status === 200) {
            this.mp3Link = res.data.data
        }
        this.$store.commit('pushIds', this.currentId)
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
    margin-top: 80px;
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
    margin-top: 80px;
    width: 0;
    height: 5px;
    background-color: #1dd1a1;
    border-radius: 5px;
    position: absolute;
    top: 50vh;
}

.progress-btn {
    margin-top: 80px;
    width: 14px;
    height: 14px;
    background-color: #1dd1a1;
    border-radius: 50%;
    position: absolute;
    top: 50vh;
    transform: translateY(-5px);
}

.play {
    margin-top: 65vh;
    display: flex;
    justify-content: space-between;
    align-items: center;
    height: 100px;
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

@keyframes rotate {
    to {
        transform: rotate(360deg);
    }
}
</style>
