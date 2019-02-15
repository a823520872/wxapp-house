<template>
    <view>
        <button class="m_button primary large" open-type="share" plain>邀请入驻</button>
    </view>
</template>

<script>
export default {
    onShareAppMessage(obj) {
        return {
            title: '邀请入驻',
            path: '/pages/publish/index'
        }
    }
}
</script>

<style>

</style>
