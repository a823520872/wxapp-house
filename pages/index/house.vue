<template>
    <view class="content">
        <view v-if="detail">
            <view class="bd">
                <view class="cells">
                    <view class="cell intro m_flex_wrap">
                        <view class="house_name m_flex_justify">
                            <view class="title">{{detail.address_street}} · {{detail.house_type}}</view>
                            <button class="share m_button plain m_flex_middle" open-type="share">
                                <image src="/static/image/index/share.png" mode="aspectFit"></image>
                                <text>分享</text>
                            </button>
                        </view>
                        <view class="intro_cell">
                            <text class="intro_hd">租金：</text>
                            <text class="intro_bd">
                                <text class="price">
                                    <text class="num">{{detail.rental}} </text>
                                    <text>元/月</text>
                                </text>
                            </text>
                        </view>
                        <view class="intro_cell">
                            <text class="intro_hd">楼层：</text>
                            <text class="intro_bd">{{detail.floor_number}}楼</text>
                        </view>
                        <view class="intro_cell" v-if="detail.address_flag">
                            <text class="intro_hd">标志建筑：</text>
                            <text class="intro_bd">{{detail.address_flag}}</text>
                        </view>
                        <view class="intro_cell" v-if="detail.road_distance">
                            <text class="intro_hd">路边距离：</text>
                            <text class="intro_bd">{{detail.road_distance}}</text>
                        </view>
                        <view class="intro_cell">
                            <text class="intro_hd">具体地址：</text>
                            <text class="intro_bd">
                                <text v-if="detail.address_detail">{{detail.address_detail}}</text>
                                <text v-else>{{detail.address_flag}}附近</text>
                            </text>
                        </view>
                        <view class="intro_cell" v-if="detail.config_base">
                            <text class="intro_hd">基础设施：</text>
                            <text class="intro_bd">
                                <text v-if="detail.config_base && detail.config_base.length">
                                    <text v-for="(li, i) in detail.config_base" :key="i">{{li}}</text>
                                </text>
                            </text>
                        </view>
                        <view class="intro_cell" v-if="detail.config_lightspot">
                            <text class="intro_hd">亮点：</text>
                            <text class="intro_bd">
                                <text v-if="detail.config_lightspot && detail.config_lightspot.length">
                                    <text v-for="(li, i) in detail.config_lightspot" :key="i">{{li}}</text>
                                </text>
                            </text>
                        </view>
                        <view class="intro_cell" v-if="detail.remarks">
                            <text class="intro_hd">备注：</text>
                            <text class="intro_bd">{{detail.remarks}}</text>
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cell m_flex_middle" @tap="viewLandlord">
                        <view class="avatar">
                            <image :src="detail.landlord_info.avatar" mode="aspectFit"></image>
                        </view>
                        <view class="user m_flex_item">
                            <view class="name">{{detail.landlord_info.nickname}}</view>
                            <view class="m_flex_middle">
                                <text>阅读量：{{detail.read_number}}</text>
                            </view>
                        </view>
                        <view class="time" v-if="detail.public_time">
                            {{detail.public_time}} 发布
                        </view>
                    </view>
                </view>
                <view class="cells" v-if="detail.image_urls && detail.image_urls.length">
                    <view class="cells_title title">房源图片</view>
                    <view class="cell">
                        <view class="house_img" v-for="(li, i) in detail.image_urls" :key="i">
                            <!-- <image :src="li" :mode="config.house_mode"></image> -->
                            <image :src="li" mode="widthFix" @tap="showImg(li)"></image>
                        </view>
                    </view>
                </view>
                <view class="cells" v-if="detail.location && detail.location.lng && detail.location.lat">
                    <view class="cells_title title">房源位置
                        <text class="intro">（房源在</text>
                        <image src="/static/image/index/marker.png" mode="aspectFit"></image>
                        <text class="intro">附近）</text>
                    </view>
                    <view class="cell map">
                        <map :longitude="detail.location.lng" :latitude="detail.location.lat" :scale="18" :markers="markers" :enable-scroll="false" :enable-zoom="false" @tap="showMap">
                            <cover-image class="marker" src="/static/image/index/marker.png"></cover-image>
                        </map>
                    </view>
                </view>
            </view>
            <view class="empty"></view>
            <view class="fd m_flex">
                <view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" @tap=" collect">
                    <image :src="detail.collection_status === 1 ? '/static/image/index/collected.png' : '/static/image/index/collect.png'" mode="aspectFit"></image>
                    <text>{{detail.collection_status === 1 ? '取消收藏' : '收藏'}}</text>
                </view>
                <!-- <button class="gift m_flex_column m_flex_middle m_flex_center m_flex_item" open-type="contact" plain>
                    <image src="/static/image/index/gift.png" mode="aspectFit"></image>
                    <text>拿乔迁礼</text>
                </button> -->
                <view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="goPage('/pages/index/index')">
                    <image src="/static/image/index/home.png" mode="aspectFit"></image>
                    <text>返回首页</text>
                </view>
                <view class="gift m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="getPoster">
                    <image src="/static/image/index/poster.png" mode="aspectFit"></image>
                    <text>生成海报</text>
                </view>
                <view class="link m_flex_column m_flex_middle m_flex_center" @tap="linkLandlord">
                    <image src="/static/image/index/tel.png" mode="aspectFit"></image>
                    <text>联系房东</text>
                </view>
            </view>
            <v-modal ref="modal">
                <view slot="content">
                    <link-modal :temp="detail"></link-modal>
                </view>
            </v-modal>
        </view>
        <v-auth ref="auth"></v-auth>
        <poster ref="poster" :uri="uri"></poster>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import linkModal from "../components/link-modal";
import poster from "../components/poster.vue";
export default {
    computed: {
        ...mapState(["userInfo"])
    },
    components: {
        linkModal,
        poster
    },
    data() {
        return {
            id: "",
            detail: null,
            markers: null,
            uri: ''
        };
    },
    onShareAppMessage(obj) {
        return {
            title: "房源详情",
            path:
                `/pages/index/index?p=` +
                encodeURIComponent(
                    `/pages/index/house?id=${this.id}` +
                        (this.userInfo ? `&uid=${this.userInfo.id}` : ``)
                )
        };
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id;
        } else {
            uni.showToast({
                title: "地址错误",
                icon: "none"
            });
        }
    },
    onShow() {
        const tk = uni.getStorageSync("tk");
        if (tk) {
            if (!this.userInfo) {
                this.getInfo();
            }
            // } else {
            //     this.login();
        }
    },
    onReady() {
        this.getData();
        this.addReader()
    },
    methods: {
        ...mapMutations(["setCollectReload"]),
        ...mapActions(["login", "getInfo"]),
        getData() {
            const params = {
                id: this.id
            };
            if (this.userInfo) {
                params.user_id = this.userInfo.user_id;
            }
            this.$request.getHouse(params).then(res => {
                if (res && res.data) {
                    const data = this.filterHouse(res.data, "string");
                    // 数据库数据经纬度传反了
                    // 这里对调一下
                    const tmp = +data.location.lng;
                    data.location.lng = +data.location.lat;
                    data.location.lat = +tmp;
                    this.detail = { ...data };
                    if (
                        this.detail.location &&
                        this.detail.location.lng &&
                        this.detail.location.lat
                    ) {
                        this.markers = [
                            {
                                id: 0,
                                latitude: this.detail.location.lat,
                                longitude: this.detail.location.longitude,
                                title: this.detail.address_flag,
                                iconPath: "/static/image/index/marker.png",
                                width: 15,
                                height: 20
                            }
                        ];
                    }
                }
            });
        },
        getPoster() {
            this.$request
                .getQRCode({
                    house_id: this.id
                })
                .then(res => {
                    if (res && res.data) {
                        this.uri = res.data;
                        this.$refs.poster.show();
                    }
                });
        },
        showMap(e) {
            uni.openLocation({
                longitude: this.detail.location.lng,
                latitude: this.detail.location.lat
            });
        },
        addReader() {
            const params = {
                id: this.id
            };
            if (this.userInfo) {
                params.user_id = this.userInfo.user_id;
            }
            this.$request.addReader(params)
        },
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e);
        },
        getPhone(e) {
            this.$refs.auth.getPhone(e);
        },
        showImg(li) {
            uni.previewImage({
                current: li,
                urls: this.detail.image_urls
            });
        },
        viewLandlord() {
            this.goPage(`/pages/me/publish?user_id=${this.detail.user_id}`);
        },
        collect() {
            if (this.userInfo) {
                if (this.detail.collection_status === 0) {
                    this.$request
                        .collect({
                            hr_id: this.id
                        })
                        .then(() => {
                            this.detail.collection_status = 1;
                            uni.showToast({
                                title: "收藏成功",
                                icon: "success"
                            });
                        });
                } else if (this.detail.collection_status === 1) {
                    this.$request
                        .cancelCollect({
                            id: this.id
                        })
                        .then(() => {
                            this.detail.collection_status = 0;
                            uni.showToast({
                                title: "取消成功",
                                icon: "success"
                            });
                        });
                }
                this.setCollectReload(true);
            } else {
                this.getUserInfo();
            }
        },
        linkLandlord() {
            this.userInfo
                // ? this.userInfo.mobile
                    ? (this.$refs.modal.show({
                          title: "联系方式",
                          confirmText: "确定",
                          success() {}
                      }),
                      this.$request.viewPhone({
                          id: this.id
                      }))
                    // : this.getPhone()
                : this.getUserInfo();
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

            image {
                width: 25upx;
                height: 25upx;
                vertical-align: middle;
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

        &_bd {
            font-size: 28upx;
        }
    }
    .avatar {
        width: 100upx;
        height: 100upx;
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
        width: 160upx;
        color: $text-color-inverse;
    }
    .has {
        color: $primary-color;
    }
    .house_img {
        // height: 600upx;
        padding-bottom: 24upx;
        &:last-of-type {
            padding-bottom: 30upx;
        }
    }
    .map {
        position: relative;
        width: 750upx;
        height: 321upx;
        padding: 0;
        padding-bottom: 18upx;

        map {
            width: 100%;
            height: 100%;
        }

        cover-image {
            position: absolute;
            top: 50%;
            left: 50%;
            width: 40upx;
            height: 40upx;
            transform: translate(-50%, -50%);
        }
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
    z-index: 10;
    height: 100upx;
    background-color: #fff;
    font-size: 20upx;
    .collection {
        background-color: #f5f5f5;
        color: $text-color-inverse;
    }
    .gift {
        display: flex;
        border-radius: 0;
        border: none;
        line-height: 1.2;
        background-color: $primary-color;
        font-size: 20upx;
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
official-account {
    bottom: 100upx;
}
</style>
