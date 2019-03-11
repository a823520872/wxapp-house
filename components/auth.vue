<template>
    <view>
        <v-modal ref="user_modal">
            <block slot="footer">
                <button class="m_button" open-type="getUserInfo" @getuserinfo="getUserInfoByBtn">
                    去授权
                </button>
            </block>
        </v-modal>
        <v-modal ref="phone_modal">
            <block slot="footer">
                <button class="m_button" open-type="getUserInfo" @getuserinfo="getPhoneByBtn">
                    去授权
                </button>
            </block>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations } from "vuex";
export default {
    props: {},
    data() {
        return {
            session3rd: ""
        };
    },
    computed: {
        ...mapState(["code", "hasRigister"])
    },
    methods: {
        ...mapMutations(["setUserInfo", "setCode"]),
        signUp(data) {
            this.setCode("");
            this.$request.getToken(data).then(res => {
                if (res && res.data && res.data.userinfo) {
                    this.session3rd = res.data.session3rd;
                    // this.getPhone();
                    uni.setStorageSync("tk", res.data.userinfo.token);
                    this.setUserInfo(res.data.userinfo);
                }
            });
        },
        getUserInfoByBtn(e) {
            const self = this;
            const {
                errMsg,
                rawData,
                encryptedData,
                iv,
                signature,
                userInfo
            } = e.detail;
            if (errMsg === "getUserInfo:ok") {
                this.$refs.user_modal.hide();
                // this.setUserInfo(userInfo);
                this.signUp({
                    code: self.code,
                    rawData,
                    encryptedData,
                    signature,
                    iv
                });
            }
        },
        getUserInfo(e) {
            const self = this;
            if (!this.code) {
                this.$request.login().then(code => {
                    if (e) {
                        this.getUserInfoByBtn(e);
                    } else {
                        this.$refs.user_modal.show({
                            content: "为了更好的用户体验，需要获取您的个人信息",
                            cancelText: "取消"
                        });
                    }
                });
            } else {
                if (e) {
                    this.getUserInfoByBtn(e);
                } else {
                    this.$refs.user_modal.show({
                        content: "为了更好的用户体验，需要获取您的个人信息",
                        cancelText: "取消"
                    });
                }
            }
        },
        getPhoneByBtn(e) {
            const self = this;
            const {
                errMsg,
                rawData,
                encryptedData,
                iv,
                signature,
                userInfo
            } = e.detail;
            this.$refs.phone_modal.hide();
            if (errMsg === "getUserInfo:ok") {
                this.$request
                    .bindMobile({
                        session3rd: self.session3rd,
                        rawData,
                        encryptedData,
                        signature,
                        iv
                    })
                    .then(res => {
                        console.log(res);
                    });
            }
        },
        getPhone(e) {
            const self = this;
            if (e) {
                this.getPhoneByBtn(e);
            } else {
                this.$refs.phone_modal.show({
                    content: "为了更好的用户体验，需要获取您的手机号码",
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
