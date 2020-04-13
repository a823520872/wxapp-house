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
    width: 146upx;
    height: 38upx;
    background-color: $primary-color;
    line-height: 38upx;
    border-radius: 6upx;
    text-align: center;
    font-size: 24upx;
    color: #fff;
    overflow: hidden;

    .img_auth {
        width: 26upx;
        height: 26upx;
        margin-right: 4upx;
    }
}
</style>
