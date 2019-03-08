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
    computed: {
        ...mapState(['hasRigister'])
    },
    data() {
        return {};
    },
    methods: {
        ...mapMutations(["setUserInfo"]),
        signUp() {
            this.$request.signUp().then(res => {
                console.log(res);
            }).catch(e => {
                console.log(e);
            })
        },
        getUserInfoByBtn(e) {
            console.log(JSON.stringify(e.detail));
            const { errMsg, encryptedData, iv, signature, userInfo } = e.detail;
            this.$refs.user_modal.hide();
            if (errMsg === "getUserInfo:ok") {
                this.setUserInfo(userInfo);
            }
        },
        getUserInfo(e) {
            const self = this;
            if (e) {
                this.getUserInfoByBtn(e);
            } else {
                this.$refs.user_modal.show({
                    content: "为了更好的用户体验，需要获取您的个人信息",
                    cancelText: "取消",
                    success() {
                        self.getPhone();
                    }
                });
            }
        },
        getPhoneByBtn(e) {
            console.log(JSON.stringify(e.detail));
            // const { errMsg, encryptedData, iv, signature, userInfo } = e.detail;
            // this.$refs.user_modal.hide();
            // if (errMsg === "getUserInfo:ok") {
            //     this.setUserInfo(userInfo);
            // }
        },
        getPhone(e) {
            const self = this;
            if (e) {
                this.getPhoneByBtn(e);
            } else {
                this.$refs.phone_modal.show({
                    content: "为了更好的用户体验，需要获取您的手机号码",
                    cancelText: "取消",
                    success() {
                        self.signUp()
                    },
                    fail() {
                        self.signUp()
                    }
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
