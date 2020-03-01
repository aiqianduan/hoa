<template>
    <!-- 顶部导航栏 -->
    <div>
        <span :class="['iconfont', isHome ? 'icon-gengduo-2' : 'icon-fanhui']" @click="returnOrMenu"></span>
        <span class="name" v-text="name"></span>
        <!-- <input type="text" v-model="searchKey" class="searchKey"> -->
        <span class="iconfont icon-sousuo search" @click="search"></span>
    </div>
</template>

<script>
export default {
    data () {
        return {
            name: '山有木兮木有枝',
            isHome: true, // 判断是否Home页
            searchKey: '' // 搜索歌曲名称
        }
    },
    methods: {
        returnOrMenu () {
            if (this.isHome) {
            } else {
                this.$router.go(-1)
            }
        },
        async search () { // 歌曲搜索
            // if (!this.searchKey.trim()) return
            // const res = await this.axios
            //     .get(`https://v1.itooi.cn/netease/search?keyword=${this.searchKey}&type=song&pageSize=20&page=0`)
            //     .then(data => data.data.data.songs)
            //     .catch(err => err)
            // console.log(res)
        }
    },
    watch: {
        $route: function (to, from) {
            this.isHome = to.name === 'Home'
        }
    },
    mounted () {
        (this.$route.name !== 'Home') && (this.isHome = false)
    }
}
</script>

<style scoped>
.headbar {
    display: flex;
    justify-content: space-around;
    align-items: center;
}

.name {
    letter-spacing: .1em;
    color: #576574;
    position: relative;
    font-size: 14px;
    font-weight: bold;
}

.searchKey {
    width: 80vw;
    outline: none;
    border-radius: 10px;
    background: none;
    border: 1px solid #ddd;
    height: 30px;
    text-indent: 1em;
    letter-spacing: .1em;
}

.iconfont {
    color: #636e72;
    font-size: 20px;
    width: 40px;
}

.hide {
    display: none;
}
</style>
