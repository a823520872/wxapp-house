<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="icon">
                <image src="/static/image/publish/success.png" mode="aspectFit"></image>
            </view>
            <view class="title">信息已提交成功！</view>
            <view class="tips">
                <text>请耐心等待，保持手机畅通\n</text>
                <!-- <text class="strong">在您完成审核后</text> -->
                <text>客服将尽快联系您为您审核</text>
            </view>
        </view>
        <view class="bd">
            <view class="title">联系客服快速审核</view>
            <view class="cells m_flex_center">
                <view class="">
                    <view class="cell" @tap="copy(CONFIG.wechat_number)">
                        <text class="label m_flex_item">客服微信：</text>
                        <text class="model m_flex_item">{{CONFIG.wechat_number}}</text>
                    </view>
                    <view class="cell" @tap="call(CONFIG.contact_mobile)">
                        <text class="label m_flex_item">客服联系电话：</text>
                        <text class="model m_flex_item">{{CONFIG.contact_mobile}}</text>
                    </view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {};
</script>

<style lang="scss" scoped>
.title {
    font-size: 33rpx;
}
.hd {
    width: 100%;
    background-color: #e9f9f9;
    text-align: center;
    overflow: hidden;

    .icon {
        width: 110rpx;
        height: 110rpx;
        margin: 135rpx auto 50rpx;
    }

    .tips {
        margin: 90rpx auto;
        font-size: 25rpx;
        line-height: 42rpx;
    }

    .strong {
        color: $primary-color;
    }
}

.bd {
    padding-bottom: 40rpx;

    .title {
        padding-top: 100rpx;
        text-align: center;
    }

    .cells {
        margin-top: 24rpx;
        line-height: 50rpx;
    }

    .label {
        display: inline-block;
        width: 180rpx;
        text-align: right;
        color: $text-color-inverse;
    }

    .model {
        display: inline-block;
        width: 220rpx;
        font-size: 30rpx;
        text-decoration: underline;
        color: #368aff;
    }
}
</style>
