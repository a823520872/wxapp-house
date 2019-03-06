<template>
    <view>
        <v-modal ref="user_modal">
            <block slot="footer">
                <button class="m_button" open-type="getUserInfo" @getuserinfo="getUserInfoByBtn">
                    去授权
                </button>
            </block>
        </v-modal>
    </view>
</template>

<script>
import { mapMutations } from "vuex";
export default {
    props: {},
    data() {
        return {};
    },
    methods: {
        ...mapMutations(["setUserInfo"]),
        getUserInfoByBtn(e) {
            console.log(JSON.stringify(e.detail));
            const { errMsg, encryptedData, iv, signature, userInfo } = e.detail;
            this.$refs.user_modal.hide();
            if (errMsg === "getUserInfo:ok") {
                this.setUserInfo(userInfo);
            }
        },
        getUserInfo(e) {
            if (e) {
                this.getUserInfoByBtn(e);
            } else {
                this.$refs.user_modal.show({
                    content: "为了更好的用户体验，需要获取您的个人信息",
                    cancelText: "取消"
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.m_button {
    width: 100%;
    font-size: 36upx;
    line-height: 96upx;
    font-size: 36upx;
    padding: 0;
    color: $uni-color-success;
}
</style>
