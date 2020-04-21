<template>
    <view class="content">
        <house-list :list.sync="list"></house-list>
        <v-page ref="page" :list.sync="list"></v-page>
    </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import HouseList from '../components/house-list'
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
        }
    },
    onLoad(res) {},
    onShow() {
        if (this.collectReload) {
            this.setCollectReload(false)
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
        ...mapMutations(['setCollectReload']),
        getData() {
            const self = this
            this.$refs.page.init({
                url: 'getMyCollection',
                params: {},
                fn: null,
            })
        },
    },
}
</script>

<style></style>
