<template>
    <view class="modal" v-if="temp">
        <view v-if="temp.contact_mobile" class="link m_flex_justify">
            <view>手机号：{{temp.contact_mobile}}</view>
            <button class="m_button main" plain @tap="call">拨打</button>
        </view>
        <view v-if="temp.wechat_number" class="link m_flex_justify">
            <view>微信号：{{temp.wechat_number}}</view>
            <button class="m_button main" plain @tap="copy">复制</button>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        temp: Object
    },
    methods: {
        call() {
            const self = this;
            if (self.contact_mobile) {
                uni.makePhoneCall({
                    phoneNumber: self.contact_mobile
                });
            }
        },
        copy() {
            const self = this;
            if (self.wechat_number) {
                uni.setClipboardData({
                    data: self.wechat_number,
                    success() {
                        uni.showToast({
                            title: "复制成功",
                            icon: "success"
                        });
                    }
                });
            }
        }
    }
}
</script>

<style>
</style>
