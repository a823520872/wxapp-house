<template>
    <view>
        <v-modal class="modal" ref="user_modal">
            <block slot="footer">
                <button class="m_button" open-type="getUserInfo" lang="zh_CN" @getuserinfo="getUserInfoByBtn">登录</button>
            </block>
        </v-modal>
        <v-modal class="modal" ref="phone_modal">
            <block slot="footer">
                <button class="m_button" open-type="getPhoneNumber" @getphonenumber="getPhoneByBtn">授权</button>
            </block>
        </v-modal>
        <v-modal class="modal" ref="modal_local">
            <block slot="footer">
                <button class="m_button" plain open-type="openSetting" @opensetting="getLocalOptSet">去设置</button>
            </block>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import amapFile from '../common/amap-wx.js'
const Defer = require('../common/defer.js')

var myAmapFun = new amapFile.AMapWX({
    key: '9243ebd0fc3e66ed2ba643128aa8fb1f'
})
export default {
    props: {},
    computed: {
        ...mapState(['code', 'userInfo'])
    },
    data() {
        return {
            defer: null,
            localType: '',
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        ...mapActions(['login', 'getToken', 'getInfo']),
        getUserInfoByBtn(e) {
            this.$refs.user_modal.hide()
            const self = this
            const { errMsg, rawData, encryptedData, iv, signature, userInfo } = e.detail
            if (errMsg === 'getUserInfo:ok') {
                uni.removeStorageSync('auth')
                this.getToken({
                    code: self.code,
                    rawData,
                    encryptedData,
                    signature,
                    iv
                }).then(res => {
                    let { userinfo } = res.data
                    userinfo &&
                        uni.showToast({
                            title: '登录成功',
                            icon: 'none'
                        })
                    this.$refs.user_modal.hide()
                    this.defer.resolve()
                })
            } else {
                this.$refs.user_modal.hide()
                this.defer.reject(errMsg)
            }
        },
        getUserInfo(e) {
            this.defer = new Defer()
            this.login(true).then(code => {
                if (e) {
                    this.getUserInfoByBtn(e)
                } else {
                    !this.userInfo &&
                        this.$refs.user_modal.show({
                            content: '发布信息，获取房东联系方式请先登录',
                            cancelText: '取消'
                        })
                }
            })
            return this.defer
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
            this.defer = new Defer()
            uni.getLocation({
                type: 'gcj02',
                success: (res) => {
                    this.defer.resolve({
                        longitude: +res.longitude.toFixed(6),
                        latitude: +res.latitude.toFixed(6),
                    })
                },
                fail: e => {
                    if (e.errMsg == 'getLocation:fail 1') {
                        uni.showToast({
                            title: '请在“设置”里允许“微信”使用地理位置',
                            icon: 'none'
                        })
                        this.defer.reject(e)
                        return
                    }
                    this.localType = 1
                    this.$refs.modal_local
                        .show({
                            content: '为了更好的用户体验，需要获取您的定位信息',
                            cancelText: '取消'
                        })
                        .fail(flag => {
                            if (flag) {
                                this.defer.reject()
                            }
                        })
                }
            })
            return this.defer
        },
        chooseLocation(obj) {
            this.defer = new Defer()
            uni.chooseLocation({
                success: (res) => {
                    const { errMsg, name, address, latitude, longitude } = res
                    console.log(res);
                    if (errMsg === 'chooseLocation:ok') {
                        this.transformAddr(+res.longitude.toFixed(6), +res.latitude.toFixed(6)).then(data => {
                            this.defer.resolve(data)
                        }, () => {
                            this.defer.resolve({
                                longitude: +res.longitude.toFixed(6),
                                latitude: +res.latitude.toFixed(6),
                                address,
                            })
                        })
                    } else {
                        this.defer.reject()
                    }
                },
                fail: e => {
                    if (e.errMsg.indexOf('cancel') === -1) {
                        this.localType = 2
                        this.$refs.modal_local
                            .show({
                                content:
                                    '为了更好的用户体验，需要获取您的定位信息',
                                cancelText: '取消'
                            })
                            .fail(flag => {
                                if (flag) {
                                    this.defer.reject()
                                }
                            })
                    }
                }
            })
            return this.defer
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
                        } else {
                            reject()
                        }
                    },
                    fail(e) {
                        reject(e)
                    }
                })
            })
        },
        savePhoto(url) {
            uni.getSetting({
                success: () => {
                    if (!res.authSetting['scope.writePhotosAlbum']) {
                        uni.authorize({
                            scope: 'scope.writePhotosAlbum',
                            success: () => {
                                this.savePhoto_ING(url);
                            },
                            fail: () => {
                                this.localType = 3;
                                this.$refs.modal_local.show({
                                    content: '不允许获取相册权限，将无法保存图片到手机相册，是否打开相册权限？',
                                    cancelText: '取消'
                                }).fail(() => {
                                    this.defer.reject()
                                })
                            }
                        });
                    } else {
                        this.savePhoto_ING(url);
                    }
                },
                fail: () => {
                    this.localType = 3;
                    this.$refs.modal_local.show({
                        content: '不允许获取相册权限，将无法保存图片到手机相册，是否打开相册权限？',
                        cancelText: '取消',
                    }).fail(() => {
                        this.defer.reject()
                    })
                }
            });
        },
        savePhoto_ING(url) {
            uni.saveImageToPhotosAlbum({
                filePath: uri,
                success: res => {
                    this.defer.resolve()
                },
                fail: e => {
                    this.defer.reject(e)
                },
            })
        },
        getLocalOptSet(e) {
            this.$refs.modal_local.hide()
            switch (this.localType) {
                case 1:
                    if (e.detail.authSetting['scope.userLocation']) {
                        uni.getLocation({
                            type: 'gcj02',
                            success: res => {
                                this.defer.resolve({
                                    longitude: +res.longitude.toFixed(6),
                                    latitude: +res.latitude.toFixed(6),
                                })
                            },
                            fail: () => {
                                this.defer.reject()
                            }
                        })
                    } else {
                        this.defer.reject()
                    }
                    break
                case 2:
                    if (e.detail.authSetting['scope.userLocation']) {
                        uni.chooseLocation({
                            success: res => {
                                this.transformAddr(+res.longitude.toFixed(6), +res.latitude.toFixed(6)).then(data => {
                                    this.defer.resolve(data)
                                }, () => {
                                    this.defer.resolve({
                                        longitude: +res.longitude.toFixed(6), 
                                        latitude: +res.latitude.toFixed(6),
                                        address: res.address,
                                    })
                                })
                            },
                            fail: () => {
                                this.defer.reject()
                            }
                        })
                    } else {
                        this.defer.reject()
                    }
                    break
                case 3:
                    if (e.detail.authSetting['scope.writePhotosAlbum']) {
                        this.savePhoto_ING()
                    } else {
                        this.defer.reject()
                    }
                    break
                case 4:
                    if (e.detail.authSetting['scope.address']) {
                        uni.chooseAddress({
                            success: res => {
                                if (res.errMsg === 'chooseAddress:ok') {
                                    this.defer.resolve({
                                        name: res.userName,
                                        phone: res.telNumber,
                                        province: res.provinceName,
                                        city: res.cityName,
                                        county: res.countyName,
                                        detail: res.detailInfo,
                                    })
                                } else {
                                    this.defer.reject()
                                }
                            },
                            fail: e => {
                                this.defer.reject()
                            }
                        });
                    }
                case 5:
                    if (e.detail.authSetting['scope.writePhotosAlbum']) {
                        this.saveVideo_ING()
                    } else {
                        this.defer.reject()
                    }
                    break
                default:
                    this.defer.reject()
                    break
            }
        },
    }
}
</script>

<style lang="scss" scoped>
.modal {
    .m_button {
        display: block;
        width: 100%;
        font-size: 36rpx;
        line-height: 96rpx;
        font-size: 36rpx;
        padding: 0;
        color: $main-color;
    }
}
</style>
