<template>
    <view class="modal" v-if="temp">
        <view v-if="temp.contact_mobile" class="link m_flex_justify">
            <view>手机号：{{temp.contact_mobile}}</view>
            <button class="m_button main" plain @tap="call(temp.contact_mobile)">拨打</button>
        </view>
        <view v-if="temp.wechat_number" class="link m_flex_justify">
            <view>微信号：{{temp.wechat_number}}</view>
            <button class="m_button main" plain @tap="copy(temp.wechat_number)">复制</button>
        </view>
        <view class="tips">温馨提示：加微信打电话备注说明<text class="strong">来自"村里租房"</text>，可享最优服务</view>
    </view>
</template>

<script>
export default {
    props: {
        temp: Object
    }
};
</script>

<style lang="scss" scoped>
.modal {
    .tips {
        color: #999;
    }
    .strong {
        color: #666;
    }
}
</style>
