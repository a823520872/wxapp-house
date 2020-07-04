<template>
    <view class="content">
        <house-list :list.sync="list"></house-list>
        <v-page ref="page" :list.sync="list"></v-page>
    </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HouseList from '../components/house-list'
import Defer from '../../common/defer.js'
export default {
    computed: {
        ...mapState(['userInfo']),
    },
    components: {
        HouseList,
    },
    data() {
        return {
            list: [],
            defer: new Defer(),
        }
    },
    onLoad(res) {},
    onShow() {
        let reloadPage = [...this.$store.state.reloadPage]
        if (reloadPage.length) {
            let i = reloadPage.findIndex(v => v === '/pages/me/collection')
            if (i === -1) return
            reloadPage.splice(i, 1)
            this.$store.commit('setVal', { key: 'reloadPage', val: reloadPage })
            this.getData()
        }
    },
    onReady() {
        this.getData()
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    methods: {
        getData(n) {
            const self = this
            this.$refs.page.init({
                url: 'getMyCollection',
                params: {},
                n,
                fn: null,
            })
        },
    },
}
</script>
