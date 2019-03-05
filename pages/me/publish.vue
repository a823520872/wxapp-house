<template>
    <view class="content">
        <view class="hd">
            <view class="avatar">
                <image mode="aspectFit"></image>
            </view>
            <view class="name">房东微信昵称</view>
            <view class="tips">已发布29套 还有2套空房</view>
        </view>
        <view class="tabs m_flex">
            <view class="m_flex_item">
                <view class="tab active">空房（发布中）</view>
            </view>
            <view class="m_flex_item">
                <view class="tab">已租（未发布）</view>
            </view>
        </view>
        <publish-list :list.sync="list"></publish-list>
    </view>
</template>

<script>
import publishList from "../components/publish-list.vue";
export default {
    components: {
        publishList
    },
    data() {
        return {
            list: [1, 2, 3]
        };
    },
    onLoad(res) {
        console.log("onLoad");
    },
    onReady() {
        console.log("onReady");
    },
    onPullDownRefresh() {
        console.log("onPullDownRefresh");
    },
    onReachBottom() {
        console.log("onReachBottom");
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
