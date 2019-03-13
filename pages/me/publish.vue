<template>
    <view class="content">
        <view class="hd">
            <view class="avatar">
                <image :src="userInfo.avatar" mode="aspectFit"></image>
            </view>
            <view class="name">{{userInfo.nickname}}</view>
            <view class="tips">已发布29套 还有2套空房</view>
        </view>
        <view class="tabs m_flex">
            <view class="m_flex_item">
                <view :class="{'tab': true, 'active' : tab === 2}" @tap="chooseTab(2)">空房（发布中）</view>
            </view>
            <view class="m_flex_item">
                <view :class="{'tab': true, 'active' : tab === 1}" @tap="chooseTab(1)">已租（未发布）</view>
            </view>
        </view>
        <publish-list :list.sync="list"></publish-list>
        <v-page ref="page" :list.sync="list"></v-page>
    </view>
</template>

<script>
import { mapState } from "vuex";
import publishList from "../components/publish-list.vue";
export default {
    components: {
        publishList
    },
    computed: {
        ...mapState(["userInfo"])
    },
    data() {
        return {
            tab: 2,
            list: []
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
    methods: {
        getData() {
            const self = this;
            this.$refs.page.init({
                url: "getMyHouse",
                params: {
                    hr_id: "",
                    is_booked: self.tab
                },
                fn: null
            });
        },
        chooseTab(v) {
            this.tab = v;
            this.getData();
        }
    }
};
</script>

<style lang="scss" scoped>
.hd {
    height: 347upx;
    background-color: $main-color;
    text-align: center;
    overflow: hidden;
    .avatar {
        position: relative;
        width: 131upx;
        height: 131upx;
        margin: 82upx auto 0;
        border-radius: 50%;
        background-color: $uni-bg-color;
        overflow: hidden;
        border: 2upx solid #fff;
    }
    .name {
        margin-top: 16upx;
        font-size: 33upx;
    }
    .tips {
        margin-top: 6upx;
        color: $primary-color;
    }
}
.tabs {
    position: relative;
    padding: 0 30upx;
    background-color: #fff;
    line-height: 100upx;
    text-align: center;
    font-size: 33upx;

    &::after {
        content: " ";
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        border-bottom: 1upx solid $border-color;
        z-index: 1;
    }
    .tab {
        position: relative;
        color: $text-color-inverse;
    }
    .active {
        color: $text-color;
        &::after {
            content: " ";
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            border-bottom: 2upx solid $main-color;
            z-index: 10;
        }
    }
}
</style>
