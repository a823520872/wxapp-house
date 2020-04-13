<template>
    <view class="content">
        <view v-if="detail">
            <view class="hd">
                <view class="m_flex_middle m_flex_justify">
                    <view class="title m_textover m_flex_item">{{ detail.address_street }} · {{ detail.house_type }}</view>
                    <view class="read_number">{{ (detail && detail.read_number) | numberFilter }}人浏览过</view>
                </view>
                <view class="cells">
                    <view class="cell m_flex">
                        <view class="cell_item m_flex_item">
                            <view class="value">{{ detail.rental }}元</view>
                            <view class="label">租金/月</view>
                        </view>
                        <view class="cell_item m_flex_item" v-if="detail.deposit">
                            <view class="value">{{ detail.deposit }}</view>
                            <view class="label">押金</view>
                        </view>
                        <view class="cell_item m_flex_item">
                            <view class="value">{{ detail.floor_number }}楼</view>
                            <view class="label">楼层</view>
                        </view>
                        <view class="cell_item m_flex_item">
                            <view class="value">{{ (detail && detail.road_distance) | distanceFilter }}</view>
                            <view class="label">路边</view>
                        </view>
                    </view>
                    <view class="cell m_flex" v-if="detail.fee_wather || detail.fee_electric">
                        <view class="cell_item m_flex_middle m_flex_center m_flex_item line" v-if="detail.fee_wather">
                            <text class="label">水费</text>
                            <text class="value">{{ detail.fee_wather }}元/吨</text>
                        </view>
                        <view class="cell_item m_flex_middle m_flex_center m_flex_item line" v-if="detail.fee_electric">
                            <text class="label">电费</text>
                            <text class="value">{{ detail.fee_electric }}元/度</text>
                        </view>
                    </view>
                    <view class="cell lightspot m_flex_middle m_flex_wrap" v-if="detail.config_lightspot && detail.config_lightspot.length">
                        <view class="lightspot_cell" v-for="(li, i) in detail.config_lightspot" :key="i">{{ li }}</view>
                    </view>
                </view>
            </view>
            <view class="bd">
                <view class="cells">
                    <view class="cell_title m_flex_middle">房源配置</view>
                    <view class="cell">
                        <view class="base m_flex_wrap">
                            <view class="base_cell" v-for="(li, i) in detail.config_base" :key="i">
                                <image class="base_img" :src="li.img"></image>
                                <view>{{ li.text }}</view>
                            </view>
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cell_title m_flex_middle">房东描述</view>
                    <view class="cell">
                        <view class="info m_flex_middle" @tap="viewLandlord">
                            <view class="avatar">
                                <image :src="detail.landlord_info.avatar" mode="aspectFit"></image>
                            </view>
                            <view class="user m_flex_item">
                                <view class="name m_flex_middle">
                                    <text>{{ detail.landlord_info.nickname }}</text>
                                    <view class="avatar_auth" v-if="detail.landlord_info.is_auth && detail.landlord_info.is_auth === 2">
                                        <auth-img></auth-img>
                                    </view>
                                </view>
                                <view class="time m_flex_middle">
                                    <text> {{ detail.public_time }} 发布 </text>
                                </view>
                            </view>
                            <view class="his m_flex_middle">
                                <text>Ta的房源</text>
                                <text class="right_icon"></text>
                            </view>
                        </view>
                        <view class="remark" v-if="detail.remarks">{{ detail.remarks }}</view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cell_title m_flex_middle">视频/图片</view>
                    <view class="cell">
                        <block v-for="li in detail.video_urls" :key="li">
                            <video class="vdo" :src="li" controls></video>
                        </block>
                        <block v-for="(li, j) in detail.image_urls" :key="li">
                            <image v-if="showMoreImg || j < 3" class="img" :src="li" mode="widthFix" @tap="showImg(li)" lazy-load></image>
                        </block>
                        <view class="more m_flex_middle m_flex_center" v-if="!showMoreImg && detail.image_urls.length > 3" @tap="showMore">
                            <text>更多图片</text>
                            <image class="img_more" src="/static/image/index/down@2x.png"></image>
                        </view>
                    </view>
                </view>
                <view class="cells">
                    <view class="cell_title m_flex_middle">房源位置</view>
                    <view class="cell">
                        <view class="addr_item" v-if="detail.address">
                            <text>地址：</text>
                            <text>{{ detail.address }}</text>
                        </view>
                        <view class="addr_item">
                            <text>具体位置：</text>
                            <text v-if="detail.address_detail">{{ detail.address_detail }}</text>
                            <text v-else>{{ detail.address_flag }}附近</text>
                        </view>
                        <!-- <view class="addr_item">
                            <text>路边距离：</text>
                            <text>{{ detail.road_distance }}</text>
                        </view> -->
                        <map class="map" :longitude="detail.location.lng" :latitude="detail.location.lat" :scale="18" :markers="markers" @tap="showMap">
                            <!-- <cover-image class="marker" src="/static/image/index/marker.png"></cover-image> -->
                        </map>
                    </view>
                </view>
            </view>
            <view class="empty" :class="{ ipx: CONFIG.isIphoneX }"></view>
            <view class="fd m_flex_middle">
                <view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="collect">
                    <image class="img" :src="detail.collection_status === 1 ? '/static/image/me/my_collection.png' : '/static/image/index/uncollection.png'" mode="aspectFit"></image>
                    <!-- <text>{{ detail.collection_status === 1 ? '取消收藏' : '收藏' }}</text> -->
                    <text>收藏</text>
                </view>
                <button class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" open-type="share" plain>
                    <image class="img" src="/static/image/index/share.png" mode="aspectFit"></image>
                    <text>分享</text>
                </button>
                <view class="collection m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="goPage('/pages/index/index')">
                    <image class="img" src="/static/image/index/home.png" mode="aspectFit"></image>
                    <text>首页</text>
                </view>
                <!-- <view class="gift m_flex_column m_flex_middle m_flex_center m_flex_item" @tap="getPoster">
                    <image class="img" src="/static/image/index/poster.png" mode="aspectFit"></image>
                    <text>生成海报</text>
                </view> -->
                <button class="m_button main link m_flex_column m_flex_middle m_flex_center" @tap="linkLandlord">
                    <!-- <image src="/static/image/index/tel.png" mode="aspectFit"></image> -->
                    <text>联系房东</text>
                </button>
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
import { mapState, mapMutations, mapActions } from 'vuex'
import authImg from '../components/auth-img'
import linkModal from '../components/link-modal'
import poster from '../components/poster.vue'
export default {
    computed: {
        ...mapState(['userInfo']),
    },
    components: {
        authImg,
        linkModal,
        poster,
    },
    data() {
        return {
            id: '',
            detail: null,
            markers: null,
            uri: '',
            showMoreImg: false,
        }
    },
    onShareAppMessage(obj) {
        return {
            title: '房源详情',
            path: `/pages/index/index?p=` + encodeURIComponent(`/pages/index/house?id=${this.id}` + (this.userInfo ? `&uid=${this.userInfo.id}` : ``)),
        }
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id
        } else {
            uni.showToast({
                title: '地址错误',
                icon: 'none',
            })
        }
    },
    onShow() {
        // const tk = uni.getStorageSync("tk");
        // if (tk) {
        //     this.getInfo();
        // } else {
        //     this.login()
        // }
        this.login().then(code => {
            this.getInfo()
        })
    },
    onReady() {
        this.getData()
        this.addReader()
    },
    methods: {
        ...mapMutations(['setCollectReload']),
        ...mapActions(['login', 'getInfo']),
        getData() {
            const params = {
                id: this.id,
            }
            if (this.userInfo) {
                params.user_id = this.userInfo.user_id
            }
            this.$request.getHouse(params).then(res => {
                if (res && res.data) {
                    const data = this.filterHouse(res.data)
                    // 数据库数据经纬度传反了
                    // 这里对调一下
                    if (+data.location.lat > +data.location.lng) {
                        ;[data.location.lng, data.location.lat] = [data.location.lat, data.location.lng]
                    }
                    data.config_base = (data.config_base || []).map(li => ({
                        img: this.getBaseImg(li),
                        text: li,
                    }))
                    this.detail = { ...data }
                    if (this.detail.location && this.detail.location.lng && this.detail.location.lat) {
                        this.markers = [
                            {
                                id: 0,
                                latitude: this.detail.location.lat,
                                longitude: this.detail.location.lng,
                                title: this.detail.address_flag,
                                iconPath: '/static/image/index/marker.png',
                                width: 120,
                                height: 60,
                            },
                        ]
                    }
                }
            })
        },
        // getPoster() {
        //     this.$request
        //         .getQRCode({
        //             house_id: this.id,
        //         })
        //         .then(res => {
        //             if (res && res.data) {
        //                 this.uri = res.data
        //                 this.$refs.poster.show()
        //             }
        //         })
        // },
        getBaseImg(text) {
            const mappings = new Map([
                ['冰箱', '/static/image/index/bingxiang.png'],
                ['茶几', '/static/image/index/chaji.png'],
                ['空调', '/static/image/index/kongtiao.png'],
                ['宽带', '/static/image/index/kuandai.png'],
                ['热水器', '/static/image/index/reshuiqi.png'],
                ['沙发', '/static/image/index/shafa.png'],
                ['洗衣机', '/static/image/index/xiyiji.png'],
                ['阳台', '/static/image/index/yangtai.png'],
                ['衣柜', '/static/image/index/yigui.png'],
                ['桌椅', '/static/image/index/zhuoyi.png'],
            ])
            return mappings.get(text) || ''
        },
        showMap(e) {
            uni.openLocation({
                longitude: this.detail.location.lng,
                latitude: this.detail.location.lat,
            })
        },
        addReader() {
            const params = {
                id: this.id,
            }
            if (this.userInfo) {
                params.user_id = this.userInfo.user_id
            }
            this.$request.addReader(params)
        },
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e)
        },
        getPhone(e) {
            this.$refs.auth.getPhone(e)
        },
        showImg(li) {
            uni.previewImage({
                current: li,
                urls: this.detail.image_urls,
            })
        },
        viewLandlord() {
            this.goPage(`/pages/me/publish?user_id=${this.detail.user_id}`)
        },
        collect() {
            if (this.userInfo) {
                if (this.detail.collection_status === 0) {
                    this.$request
                        .collect({
                            hr_id: this.id,
                        })
                        .then(() => {
                            this.detail.collection_status = 1
                            uni.showToast({
                                title: '收藏成功',
                                icon: 'success',
                            })
                        })
                } else if (this.detail.collection_status === 1) {
                    this.$request
                        .cancelCollect({
                            id: this.id,
                        })
                        .then(() => {
                            this.detail.collection_status = 0
                            uni.showToast({
                                title: '取消成功',
                                icon: 'success',
                            })
                        })
                }
                this.setCollectReload(true)
            } else {
                this.getUserInfo()
            }
        },
        linkLandlord() {
            this.userInfo
                ? (this.$refs.modal.show({
                      title: '联系方式',
                      confirmText: '确定',
                      success() {},
                  }),
                  this.$request.viewPhone({
                      id: this.id,
                  }))
                : this.getUserInfo()
        },
        showMore() {
            this.showMoreImg = true
        },
    },
    filters: {
        distanceFilter(v) {
            return v && v.replace('路边', '')
        },
    },
}
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
.hd {
    position: relative;
    padding: 40upx 30upx 0;
    background-color: #fff;
    overflow: hidden;
    .title {
        line-height: 50upx;
        font-weight: bold;
        font-size: 42upx;
        color: #333;
    }
    .read_number {
        margin-left: 20upx;
        line-height: 38upx;
        font-size: 30upx;
        color: #999;
    }
    .cells {
        position: relative;
        overflow: hidden;
        width: 100%;
        margin-top: 20upx;
    }
    .cell {
        border-top: 1upx solid #f2f2f2;
        &:first-child {
            border-top: none;
        }
    }
    .cell_item {
        position: relative;
        padding: 10upx 0;
        text-align: center;
        &:first-child::before {
            display: none;
        }
        &::before {
            content: ' ';
            position: absolute;
            top: 25upx;
            bottom: 25upx;
            left: 0;
            width: 0;
            border-left: 2upx solid #f2f2f2;
        }
        &.line {
            padding: 12upx 0;
            &::before {
                top: 15upx;
                bottom: 15upx;
            }
            .value {
                margin-left: 10upx;
                margin-bottom: 0;
                line-height: 36upx;
                font-size: 28upx;
            }
        }
    }
    .value {
        margin-bottom: 6upx;
        line-height: 42upx;
        font-weight: bold;
        font-size: 34upx;
        color: #0e868f;
    }
    .label {
        line-height: 32upx;
        font-size: 24upx;
        color: #999;
    }
    .lightspot {
        position: relative;
        padding-top: 20upx;
        margin: 0 -10upx -20upx;
        overflow: hidden;
    }

    .lightspot_cell {
        margin: 0 10upx 20upx;
        flex-shrink: 0;
        line-height: 34upx;
        padding: 1upx 10upx;
        border-radius: 8upx;
        border: 1upx solid #0e868f;
        color: #0e868f;
    }
}
.bd {
    .cells {
        padding: 0 30upx;
        background-color: #fff;
        &:last-child {
            padding-bottom: 40upx;
        }
    }
    .cell_title {
        padding: 40upx 0 30upx;
        line-height: 40upx;
        font-weight: bold;
        font-size: 32upx;
        color: #333;

        &::before {
            content: ' ';
            display: inline-block;
            width: 8upx;
            height: 30upx;
            margin-right: 10upx;
            background-color: $main-color;
            border-radius: 4upx;
        }
    }
    .cell {
        position: relative;
        padding-bottom: 20upx;
        overflow: hidden;
        border-bottom: 1upx solid #f2f2f2;
    }
    .vdo {
        width: 690upx;
        height: 450upx;
        margin-bottom: 20upx;
    }
    .img {
        margin-bottom: 20upx;
        &:last-child {
            margin-bottom: 0;
        }
    }
    .base {
        position: relative;
        margin: 0 -21upx -24upx;
        overflow: hidden;
        text-align: center;
        line-height: 32upx;
        font-size: 24upx;
        color: #666;
    }
    .base_cell {
        margin: 0 21upx 24upx;
    }
    .base_img {
        width: 80upx;
        height: 80upx;
        margin-bottom: 4upx;
    }
    .avatar {
        width: 100upx;
        height: 100upx;
        margin-right: 30upx;
        border-radius: 50%;
        overflow: hidden;
    }
    .name {
        line-height: 38upx;
        font-size: 30upx;
        color: $text-color;
    }
    .avatar_auth {
        margin-left: 20upx;
    }
    .time {
        padding-top: 10upx;
        line-height: 32upx;
        font-size: 24upx;
        color: #999;
    }
    .his {
        width: 160upx;
        color: $text-color-inverse;

        .right_icon {
            width: 12upx;
            height: 12upx;
            margin-left: 10upx;
            border-width: 1upx;
            border-color: $text-color-inverse;
        }
    }
    .remark {
        margin-top: 20upx;
        line-height: 40upx;
        font-size: 28upx;
        color: #666;
    }
    .more {
        position: relative;
        line-height: 34upx;
        font-size: 26upx;
        color: #999;

        &::before {
            content: ' ';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            width: 100%;
            height: 200upx;
            margin-top: -200upx;
            z-index: 1;
            background: linear-gradient(to bottom, rgba(255, 255, 255, 0), rgba(255, 255, 255, 1));
        }
    }
    .img_more {
        margin-left: 10upx;
        width: 28upx;
        height: 28upx;
    }
    .addr_item {
        padding-bottom: 10upx;
        line-height: 36upx;
        font-size: 28upx;
        color: #666;
    }
    .map {
        width: 690upx;
        height: 280upx;
        margin-top: 20upx;
    }
}
.empty {
    height: 150upx;

    &.ipx {
        height: 218upx;

        + .fd {
            padding-bottom: 68upx;
        }
    }
}
.fd {
    position: fixed;
    right: 0;
    bottom: 0;
    left: 0;
    z-index: 10;
    padding: 0 30upx 0 10upx;
    height: 120upx;
    background-color: #fff;
    line-height: 32upx;
    font-size: 24upx;
    .collection {
        width: 68upx;
        padding: 0 10upx 4upx;
        // background-color: #f5f5f5;
        text-align: center;
        border: none;
        line-height: 32upx;
        font-size: 24upx;
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
        width: 426upx;
        padding: 25upx 0;
        background-color: $main-color;
        line-height: 40upx;
        border-radius: 45upx;
        font-size: 32upx;
        color: #fff;
    }
    .img {
        width: 48upx;
        height: 48upx;
        margin-bottom: 6upx;
    }
}
official-account {
    bottom: 100upx;
}
</style>
