<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view v-if="userInfo" class="avatar">
                <image :src="userInfo.avatar" mode="aspectFit"></image>
            </view>
            <button v-else class="avatar" plain open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
            <view class="main">
                <view class="box">
                    <view>
                        <view v-if="userInfo" class="name m_flex m_flex_column m_textover">
                            <view>{{ userInfo.nickname }}</view>
                            <view v-if="userInfo.is_landlord === 1">
                                <view v-if="service" class="service">{{service}} 服务结束</view>
                                <view v-else>服务结束</view>
                            </view>
                        </view>
                        <button v-else class="m_button" type="primary" plain open-type="getUserInfo" @getuserinfo="getUserInfo">
                            点击登录
                        </button>
                    </view>
                    <view class="tabs m_flex">
                        <view class="tab" @tap="to('/pages/me/collection')">
                            <view class="icon">
                                <image src="/static/image/me/collection.png" mode="aspectFit"></image>
                            </view>
                            <view>我的收藏</view>
                        </view>
                        <view class="tab" @tap="handleClick">
                            <view class="icon">
                                <image src="/static/image/me/person.png" mode="aspectFit"></image>
                            </view>
                            <view>{{userInfo && userInfo.is_landlord === 1 ? (service ? '服务中' : '继续合作') : '申请入驻' }}</view>
                        </view>
                        <!-- <view class="tab">
                            <view class="icon">
                                <image src="/static/image/me/praise.png" mode="aspectFit"></image>
                            </view>
                            <view>我赞过的</view>
                        </view> -->
                    </view>
                </view>
            </view>
        </view>
        <view class="split"></view>
        <view class="bd">
            <view v-if="userInfo && userInfo.is_landlord === 1" class="cell m_flex_justify m_flex_middle" @tap="to('/pages/me/publish')">
                <view class="cell_hd">我的发布</view>
                <view class="cell_fd right_icon"></view>
            </view>
            <!-- <view class="cell m_flex_justify m_flex_middle" @tap="to('/pages/me/invitation')">
                <view class="cell_hd">推荐好友</view>
                <view class="cell_fd">获得88元分享基金</view>
            </view> -->
            <button class="m_button plain long" open-type="share">
                <view class="cell m_flex_justify m_flex_middle">
                    <view class="cell_hd">推荐好友</view>
                    <view class="cell_fd">{{userInfo && userInfo.is_landlord === 1 ? '邀请入驻2人同享1月免费服务' : ''}}</view>
                </view>
            </button>
            <button class="m_button plain long" open-type="contact">
                <view class="cell m_flex_justify m_flex_middle">
                    <view class="cell_hd">联系客服</view>
                    <view class="cell_fd">智能找房、意见反馈、入驻咨询</view>
                </view>
            </button>
            <view v-if="!userInfo || (userInfo && userInfo.is_landlord !== 1)" class="cell m_flex_justify m_flex_middle" @tap="goPage(`/pages/index/webview?src=${config.gss}`)">
                <view class="cell_hd">搬家服务</view>
                <view class="cell_fd">查看搬家报价</view>
            </view>
            <!-- <view v-if="!userInfo"
                  class="cell m_flex_justify m_flex_middle"
                  @tap="showLogin">
                <view class="cell_hd">授权登录</view>
                <view class="cell_fd">登录后才能发布房源</view>
            </view> -->
            <!-- <view class="cell m_flex_justify m_flex_middle" @tap="clear">
                <view class="cell_hd">清楚授权</view>
            </view> -->
        </view>
        <v-auth ref="auth"></v-auth>
        <v-modal ref="modal">
            <view slot="content">
                <link-modal :temp="temp"></link-modal>
            </view>
        </v-modal>
        <v-modal ref="loginModal">
            <view slot="content">
                <view class="cells">
                    <view class="cell m_flex_middle">
                        <view class="label">手机号</view>
                        <view class="model m_flex_middle m_flex_item"><input type="number" v-model="form.mobile" placeholder="请输入您的手机号" /></view>
                    </view>
                    <view class="cell m_flex_middle">
                        <!-- <view class="label">验证码</view> -->
                        <view class="model m_flex_middle m_flex_item">
                            <input class="m_flex_item" type="number" v-model="form.captcha" placeholder="请输入短信验证码" />
                            <view v-if="time === -1" class="m_button main btn_code plain" @tap="getCode">获取验证码</view>
                            <view v-else class="m_button btn_code">{{time + 's后可再次获取'}}</view>
                        </view>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import linkModal from '../components/link-modal'
export default {
    computed: {
        ...mapState(['userInfo'])
    },
    components: {
        linkModal
    },
    data() {
        return {
            service: false,
            form: {
                mobile: '',
                captcha: ''
            },
            time: -1
        }
    },
    onShow() {
        this.init()
    },
    onShareAppMessage() {
        return {
            title: '邀请入驻',
            path:
                `/pages/index/index?p=` +
                encodeURIComponent(
                    this.userInfo
                        ? this.userInfo.is_landlord === 1
                            ? `/pages/publish/index?uid=${this.userInfo.id}`
                            : `/pages/index/index?uid=${this.userInfo.id}`
                        : `/pages/index/index`
                )
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        ...mapActions(['login', 'getInfo', 'checkAuth']),
        init() {
            this.service = false
            this.login()
                .then(
                    code => {
                        return this.getInfo()
                    },
                    e => {
                        console.log(e)
                    }
                )
                .then(userInfo => {
                    if (this.userInfo && this.userInfo.is_landlord === 1) {
                        this.checkAuth().then(res => {
                            this.service = res
                        })
                    }
                })
        },
        getUserInfo(e) {
            return this.$refs.auth.getUserInfo(e)
        },
        linkAdmin() {
            this.userInfo
                ? this.$refs.modal.show({
                      title: '联系方式',
                      confirmText: '确定',
                      success() {}
                  })
                : this.getUserInfo().done(() => {
                      this.init()
                  })
        },
        handleClick() {
            if (
                this.service &&
                this.userInfo &&
                this.userInfo.is_landlord === 1
            )
                return
            this.to('/pages/publish/index')
        },
        to(url) {
            this.userInfo
                ? url === '/pages/me/publish'
                    ? this.service
                        ? this.goPage(url)
                        : uni.showToast({
                              title: '服务已结束',
                              icon: 'none'
                          })
                    : this.goPage(url)
                : this.getUserInfo().done(() => {
                      this.init()
                  })
        },
        showLogin() {
            this.$refs.loginModal.show({
                title: '手机号登录',
                cancelText: '取消',
                confirmText: '确定',
                success: () => {
                    return new Promise((resolve, reject) => {
                        this.$validate(this.form, {
                            mobile: [
                                { required: true, msg: '请输入手机号码' },
                                { type: 'mobile', msg: '手机号码不正确' }
                            ],
                            captcha: [{ required: true, msg: '请输入验证码' }]
                        }).then(
                            () => {
                                this.$request.mobileLogin(this.form).then(
                                    res => {
                                        console.log(res)
                                        if (res.data && res.data.userinfo) {
                                            uni.setStorageSync(
                                                'tk',
                                                res.data.userinfo.token
                                            )
                                            this.setUserInfo(res.data.userinfo)
                                            resolve()
                                        } else {
                                            reject()
                                        }
                                    },
                                    e => {
                                        reject(e)
                                    }
                                )
                            },
                            e => {
                                reject(e)
                            }
                        )
                    })
                }
            })
        },
        getCode() {
            this.$validate(this.form, {
                mobile: [
                    { required: true, msg: '请输入手机号码' },
                    { type: 'mobile', msg: '手机号码不正确' }
                ]
            }).then(
                () => {
                    this.countDown()
                    this.$request
                        .sendLoginSms({
                            mobile: this.form.mobile,
                            event: 'mobilelogin'
                        })
                        .then(
                            res => {
                                uni.showToast({
                                    title: '获取成功',
                                    icon: 'success'
                                })
                            },
                            e => {
                                this.time = -1
                            }
                        )
                },
                e => {
                    uni.showToast({
                        title: e.msg,
                        icon: 'none'
                    })
                }
            )
        },
        countDown() {
            const self = this
            this.time = 61
            function cd() {
                if (self.time < 0) {
                    return
                }
                if (self.time-- >= 0) {
                    setTimeout(cd, 1000)
                }
            }
            cd()
        }
        // clear() {
        //     try {
        //         uni.clearStorageSync();
        //         uni.reLaunch({
        //             url: "/pages/me/me"
        //         });
        //     } catch (e) {
        //         uni.showToast({
        //             title: "清楚授权失败",
        //             icon: "none"
        //         });
        //     }
        // }
    }
}
</script>

<style lang="scss" scoped>
.hd {
    background-color: $main-color;
    font-size: 28upx;
    color: $uni-text-color-inverse;
    overflow: hidden;

    .avatar {
        position: relative;
        width: 131upx;
        height: 131upx;
        margin: 87upx auto 35upx;
        border-radius: 50%;
        background-color: $uni-bg-color;
        overflow: hidden;
        border: 2upx solid #fff;
    }

    .main {
        position: relative;
        width: 750upx;
        height: 250upx;
        overflow: hidden;
    }
    .box {
        position: absolute;
        top: 0;
        left: 50%;
        width: 750upx;
        height: 330upx;
        padding: 0 202upx;
        border-radius: 50%;
        background-color: #fff;
        transform: translate3d(-50%, 0, 0);
    }

    .name {
        height: 95upx;
        padding-top: 10upx;
        // line-height: 48upx;
        text-align: center;
        color: $text-color;
    }

    .service {
        margin-top: 10upx;
        font-size: 24upx;
    }

    .m_button {
        width: 100%;
        height: 95upx;
        line-height: 95upx;
        padding: 0 30upx;
        border: none;
        font-size: 34upx;
        color: $text-color;
    }
    .tabs {
        padding: 10upx 30upx;
        justify-content: space-around;
        line-height: 49upx;
        text-align: center;
        color: $text-color;
    }
    .tab {
        width: 36%;
        padding: 20upx 30upx 15upx;
    }
    .icon {
        width: 40upx;
        height: 40upx;
        margin: 0 auto;
    }
}
.split {
    width: 100%;
    height: 18upx;
    background-color: #eee;
}
.bd {
    .cell {
        height: 108upx;
        padding: 0 30upx;
        line-height: 108upx;
        font-size: 33upx;
        border-bottom: 1upx solid $border-color;
        color: $text-color;

        &_fd {
            font-size: 25upx;
            color: $text-color-inverse;
        }
    }
    .m_button {
        padding: 0;
    }
}
.cells {
    color: $text-color;
    .cell {
        padding: 10upx 0;
    }
    .label {
        padding-right: 10upx;
    }
    input {
        width: 100%;
        height: 60upx;
        line-height: 60upx;
        text-align: left;
    }
    .btn_code {
        margin-left: 10upx;
    }
}
</style>
