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
        ...mapState(['userInfo', 'collectReload']),
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
        this.defer.done(() => {
            this.getData(-1)
        })
    },
    onReady() {
        this.defer.resolve()
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    methods: {
        // ...mapMutations(['setCollectReload']),
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
