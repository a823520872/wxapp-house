<template>
    <view>
        <v-modal ref="user_modal">
            <block slot="footer">
                <button class="m_button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoByBtn">
                    去授权
                </button>
            </block>
        </v-modal>
        <v-modal ref="phone_modal">
            <block slot="footer">
                <button class="m_button" open-type="getPhoneNumber" @getphonenumber="getPhoneByBtn">
                    去授权
                </button>
            </block>
        </v-modal>
        <!-- <v-modal ref="phone_modal">
            <block slot="footer">
                <button class="m_button" open-type="getPhoneNumber" @getphonenumber="getPhoneByBtn">
                    去授权
                </button>
            </block>
        </v-modal> -->
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import amapFile from "../common/amap-wx.js";

var myAmapFun = new amapFile.AMapWX({
    key: "9243ebd0fc3e66ed2ba643128aa8fb1f"
});
export default {
    props: {},
    data() {
        return {
            session3rd: ""
        };
    },
    computed: {
        ...mapState(["code"])
    },
    methods: {
        ...mapMutations(["setUserInfo"]),
        ...mapActions(["login", "getToken"]),
        signUp(data) {
            this.getToken(data).then(res => {
                if (res && res.data) {
                    this.session3rd = res.data.session3rd;
                    // this.getPhone();
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
            this.login().then(code => {
                if (e) {
                    this.getUserInfoByBtn(e);
                } else {
                    this.$refs.user_modal.show({
                        content: "为了更好的用户体验，需要获取您的个人信息",
                        cancelText: "取消"
                    });
                }
            });
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
            this.login().then(code => {
                if (e) {
                    this.getPhoneByBtn(e);
                } else {
                    this.$refs.phone_modal.show({
                        content: "为了更好的用户体验，需要获取您的手机号码",
                        cancelText: "取消"
                    });
                }
            });
        },
        chooseLocation(obj) {
            uni.chooseLocation({
                success(res) {
                    const { errMsg, name, address, latitude, longitude } = res;
                    if (errMsg === "chooseLocation:ok") {
                        myAmapFun.getPoiAround({
                            location: longitude + "," + latitude,
                            success: function(data) {
                                if (data && data.poisData && data.poisData[0]) {
                                    obj.success &&
                                        obj.success({
                                            longitude: longitude,
                                            latitude: latitude,
                                            landmark: name,
                                            province: data.poisData[0].pname,
                                            city: data.poisData[0].cityname,
                                            county: data.poisData[0].adname,
                                            address: data.poisData[0].address
                                        });
                                }
                            },
                            fail(e) {
                                obj.fail && obj.fail(e);
                            }
                        });
                    }
                },
                fail(e) {
                    console.log(e);
                    obj.fail && obj.fail(e);
                }
            });
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
