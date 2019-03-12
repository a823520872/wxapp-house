<template>
    <view>
        <button class="m_button primary large" open-type="share" plain>邀请入驻</button>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["userInfo"])
    },
    onShareAppMessage(obj) {
        return {
            title: "邀请入驻",
            path:
                this.userInfo.is_landlord === 1
                    ? `/pages/publish/index?rid=${this.userInfo.id}`
                    : `/pages/index/index?rid=${this.userInfo.id}`
        };
    }
};
</script>

<style>
</style>
