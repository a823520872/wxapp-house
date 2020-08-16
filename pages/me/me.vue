<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view v-if="userInfo" class="avatar">
                <image class="img_avatar" :src="userInfo.avatar" mode="aspectFit"></image>
                <view class="avatar_auth" v-if="userInfo.is_auth && userInfo.is_auth === 2">
                    <auth-img></auth-img>
                </view>
            </view>
            <button v-else class="avatar" plain open-type="getUserInfo" @getuserinfo="getUserInfo"></button>
            <view class="main">
                <view class="box"> </view>
                <view class="content">
                    <view>
                        <view v-if="userInfo" class="name m_flex m_flex_column m_textover">
                            <view>{{ userInfo.nickname }}</view>
                            <view v-if="userInfo.is_landlord === 1">
                                <view v-if="service" class="service">{{ serviceEnd }}到期</view>
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
                                <image src="/static/image/me/my_collection.png" mode="aspectFit"></image>
                            </view>
                            <view>我的收藏</view>
                        </view>
                        <!-- <view class="tab" @tap="handleClick">
                            <view class="icon">
                                <image src="/static/image/me/person.png" mode="aspectFit"></image>
                            </view>
                            <view>{{ userInfo && userInfo.is_landlord === 1 ? (service ? '服务中' : '继续合作') : '申请入驻' }}</view>
                        </view> -->
                        <view class="tab" v-if="userInfo && userInfo.is_landlord === 1 && service" @tap="to('/pages/me/publish')">
                            <view class="icon">
                                <image src="/static/image/me/my_publish.png" mode="aspectFit"></image>
                            </view>
                            <view>我的发布</view>
                        </view>
                        <view class="tab" v-else @tap="handleClick">
                            <view class="icon">
                                <image src="/static/image/me/my_publish.png" mode="aspectFit"></image>
                            </view>
                            <view>申请入驻</view>
                        </view>
                    </view>
                </view>
            </view>
        </view>
        <view class="split"></view>
        <view class="bd">
            <!-- <view v-if="userInfo && userInfo.is_landlord === 1" class="cell m_flex_justify m_flex_middle" @tap="to('/pages/me/publish')">
                <view class="cell_hd">我的发布</view>
                <view class="cell_fd right_icon"></view>
            </view> -->
            <!-- <view class="cell m_flex_justify m_flex_middle" @tap="to('/pages/me/invitation')">
                <view class="cell_hd">推荐好友</view>
                <view class="cell_fd">获得88元分享基金</view>
            </view> -->
            <view class="cell m_flex_justify m_flex_middle" v-if="userInfo && userInfo.is_landlord === 1" @tap="to('/pages/me/code')">
                <view class="cell_hd">二维码名片</view>
                <view class="cell_fd">扫码可看我的所有房源</view>
            </view>
            <button class="m_button plain long" open-type="share">
                <view class="cell m_flex_justify m_flex_middle">
                    <view class="cell_hd">推荐好友</view>
                    <view class="cell_fd">{{ userInfo && userInfo.is_landlord === 1 ? '好友入驻成功，即享1月免费服务' : '' }}</view>
                </view>
            </button>
            <button class="m_button plain long" open-type="contact">
                <view class="cell m_flex_justify m_flex_middle">
                    <view class="cell_hd">联系客服</view>
                    <view class="cell_fd">意见反馈、入驻咨询</view>
                </view>
            </button>
            <!-- <view v-if="!userInfo || (userInfo && userInfo.is_landlord !== 1)" class="cell m_flex_justify m_flex_middle" @tap="goPage(`/pages/index/webview?src=${config.gss}`)">
                <view class="cell_hd">搬家服务</view>
                <view class="cell_fd">查看搬家报价</view>
            </view> -->
            <!-- <view v-if="!userInfo" class="cell m_flex_justify m_flex_middle" @tap="showLogin">
                <view class="cell_hd">授权登录</view>
                <view class="cell_fd">登录后才能发布房源</view>
            </view> -->
            <view class="cell m_flex_justify m_flex_middle" @tap="init(true)">
                <view class="cell_hd">更新状态</view>
            </view>
        </view>
        <v-auth ref="auth"></v-auth>
        <v-modal ref="modal">
            <view slot="content">
                <link-modal :temp="CONFIG"></link-modal>
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
                            <view v-else class="m_button btn_code">{{ time + 's后可再次获取' }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import authImg from '../components/auth-img'
import linkModal from '../components/link-modal'
import Defer from '../../common/defer.js'
export default {
    computed: {
        ...mapState(['userInfo', 'auth']),
        serviceEnd() {
            if (this.service) {
                let [serviceEnd] = this.service.split(' ')
                return serviceEnd
            }
            return this.service
        },
    },
    components: {
        authImg,
        linkModal,
    },
    data() {
        return {
            service: false,
            form: {
                mobile: '',
                captcha: '',
            },
            time: -1,
            defer: new Defer(),
        }
    },
    onPullDownRefresh() {
        this.init(true)
    },
    onShow() {
        this.defer.done(() => {
            this.init()
        })
    },
    onReady() {
        this.defer.resolve()
    },
    onShareAppMessage() {
        return {
            title: '邀请入驻',
            path:
                `/pages/index/index?p=` +
                encodeURIComponent(
                    this.userInfo ? (this.userInfo.is_landlord === 1 ? `/pages/publish/index?uid=${this.userInfo.id}` : `/pages/index/index?uid=${this.userInfo.id}`) : `/pages/index/index`
                ),
        }
    },
    methods: {
        ...mapMutations(['setUserInfo']),
        ...mapActions(['login', 'getInfo', 'checkAuth']),
        init(flag) {
            // this.service = false
            // #ifdef MP-WEIXIN
            this.login(flag)
                .then(
                    code => {
                        return this.getInfo(flag)
                    }
                )
                .then(userInfo => {
                    uni.stopPullDownRefresh()
                    if (this.userInfo && this.userInfo.is_landlord === 1) {
                        this.checkAuth(flag).then(res => {
                            this.service = res
                        }, () => {
                            this.service = false
                        })
                    }
                })
                .catch((e) => {
                    uni.stopPullDownRefresh()
                    console.log(e);
                    if (flag && (e.msg === '未登录' || e.msg === '当前用户校验失败')) {
                        this.getUserInfo()
                    }
                })
            // #endif
            // #ifdef H5
            this.getInfo(flag).then(userInfo => {
                uni.stopPullDownRefresh()
                if (this.userInfo && this.userInfo.is_landlord === 1) {
                    this.checkAuth(flag).then(res => {
                        this.service = res
                    }, () => {
                        this.service = false
                    })
                }
            })
            // #endif
        },
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e).done(() => {
                this.init(true)
            })
        },
        linkAdmin() {
            this.userInfo
                ? this.$refs.modal.show({
                      title: '联系方式',
                      confirmText: '确定',
                      success() {},
                  })
                : this.getUserInfo()
        },
        handleClick() {
            if (this.service && this.userInfo && this.userInfo.is_landlord === 1) return
            this.to('/pages/publish/index')
        },
        to(url) {
            this.userInfo
                ? url === '/pages/me/publish'
                    ? this.service
                        ? this.goPage(url)
                        : uni.showToast({
                              title: '服务已结束',
                              icon: 'none',
                          })
                    : this.goPage(url)
                : this.getUserInfo()
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
                                { type: 'mobile', msg: '手机号码不正确' },
                            ],
                            captcha: [{ required: true, msg: '请输入验证码' }],
                        }).then(
                            () => {
                                this.$request.mobileLogin(this.form).then(
                                    res => {
                                        if (res.data && res.data.userinfo) {
                                            uni.setStorageSync('tk', res.data.userinfo.token)
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
                },
            })
        },
        getCode() {
            this.$validate(this.form, {
                mobile: [
                    { required: true, msg: '请输入手机号码' },
                    { type: 'mobile', msg: '手机号码不正确' },
                ],
            }).then(
                () => {
                    this.countDown()
                    this.$request
                        .sendLoginSms({
                            mobile: this.form.mobile,
                            event: 'mobilelogin',
                        })
                        .then(
                            res => {
                                uni.showToast({
                                    title: '获取成功',
                                    icon: 'success',
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
                        icon: 'none',
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
        },
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
    },
}
</script>

<style lang="scss" scoped>
.hd {
    background-color: $main-color;
    font-size: 28rpx;
    color: $uni-text-color-inverse;
    overflow: hidden;

    // .avatar {
    //     position: relative;
    //     width: 131rpx;
    //     height: 131rpx;
    //     margin: 87rpx auto 35rpx;
    //     border-radius: 50%;
    //     background-color: $uni-bg-color;
    //     overflow: hidden;
    //     border: 2rpx solid #fff;
    // }
    .avatar {
        position: relative;
        width: 126rpx;
        height: 126rpx;
        margin: 60rpx auto 30rpx;
        border: none;
        border-radius: 50%;
        border: 2rpx solid #fff;
    }
    .img_avatar {
        position: relative;
        width: 126rpx;
        height: 126rpx;
        border-radius: 50%;
        // background-color: $uni-bg-color;
        overflow: hidden;
    }
    .avatar_auth {
        position: absolute;
        bottom: 0;
        left: 50%;
        margin-bottom: -18rpx;
        transform: translateX(-50%);
    }

    .main {
        position: relative;
        width: 750rpx;
        // height: 250rpx;
        overflow: hidden;
    }
    .box {
        position: absolute;
        top: 0;
        left: 50%;
        width: 750rpx;
        height: 330rpx;
        padding: 0 202rpx;
        border-radius: 50%;
        background-color: #fff;
        transform: translate3d(-50%, 0, 0);
    }
    .content {
        position: relative;
        z-index: 1;
    }

    .name {
        // height: 95rpx;
        padding-top: 30rpx;
        line-height: 42rpx;
        text-align: center;
        font-weight: bold;
        font-size: 34rpx;
        color: #333;
    }

    .service {
        margin-top: 10rpx;
        line-height: 36rpx;
        font-weight: normal;
        font-size: 28rpx;
        color: #666;
    }

    .m_button {
        width: 100%;
        height: 95rpx;
        line-height: 95rpx;
        padding: 0 30rpx;
        border: none;
        font-size: 34rpx;
        color: $text-color;
    }
    .tabs {
        // padding: 10rpx 30rpx;
        justify-content: space-around;
        line-height: 38rpx;
        text-align: center;
        color: $text-color;
    }
    .tab {
        width: 36%;
        padding: 30rpx;
    }
    .icon {
        width: 48rpx;
        height: 48rpx;
        margin: 0 auto 10rpx;
    }
}
.split {
    width: 100%;
    height: 18rpx;
    background-color: #eee;
}
.bd {
    .cell {
        height: 108rpx;
        padding: 0 30rpx;
        line-height: 108rpx;
        font-size: 33rpx;
        border-bottom: 1rpx solid $border-color;
        color: $text-color;

        &_fd {
            font-size: 25rpx;
            color: $text-color-inverse;
        }
    }
    .m_button {
        padding: 0;
    }
}
.cells {
    padding: 0 1.6em 0.8em;
    font-size: 30rpx;
    color: $text-color;
    .cell {
        padding: 10rpx 0;
    }
    .label {
        padding-right: 10rpx;
    }
    input {
        width: 100%;
        height: 60rpx;
        line-height: 60rpx;
        text-align: left;
    }
    .btn_code {
        margin-left: 10rpx;
    }
}
</style>
