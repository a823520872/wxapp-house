<template>
    <view>
        <house-list :list.sync="list"></house-list>
        <v-page ref="page" :list.sync="list"></v-page>
    </view>
</template>

<script>
import HouseList from "../components/house-list";
export default {
    components: {
        HouseList
    },
    data() {
        return {
            list: [1],
            page: 1,
            hasMore: false
        };
    },
    onLoad(res) {},
    onReady() {
        this.getData();
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1);
    },
    onReachBottom() {
        this.$refs.page.next();
    },
    onReady() {
        this.$refs.page.init({
            url: "getMyCollection",
            params: {},
            fn: null
        });
    },
    methods: {}
};
</script>

<style></style>
