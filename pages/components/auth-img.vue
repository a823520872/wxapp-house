<template>
    <view class="auth_content m_flex_center m_flex_middle">
        <image class="img_auth" src="/static/image/index/auth.png"></image>
        <text>认证房东</text>
    </view>
</template>

<script>
export default {}
</script>

<style lang="scss" scoped>
.auth_content {
    position: relative;
    width: 146rpx;
    height: 38rpx;
    background-color: $primary-color;
    line-height: 38rpx;
    border-radius: 6rpx;
    text-align: center;
    font-size: 24rpx;
    color: #fff;
    overflow: hidden;

    .img_auth {
        width: 26rpx;
        height: 26rpx;
        margin-right: 4rpx;
    }
}
</style>
