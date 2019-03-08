<template>
    <view v-if="isShow">
        <v-mask @click="hide"></v-mask>
        <view class="poster_wrap">
            <view class="tips">
                <text class="strong">点击长按保存图片</text>
                <text>分享到朋友圈 提高您的租房成功率</text>
            </view>
            <view class="poster_contain">
                <view class="icon_close" @tap="hide">
                    <image src="/static/image/publish/close.png" mode="aspectFit"></image>
                </view>
                <view class="poster_box">
                    <image @tap="showPoster" src="/static/image/publish/poster.png" mode="aspectFit"></image>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            isShow: false
        }
    },
    methods: {
        show() {
            this.isShow = true
        },
        hide() {
            this.isShow = false
        },
        showPoster() {
            uni.previewImage({
                urls: ['/static/image/publish/poster.png']
            })
        }
    }
}
</script>

<style lang="scss">
.poster {
    &_wrap {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        font-size: 30upx;
        line-height: 42upx;
        z-index: 999;
        color: #fff;
        overflow-y: auto;

        .tips {
            width: 374upx;
            margin: 0 auto;
            padding-top: 125upx;
            text-align: center;
        }

        .strong {
            padding-right: 14upx;
            color: $primary-color;
        }
    }
    &_contain {
        position: relative;
        padding: 45upx 108upx;
        .icon_close {
            position: absolute;
            top: 0;
            right: 0;
            width: 44upx;
            height: 44upx;
            margin-top: -20upx;
            margin-right: 50upx;
            padding: 20upx;
        }
    }
    &_box {
        width: 534upx;
        height: 948upx;
    }
}
</style>
