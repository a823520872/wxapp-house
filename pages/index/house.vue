<template>
    <view class="content">
        <view v-if="detail">
            <view class="bd">
                <view class="cells">
                    <view class="cell intro m_flex_wrap">
                        <view class="house_name m_flex_justify">
                            <view class="title">单间·天河区·上社</view>
                            <button class="share m_button plain m_flex_middle" open-type="share">
                                <image src="/static/image/index/share.png" mode="aspectFit"></image>
                                <text>分享</text>
                            </button>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">租金：</text>
                            <text class="intro_bd">
                                <text class="price">
                                    <text class="num">{{detail.rental}} </text>
                                    <text>元/月</text>
                                </text>
                            </text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">楼层：</text>
                            <text class="intro_bd">【{{detail.floor_number}}楼】</text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">地址：</text>
                            <text class="intro_bd">【{{detail.address_street}}】【{{detail.address_flag}}】【{{detail.address_detail}}】【{{detail.road_distance}}】</text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">亮点：</text>
                            <text class="intro_bd">
                                <text v-if="detail.config_base">【{{detail.config_base}}】</text>
                                <text v-if="detail.config_lightspot">【{{detail.config_lightspot}}】</text>
                            </text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">具体地址：</text>
                            <text class="intro_bd">广州上社乐泰路大街9号</text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text class="intro_hd">备注：</text>
                            <text class="intro_bd">{{detail.supplement}}</text>
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cell m_flex_middle">
                        <view class="avatar">
                            <image src="/static/image/index/time.png" mode="aspectFit"></image>
                        </view>
                        <view class="user m_flex_item">
                            <view class="name">房东微信昵称</view>
                            <view class="m_flex_middle">
                                <text>阅读量：500</text>
                            </view>
                        </view>
                        <view class="time">
                            {{detail.create_at}} 发布
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cells_title title">房源图片</view>
                    <view class="cell">
                        <view class="house_img">
                            <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                        </view>
                        <view class="house_img">
                            <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                        </view>
                        <view class="house_img">
                            <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cells_title title">房源位置<text class="intro">（房源在定位附件）</text></view>
                    <view class="cell map">
                        <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                    </view>
                </view>
            </view>
            <view class="empty"></view>
            <view class="fd m_flex">
                <view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="collect">
                    <image src="/static/image/index/collect.png" mode="aspectFit"></image>
                    <text>收藏</text>
                </view>
                <view class="gift m_flex_column m_flex_middle m_flex_center m_flex_item">
                    <image src="/static/image/index/gift.png" mode="aspectFit"></image>
                    <text>拿乔迁礼</text>
                </view>
                <view class="link m_flex_column m_flex_middle m_flex_center" @tap="linkLandlord">
                    <image src="/static/image/index/tel.png" mode="aspectFit"></image>
                    <text>联系房东</text>
                </view>
            </view>
            <v-modal ref="modal">
                <view slot="content">
                    <view class="modal">
                        <view v-if="detail.contact_mobile" class="link m_flex_justify">
                            <view>手机号：{{detail.contact_mobile}}</view>
                            <button class="m_button main" plain @tap="call">拨打</button>
                        </view>
                        <view v-if="detail.wechat_number" class="link m_flex_justify">
                            <view>微信号：{{detail.wechat_number}}</view>
                            <button class="m_button main" plain @tap="copy">复制</button>
                        </view>
                    </view>
                </view>
            </v-modal>
        </view>
        <v-auth ref="auth"></v-auth>
    </view>
</template>

<script>
import { mapState } from "vuex";
export default {
    computed: {
        ...mapState(["userInfo"])
    },
    data() {
        return {
            id: "",
            detail: null
        };
    },
    onShareAppMessage(obj) {
        return {
            title: "房源详情",
            path: `/pages/index/house?id=${this.id}`
        };
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id;
        }
    },
    onShow() {
        const tk = uni.getStorageSync("tk");
        if (tk) {
            if (!this.userInfo) {
                this.getInfo();
            }
        } else {
            this.login();
        }
        this.getData();
    },
    methods: {
        getData() {
            this.$request.getHouse({ id: this.id }).then(res => {
                if (res && res.data) {
                    res.data.create_at = this.getTime(res.data.createtime);
                    this.detail = { ...res.data };
                }
            });
        },
        login() {
            this.$request.login();
        },
        getInfo() {
            this.$request.getUserInfo();
        },
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e);
        },
        collect() {
            this.userInfo
                ? this.$request
                      .collect({
                          hr_id: this.id
                      })
                      .then(res => {
                          uni.showToast({
                              title: "收藏成功",
                              icon: "success"
                          });
                      })
                : this.getUserInfo();
        },
        linkLandlord() {
            this.userInfo
                ? this.$refs.modal.show({
                      title: "联系方式",
                      confirmText: "确定",
                      success() {}
                  })
                : this.getUserInfo();
        },
        call() {
            const self = this;
            uni.makePhoneCall({
                phoneNumber: self.detail.contact_mobile
            });
        },
        copy() {
            const self = this;
            uni.setClipboardData({
                data: self.detail.wechat_number,
                success() {
                    uni.showToast({
                        title: "复制成功",
                        icon: "success"
                    });
                }
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.swiper {
    width: 750upx;
    height: 348upx;
    &-item {
        width: 100%;
        height: 100%;
    }
}
.bd {
    .cells {
        background-color: #fff;
        & + .cells {
            margin-top: 18upx;
        }

        &_title {
            padding-left: 30upx;
            padding-right: 30upx;
            line-height: 90upx;
            font-size: 33upx;

            &::before {
                content: " ";
                display: inline-block;
                width: 5upx;
                height: 22upx;
                margin-right: 7upx;
                background-color: $main-color;
            }

            .intro {
                font-size: 25upx;
            }
        }
    }
    .cell {
        padding: 0 30upx;
    }
    .house_name {
        width: 100%;
        padding-top: 30upx;
        padding-bottom: 12upx;
    }
    .share {
        image {
            width: 25upx;
            height: 28upx;
            padding-right: 10upx;
        }
    }
    .price {
        padding-bottom: 24upx;
        color: $primary-color;
        .num {
            // font-size: 33upx;
            font-weight: bold;
        }
    }
    .intro {
        line-height: 37upx;
        padding-bottom: 18upx;

        &_cell {
            padding: 5upx 0;
            min-width: 50%;
        }

        &_hd {
            color: $text-color-inverse;
        }
    }
    .avatar {
        width: 140upx;
        height: 140upx;
        margin-top: 28upx;
        margin-right: 24upx;
        margin-bottom: 28upx;
        border-radius: 50%;
        overflow: hidden;
    }
    .user {
        color: $text-color-inverse;
        image {
            width: 32upx;
            height: 18upx;
            padding-right: 16upx;
        }
    }
    .name {
        padding-bottom: 10upx;
        font-size: 30upx;
        color: $text-color;
    }
    .time {
        width: 140upx;
        color: $text-color-inverse;
    }
    .has {
        color: $primary-color;
    }
    .house_img {
        height: 374upx;
        padding-bottom: 18upx;
        &:last-of-type {
            padding-bottom: 30upx;
        }
    }
    .map {
        width: 750upx;
        height: 321upx;
        padding: 0;
        padding-bottom: 18upx;
    }
    .other {
        height: 100upx;
        image {
            width: 40upx;
            height: 40upx;
        }
    }
    .title {
        font-size: 33upx;
    }

    .praise {
        height: 100%;
        padding-left: 30upx;
    }
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    height: 100upx;
    background-color: #fff;
    font-size: 20upx;
    .collection {
        background-color: #f5f5f5;
        color: $text-color-inverse;
    }
    .gift {
        background-color: $primary-color;
        color: #fff;
    }
    .link {
        flex: 2;
        background-color: $main-color;
        color: #fff;
    }
    image {
        width: 48upx;
        height: 48upx;
    }
}
</style>
