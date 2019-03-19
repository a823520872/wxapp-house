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
            list: []
        };
    },
    onLoad(res) {},
    onReady() {
        this.$refs.page.init({
            url: "getMyCollection",
            params: {},
            fn(data) {
                return data.map(item => {
                    item.image_urls = item.image_urls
                        ? item.image_urls.split(",")
                        : [];
                    return item;
                });
            }
        });
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1);
    },
    onReachBottom() {
        this.$refs.page.next();
    },
    methods: {}
};
</script>

<style></style>
