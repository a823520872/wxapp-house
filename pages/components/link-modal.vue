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
    </view>
</template>

<script>
export default {
    props: {
        temp: Object
    }
};
</script>

<style>
</style>
