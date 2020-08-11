<template>
    <view class="content content_bg_ff">
        <view class="is_landlord" v-if="step === 1">
            <view class="hd">
                <view class="title">发帖真实性承诺</view>
                <view class="con">为维护真房源环境，请据实发帖</view>
                <view class="con">如发现虚假，平台将删帖。</view>
            </view>
            <view class="bd">
                <view class="cells">
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/shangchuan.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>上传实拍图片</view>
                            <view>上传与房源相关的真实图片</view>
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/info.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>房源如实描述</view>
                            <view>房源真实在租，位置及厅室等信息真实有效</view>
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/rent.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>房租标价合理</view>
                            <view>标明实际租住价格</view>
                        </view>
                    </view>
                    <view class="cell m_flex_middle">
                        <view class="img">
                            <image src="/static/image/publish/policy.png" mode="aspectFit"></image>
                        </view>
                        <view class="m_flex_item">
                            <view>责任声明</view>
                            <view>用户与房东一切除看信息行为与本平台无关</view>
                        </view>
                    </view>
                </view>
            </view>
            <view class="fd m_button primary" @tap="to(`/pages/publish/house`)">我承诺并立即发布</view>
        </view>
        <view class="not_landlord" v-else>
            <view class="bd">
                <view>{{ state }}</view>
                <view v-if="step === 3" @tap="copy(CONFIG.wechat_number)">客服微信：{{  CONFIG.wechat_number }}（点击复制）</view>
                <image src="/static/image/publish/intro.png" mode="widthFix"></image>
            </view>
            <view class="fd">
                <!-- #ifdef MP-WEIXIN -->
                <button class="m_button main" open-type="contact">联系客服</button>
                <!-- #endif -->
                <!-- #ifdef H5 -->
                <button class="m_button main" @tap="showLink">联系客服</button>
                <!-- #endif -->
            </view>
            <button v-if="step === 2" class="m_button main btn_add m_flex_center m_flex_middle m_flex_column" plain @tap="settle">
                <view>发布</view>
                <view>房源</view>
            </button>
            <v-modal ref="modal">
                <view slot="content">
                    <view class="modal">
                        <link-modal :temp="CONFIG"></link-modal>
                    </view>
                </view>
            </v-modal>
        </view>
        <!-- #ifdef MP-WEIXIN -->
        <official-account></official-account>
        <!-- #endif -->
        <v-auth ref="auth"></v-auth>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import linkModal from '../components/link-modal'
export default {
    components: {
        linkModal,
    },
    computed: {
        ...mapState(['userInfo', 'auth']),
        state() {
            switch (this.step) {
                case 2:
                    return '发布房源请点击右下角浮窗'
                case 3:
                    return '正在审核，加快审核请联系客服'
                case 4:
                    return '服务已结束，如想继续使用请联系客服'
                default:
                    return '您未入驻，暂无法发布房源'
            }
        },
    },
    data() {
        return {
            step: 2,
        }
    },
    onShow() {
        this.init()
    },
    methods: {
        ...mapActions(['login', 'getInfo', 'checkAuth']),
        init() {
            // #ifdef MP-WEIXIN
            this.login()
                .then(code => {
                    return this.getInfo()
                })
                .then(
                    userInfo => {
                        if (this.userInfo.is_landlord === 1) {
                            this.checkAuth().then(
                                res => {
                                    if (res) {
                                        this.step = 1
                                    } else {
                                        this.step = 4
                                    }
                                },
                                e => {
                                    this.step = 4
                                }
                            )
                        } else {
                            this.step = this.userInfo.is_landlord
                        }
                    },
                    e => {
                        this.step = 2
                    }
                )
            // #endif
            // #ifdef H5
            this.getInfo(true).then(
                userInfo => {
                    if (this.userInfo.is_landlord === 1) {
                        this.checkAuth().then(
                            res => {
                                if (res) {
                                    this.step = 1
                                } else {
                                    this.step = 4
                                }
                            },
                            e => {
                                this.step = 4
                            }
                        )
                    } else {
                        this.step = this.userInfo.is_landlord
                    }
                },
                e => {
                    this.step = 2
                }
            )
            // #endif
        },
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e).done(() => {
                this.init()
            })
        },
        to(url) {
            this.userInfo ? this.goPage(url) : this.getUserInfo()
        },
        settle() {
            this.userInfo ? this.to(`/pages/publish/settled`) : this.getUserInfo()
            // this.to(`/pages/publish/settled`)
        },
        showLink() {
            this.userInfo
                ? this.$refs.modal.show({
                      title: '联系方式',
                      confirmText: '确定',
                  })
                : this.getUserInfo()
        },
    },
}
</script>

<style lang="scss" scoped>
.not_landlord {
    .bd {
        width: 750upx;
        // height: 2228upx;
        padding-top: 70upx;
        text-align: center;
        line-height: 40upx;
        overflow: hidden;
    }

    .fd {
        margin: 30upx 0;
        text-decoration: underline;
        text-align: center;
        color: #0404ff;

        .m_button {
            padding: 16upx 30upx;
            border-radius: 0;
        }
    }
    .btn_add {
        display: flex;
        position: fixed;
        right: 20upx;
        bottom: 100upx;
        width: 120upx;
        height: 120upx;
        line-height: 1.2;
        background-color: $main-color;
        color: #fff;
        border-radius: 50%;
        overflow: hidden;
    }
}
.is_landlord {
    padding: 0 30upx;

    .hd {
        font-size: 30upx;
        line-height: 1.7;

        .title {
            padding: 57upx 0 23upx;
            font-size: 37upx;
            color: $primary-color;
        }
    }

    .bd {
        padding: 20upx 0 0;
        line-height: 1.77;
        font-size: 26upx;

        .cell {
            padding: 27upx 0 28upx;
        }

        .img {
            width: 85upx;
            height: 85upx;
            padding-left: 24upx;
            padding-right: 40upx;
        }
    }

    .fd {
        width: 100%;
        height: 100upx;
        margin: 30upx 0;
        padding: 0;
        text-align: center;
        line-height: 100upx;
        font-size: 33upx;
    }
}

.modal {
    padding: 0 1.6em 0.8em;
    font-size: 30upx;
}
</style>
