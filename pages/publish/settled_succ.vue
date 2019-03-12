<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="icon">
                <image src="/static/image/publish/success.png" mode="aspectFit"></image>
            </view>
            <view class="title">信息已提交成功！</view>
            <view class="tips">
                <view>
                    <text>请耐心等待，村长将在2小时内联系您；</text>
                </view>
                <view>
                    <text class="strong">在您完成缴费后</text>
                    <text>我们将为您开通房东权限。</text>
                </view>
            </view>
        </view>
        <view class="bd">
            <view class="title">联系村长自主缴费</view>
            <view class="cells">
                <view class="cell m_flex_middle" @tap="copy(wechat_number)">
                    <view class="label m_flex_item">村长微信：</view>
                    <view class="model m_flex_item">{{wechat_number}}</view>
                </view>
                <view class="cell m_flex_middle" @tap="call(contact_mobile)">
                    <view class="label m_flex_item">村长联系电话：</view>
                    <view class="model m_flex_item">{{contact_mobile}}</view>
                </view>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    data() {
        return {
            contact_mobile: "18922717216",
            wechat_number: "fangdada1225"
        };
    }
};
</script>

<style lang="scss" scoped>
.title {
    font-size: 33upx;
}
.hd {
    width: 100%;
    background-color: #e9f9f9;
    text-align: center;
    overflow: hidden;

    .icon {
        width: 110upx;
        height: 110upx;
        margin: 135upx auto 50upx;
    }

    .tips {
        margin: 90upx auto;
        line-height: 42upx;
    }

    .strong {
        color: $primary-color;
    }
}

.bd {
    padding-bottom: 40upx;

    .title {
        padding-top: 100upx;
        text-align: center;
    }

    .cells {
        margin-top: 24upx;
        line-height: 50upx;
    }

    .label {
        text-align: right;
        color: $text-color-inverse;
    }

    .model {
        font-size: 30upx;
        text-decoration: underline;
        color: #368aff;
    }
}
</style>
