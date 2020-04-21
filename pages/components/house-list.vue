<template>
    <view>
        <view class="list">
            <view v-for="(li, i) in items" :key="i" class="cell" @tap="to(`/pages/index/house?id=${li.id}`)">
                <view class="hd">
                    <view class="m_flex_justify m_flex_middle">
                        <view class="title m_textover">{{ li.address_street }} · {{ li.house_type }}</view>
                        <view class="price">
                            <text class="num">{{ li.rental }}</text>
                            <text class="unit">元/月</text>
                        </view>
                        <!-- <button class="m_button main plain" @tap.stop="linkLandlord(li)">联系房东</button> -->
                    </view>
                    <view class="intro m_textover">
                        <text class="intro_cell">{{ li.floor_number }}楼</text>
                        <text>丨</text>
                        <text class="intro_cell">{{ li.road_distance }}</text>
                        <template v-if="li.address_flag">
                            <text>丨</text>
                            <text class="intro_cell">{{ li.address_flag }}</text>
                        </template>
                    </view>
                    <view class="lightspot m_flex_middle" v-if="li.config_lightspot && li.config_lightspot.length">
                        <view class="lightspot_cell" v-for="(l, j) in li.config_lightspot" :key="j">{{ l }}</view>
                    </view>
                </view>
                <view class="bd m_flex" v-if="li.image_urls && li.image_urls.length">
                    <block v-for="(l, k) in li.image_urls" :key="k">
                        <view :class="{ img_box: true, has_video: li.video_urls && k === 0, last: li.image_urls.length > 3 && k === 2 }" v-if="k < 3">
                            <image :src="l" :mode="CONFIG.house_mode"></image>
                        </view>
                    </block>
                </view>
            </view>
        </view>
        <v-auth ref="auth2"></v-auth>
        <v-modal ref="modal2">
            <view slot="content">
                <link-modal :temp="temp"></link-modal>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState } from 'vuex'
import linkModal from './link-modal'
export default {
    props: {
        list: {
            type: Array,
            default() {
                return []
            },
        },
    },
    computed: {
        ...mapState(['userInfo']),
        items() {
            return this.list.map(item => this.filterHouse({ ...item }))
        },
    },
    components: {
        linkModal,
    },
    data() {
        return {
            temp: null,
        }
    },
    methods: {
        to(url) {
            // this.userInfo ?
            this.goPage(url)
            //  : this.getUserInfo();
        },
        getUserInfo(e) {
            this.$refs.auth2.getUserInfo(e)
        },
        getPhone(e) {
            this.$refs.auth2.getPhone(e)
        },
        linkLandlord(li) {
            const self = this
            if (this.userInfo) {
                // if (this.userInfo.mobile) {
                this.temp = {
                    contact_mobile: li.contact_mobile,
                    wechat_number: li.wechat_number,
                }
                this.$refs.modal2.show({
                    title: '联系方式',
                    confirmText: '确定',
                    success() {
                        self.temp = null
                    },
                    fail() {
                        self.temp = null
                    },
                })
                this.$request.viewPhone({
                    id: li.id,
                })
                // } else {
                //     this.getPhone();
                // }
            } else {
                this.getUserInfo()
            }
        },
    },
}
</script>

<style lang="scss" scoped>
.list {
    .cell {
        padding: 30upx;
        margin-bottom: 20upx;
        background-color: #fff;
    }

    // .hd {
    //     padding-top: 12upx;
    // }

    .title {
        width: 50%;
        // font-weight: bold;
        font-size: 34upx;
        color: #333;
    }

    .price {
        // align-self: flex-end;
        color: $primary-color;
        font-size: 30upx;
    }

    .num {
        // font-size: 25upx;
        font-weight: bold;
    }

    .unit {
        // font-size: 15upx;
    }

    .m_button {
        width: 200upx;
        height: 56upx;
        padding: 0 7upx;
        line-height: 54upx;
    }

    .intro {
        padding: 20upx 0 0;
        font-size: 28upx;
        line-height: 36upx;
        color: #666;
    }

    .intro_cell + .intro_cell {
        margin-left: 30upx;
    }

    .lightspot {
        position: relative;
        margin-top: 20upx;
        overflow: hidden;
        flex-wrap: nowrap;
        &::after {
            content: ' ';
            position: absolute;
            top: 0;
            right: 0;
            bottom: 0;
            z-index: 0;
            width: 80upx;
            background: linear-gradient(to right, rgba(255, 255, 255, 0), rgba(255, 255, 255, 0.8));
        }
    }

    .lightspot_cell {
        flex-shrink: 0;
        line-height: 34upx;
        padding: 1upx 10upx;
        border-radius: 4upx;
        border: 1upx solid #0e868f;
        color: #0e868f;
        & + .lightspot_cell {
            margin-left: 12upx;
        }
    }

    .bd {
        padding-top: 20upx;
        padding-bottom: 10upx;
        margin-right: -15upx;
    }

    .img_box {
        position: relative;
        width: 220upx;
        height: 165upx;
        margin-right: 15upx;
        background-color: $uni-bg-color-grey;
        border-radius: 4upx;
        overflow: hidden;
    }

    .has_video::before {
        content: '有视频';
        position: absolute;
        top: 0;
        left: 0;
        padding: 6upx 12upx;
        background-color: $primary-color;
        border-radius: 4upx 0 8upx 0;
        line-height: 24upx;
        font-size: 22upx;
        color: #fff;
        z-index: 1;
    }

    .last {
        position: relative;

        &::after {
            content: '更多';
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: rgba(14, 35, 35, 0.6);
            font-size: 24upx;
            color: #fff;
        }
    }
}
</style>
