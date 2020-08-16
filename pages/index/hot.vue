<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="logo">
                <image src="/static/image/index/logo.png" mode="aspectFit"></image>
            </view>
            <view class="title">广州城中村租房平台</view>
            <view class="slogan">
                为您推荐广州城中村时下最热门房源
            </view>
        </view>
        <view class="bd">
            <button class="m_button primary" open-type="contact">关注平台</button>
            <view class="slogan">客服窗回复“1” 即可获得关注入口</view>
        </view>
        <!-- <view class="fd">
            <view class="qrcode" @tap="viewImg">
                <image src="/static/image/index/qrcode.png" mode="aspectFit"></image>
            </view>
            <view>长按扫码看房源</view>
        </view> -->
    </view>
</template>

<script>
export default {
    // methods: {
    //     viewImg() {
    //         uni.previewImage({
    //             urls: ["/static/image/index/qrcode.png"]
    //         });
    //     }
    // }
};
</script>

<style lang="scss" scoped>
.hd {
    position: relative;
    overflow: hidden;
    text-align: center;
    .logo {
        width: 132rpx;
        height: 132rpx;
        margin: 164rpx auto 0;
    }
    .title {
        margin-top: 30rpx;
        font-size: 37rpx;
    }
    .slogan {
        margin-top: 37rpx;
        font-size: 31rpx;
        color: $text-color-inverse;
    }
    // .strong {
    //     font-size: 41rpx;
    //     color: $primary-color;
    // }
}
.bd {
    position: relative;
    overflow: hidden;
    text-align: center;
    .m_button {
        width: 280rpx;
        height: 80rpx;
        padding: 0;
        margin-top: 163rpx;
        line-height: 78rpx;
        border-radius: 12rpx;
        font-size: 30rpx;
    }
    .slogan {
        margin-top: 37rpx;
        font-size: 31rpx;
        color: $text-color-inverse;
    }
}
.fd {
    text-align: center;
    font-size: 30rpx;
    color: $primary-color;
    .qrcode {
        width: 300rpx;
        height: 300rpx;
        margin: 94rpx auto 0;
    }
}
</style>
