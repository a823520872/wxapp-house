<template>
    <view>
        <v-modal ref="user_modal">
            <block slot="footer">
                <button class="m_button"
                        open-type="getUserInfo"
                        lang="zh_CN"
                        @getuserinfo="getUserInfoByBtn">授权</button>
            </block>
        </v-modal>
        <v-modal ref="phone_modal">
            <block slot="footer">
                <button class="m_button"
                        open-type="getPhoneNumber"
                        @getphonenumber="getPhoneByBtn">授权</button>
            </block>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import amapFile from '../common/amap-wx.js'

var myAmapFun = new amapFile.AMapWX({
    key: '9243ebd0fc3e66ed2ba643128aa8fb1f'
})
export default {
    props: {},
    // data() {
    //     return {
    //         session3rd: ""
    //     };
    // },
    computed: {
        ...mapState(['code', 'userInfo'])
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        ...mapActions(['login', 'signUp', 'getInfo']),
        getUserInfoByBtn(e) {
            this.$refs.user_modal.hide()
            const self = this
            const {
                errMsg,
                rawData,
                encryptedData,
                iv,
                signature,
                userInfo
            } = e.detail
            if (errMsg === 'getUserInfo:ok') {
                uni.removeStorageSync('auth')
                this.signUp({
                    code: self.code,
                    rawData,
                    encryptedData,
                    signature,
                    iv
                }).then(() => {
                    this.$refs.user_modal.hide()
                })
                // .then(res => {
                //     if (res && res.data) {
                //         this.session3rd = res.data.session3rd;
                //         this.getPhone();
                //     }
                // });
            }
        },
        getUserInfo(e) {
            this.login(true).then(code => {
                if (e) {
                    this.getUserInfoByBtn(e)
                } else {
                    !this.userInfo &&
                        this.$refs.user_modal.show({
                            content:
                                '为了让您有更好的用户体验，请您授权微信头像等基本信息',
                            cancelText: '取消'
                        })
                }
            })
        },
        getPhoneByBtn(e) {
            const self = this
            const { errMsg, encryptedData, iv } = e.detail
            this.$refs.phone_modal.hide()
            if (errMsg === 'getPhoneNumber:ok') {
                const data = {
                    encryptedData,
                    iv
                }
                if (this.code) {
                    data.code = this.code
                }
                this.$request.bindMobile(data).then(res => {
                    this.getInfo(true)
                })
            }
        },
        getPhone(e) {
            this.$store.commit('setCode', '')
            this.login().then(code => {
                if (e) {
                    this.getPhoneByBtn(e)
                } else {
                    this.$refs.phone_modal.show({
                        content: '为了更好的用户体验，需要获取您的手机号码',
                        cancelText: '取消'
                    })
                }
            })
        },
        getLocation(e) {
            const self = this
            return new Promise((resolve, reject) => {
                uni.getLocation({
                    type: 'gcj02',
                    success(res) {
                        self.transformAddr(res.longitude, res.latitude).then(
                            r => {
                                resolve(r)
                            },
                            e => {
                                reject(e)
                            }
                        )
                    },
                    fail: reject
                })
            })
        },
        chooseLocation(obj) {
            const self = this
            return new Promise((resolve, reject) => {
                uni.chooseLocation({
                    success(res) {
                        const {
                            errMsg,
                            name,
                            address,
                            latitude,
                            longitude
                        } = res
                        if (errMsg === 'chooseLocation:ok') {
                            self.transformAddr(
                                res.longitude,
                                res.latitude
                            ).then(
                                r => {
                                    resolve(r)
                                },
                                e => {
                                    reject(e)
                                }
                            )
                        }
                    },
                    fail: reject
                })
            })
        },
        transformAddr(longitude, latitude) {
            return new Promise((resolve, reject) => {
                myAmapFun.getPoiAround({
                    location: longitude + ',' + latitude,
                    success: function(data) {
                        if (data && data.poisData && data.poisData[0]) {
                            resolve({
                                longitude: longitude,
                                latitude: latitude,
                                // landmark: name,
                                province: data.poisData[0].pname,
                                city: data.poisData[0].cityname,
                                county: data.poisData[0].adname,
                                address: data.poisData[0].address
                            })
                        }
                    },
                    fail(e) {
                        reject(e)
                    }
                })
            })
        }
    }
}
</script>

<style lang="scss" scoped>
.m_button {
    width: 100%;
    font-size: 36upx;
    line-height: 96upx;
    font-size: 36upx;
    padding: 0;
    color: $main-color;
}
</style>
