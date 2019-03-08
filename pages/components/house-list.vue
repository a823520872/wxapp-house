<template>
    <view>
        <view class="list">
            <view v-for="(li, i) in list" :key="i" class="cell" @tap="goPage(`/pages/index/house`)">
                <view class="hd">
                    <view class="m_flex_justify">
                        <view class="title m_textover">{{li.house_type}}</view>
                        <view class="price">
                            <text class="num">{{li.rental}}</text>
                            <text class="unit">元/月</text>
                        </view>
                        <button class="m_button main plain" @tap.stop="linkLandlord(li)">联系房东</button>
                    </view>
                    <view class="intro">
                        <view class="intro_cell m_textover">楼层：【{{li.floor_number}}楼】</view>
                        <view class="intro_cell m_textover">地址：【{{li.address_street}}】【{{li.address_flag}}】【{{li.address_detail}}】【{{li.road_distance}}】</view>
                        <view class="intro_cell m_textover">亮点：
                            <text v-if="li.config_base">【{{li.config_base}}】</text>
                            <text v-if="li.config_lightspot">【{{li.config_lightspot}}】</text>
                        </view>
                    </view>
                </view>
                <view class="bd m_flex_justify">
                    <view class="img_box">
                        <image src="/static/image/index/banner.png" mode="aspectFill"></image>
                    </view>
                    <view class="img_box">
                        <image src="/static/image/index/banner.png" mode="aspectFill"></image>
                    </view>
                    <view class="img_box last">
                        <image src="/static/image/index/banner.png" mode="aspectFill"></image>
                    </view>
                </view>
            </view>
        </view>
        <v-modal ref="modal">
            <view slot="content">
                <link-modal :temp="temp"></link-modal>
            </view>
        </v-modal>
    </view>
</template>

<script>
import linkModal from './link-modal';
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    components: {
        linkModal
    },
    data() {
        return {
            temp: null
        };
    },
    methods: {
        linkLandlord(li) {
            const self = this;
            this.temp = {
                contact_mobile: li.contact_mobile,
                wechat_number: li.wechat_number
            };
            this.$nextTick(() => {
                this.$refs.modal.show({
                    title: "联系方式",
                    confirmText: "确定",
                    success() {
                        self.temp = null;
                    },
                    fail() {
                        self.temp = null;
                    }
                });
            });
        },
    }
};
</script>

<style lang="scss" scoped>
.list {
    .cell {
        padding: 10upx 30upx;
        margin-bottom: 18upx;
        background-color: #fff;
    }

    .hd {
        padding-top: 12upx;
    }

    .title {
        max-width: 40%;
        font-size: 33upx;
    }

    .price {
        align-self: flex-end;
        color: $primary-color;
    }

    .num {
        font-size: 25upx;
    }

    .unit {
        font-size: 15upx;
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
        line-height: 42upx;
        color: $text-color-inverse;
    }

    .bd {
        padding-top: 16upx;
        padding-bottom: 24upx;
    }

    .img_box {
        width: 222upx;
        height: 174upx;
        background-color: $uni-bg-color-grey;
    }

    .last {
        position: relative;

        &::after {
            content: "更多";
            position: absolute;
            top: 0;
            right: 0;
            display: flex;
            width: 100%;
            height: 100%;
            justify-content: center;
            align-items: center;
            background-color: rgba(76, 230, 232, 0.4);
            font-size: 25upx;
            color: #fff;
        }
    }
}
</style>
