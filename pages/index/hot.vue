<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="logo">
                <image src="/static/image/index/logo.png" mode="aspectFit"></image>
            </view>
            <view class="title">广州村里租房公众号</view>
            <view class="slogan">
                <text class="strong">每周</text>为您推荐广州<text class="strong">城中村</text>时下<text class="strong">最热门</text>房源
            </view>
        </view>
        <view class="bd">
            <button class="m_button primary" open-type="contact">看热门房源</button>
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
        width: 132upx;
        height: 132upx;
        margin: 164upx auto 0;
    }
    .title {
        margin-top: 30upx;
        font-size: 37upx;
    }
    .slogan {
        margin-top: 37upx;
        font-size: 31upx;
        color: $text-color-inverse;
    }
    // .strong {
    //     font-size: 41upx;
    //     color: $primary-color;
    // }
}
.bd {
    position: relative;
    overflow: hidden;
    text-align: center;
    .m_button {
        width: 280upx;
        height: 80upx;
        padding: 0;
        margin-top: 163upx;
        line-height: 78upx;
        border-radius: 12upx;
        font-size: 30upx;
    }
    .slogan {
        margin-top: 37upx;
        font-size: 31upx;
        color: $text-color-inverse;
    }
}
.fd {
    text-align: center;
    font-size: 30upx;
    color: $primary-color;
    .qrcode {
        width: 300upx;
        height: 300upx;
        margin: 94upx auto 0;
    }
}
</style>
