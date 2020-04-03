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
                    <view class="intro">
                        <view class="intro_cell m_textover">
                            <text>楼层：</text>
                            <text class="intro_cell_bd">{{ li.floor_number }}楼</text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text>标志建筑：</text>
                            <text class="intro_cell_bd" v-if="li.address_flag">{{ li.address_flag }}</text>
                        </view>
                        <view class="intro_cell m_textover">
                            <text>路边距离：</text>
                            <text class="intro_cell_bd" v-if="li.road_distance">{{ li.road_distance }}</text>
                        </view>
                    </view>
                </view>
                <view class="bd m_flex" v-if="li.image_urls && li.image_urls.length">
                    <block v-for="(it, j) in li.image_urls" :key="j">
                        <view :class="{ img_box: true, has_video: li.video_urls, last: li.image_urls.length > 3 && j === 2 }" v-if="j < 3">
                            <image :src="it" :mode="CONFIG.house_mode"></image>
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
            }
        }
    },
    computed: {
        ...mapState(['userInfo']),
        items() {
            return this.list.map(item => this.filterHouse({ ...item }, 'string'))
        }
    },
    components: {
        linkModal
    },
    data() {
        return {
            temp: null
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
                    wechat_number: li.wechat_number
                }
                this.$refs.modal2.show({
                    title: '联系方式',
                    confirmText: '确定',
                    success() {
                        self.temp = null
                    },
                    fail() {
                        self.temp = null
                    }
                })
                this.$request.viewPhone({
                    id: li.id
                })
                // } else {
                //     this.getPhone();
                // }
            } else {
                this.getUserInfo()
            }
        }
    }
}
</script>

<style lang="scss" scoped>
.list {
    .cell {
        padding: 10upx 30upx;
        margin-bottom: 20upx;
        background-color: #fff;
    }

    .hd {
        padding-top: 12upx;
    }

    .title {
        width: 40%;
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
        padding: 17upx 0 0;
        font-size: 24upx;
        font-size: 28upx;
        line-height: 36upx;
        color: $text-color-inverse;
        color: #666;

        &_cell {
            margin-bottom: 10upx;
        }

        &_cell_bd {
            color: $text-color;
            color: #666;
            font-size: 28upx;
        }
    }

    .bd {
        padding-top: 10upx;
        padding-bottom: 20upx;
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
        background-color: #fe620a;
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
