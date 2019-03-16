<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="avatar" @tap="getAuth">
                <image v-if="userInfo" :src="userInfo.avatar" mode="aspectFit"></image>
            </view>
            <view class="main">
                <view class="box">
                    <view class="name m_textover">
                        <view v-if="userInfo">{{ userInfo.nickname }}</view>
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
                        <view class="tab">
                            <view class="icon">
                                <image src="/static/image/me/praise.png" mode="aspectFit"></image>
                            </view>
                            <view>我赞过的</view>
                        </view>
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
            <view class="cell m_flex_justify m_flex_middle">
                <view class="cell_hd">推荐好友</view>
                <button class="cell_fd m_button plain" open-type="share">{{userInfo && userInfo.is_landlord === 1 ? '邀请入驻2人同享1月免费服务' : '获得88元分享基金'}}</button>
            </view>
            <view class="cell m_flex_justify m_flex_middle">
                <view class="cell_hd">联系村长</view>
                <button class="cell_fd m_button plain" open-type="contact">智能找房、意见反馈、入驻咨询</button>
            </view>
            <view class="cell m_flex_justify m_flex_middle" @tap="clear">
                <view class="cell_hd">清楚授权</view>
            </view>
        </view>
        <v-auth ref="auth"></v-auth>
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal">
                    <view class="link m_flex_justify">
                        <view>手机号：13123456789</view>
                        <button class="m_button main" plain @tap="call">拨打</button>
                    </view>
                    <view class="link m_flex_justify">
                        <view>微信号：13123456789</view>
                        <button class="m_button main" plain @tap="copy">复制</button>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
export default {
    computed: {
        ...mapState(["userInfo"])
    },
    data() {
        return {};
    },
    onShow() {
        const tk = uni.getStorageSync("tk");
        if (tk) {
            if (!this.userInfo) {
                this.getInfo();
            }
        } else {
            this.login().then(code => {
                if (code) {
                    !this.userInfo && this.getInfo();
                }
            });
        }
    },
    onShareAppMessage() {
        return {
            title: "邀请入驻",
            path: this.userInfo
                ? this.userInfo.is_landlord === 1
                    ? `/pages/publish/index?rid=${this.userInfo.id}`
                    : `/pages/index/index?rid=${this.userInfo.id}`
                : `/pages/index/index`
        };
    },
    methods: {
        ...mapActions(["login", "getInfo"]),
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e);
        },
        linkAdmin() {
            this.userInfo
                ? this.$refs.modal.show({
                      title: "联系方式",
                      confirmText: "确定",
                      success() {}
                  })
                : this.getUserInfo();
        },
        to(url) {
            this.userInfo ? this.goPage(url) : this.getUserInfo();
        },
        clear() {
            try {
                uni.clearStorageSync();
                uni.reLaunch({
                    url: "/pages/me/me"
                });
            } catch (e) {
                //TODO handle the exception
                uni.showToast({
                    title: "清楚授权失败",
                    icon: "none"
                });
            }
        }
    }
};
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
        line-height: 95upx;
        text-align: center;
        color: $text-color;
    }

    .m_button {
        width: 100%;
        height: 95upx;
        line-height: 95upx;
        padding: 0 30upx;
        border: none;
        font-size: 33upx;
        color: $text-color;
    }
    .tabs {
        padding: 10upx 30upx;
        justify-content: space-around;
        line-height: 49upx;
        color: $text-color;
    }
    .tab {
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
}
</style>
