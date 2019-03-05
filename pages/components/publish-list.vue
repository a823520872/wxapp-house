<template>
    <view>
        <view class="list">
            <view class="item" v-for="(li, i) in list" :key="i" @tap="goPage(`/pages/index/house`)">
                <view class="bd m_flex">
                    <view class="img">
                        <image src="/static/image/index/banner.png" mode="aspectFill"></image>
                        <!-- <view class="rent m_textover">租金：¥1000/月</view> -->
                    </view>
                    <view class="intro m_flex_item">
                        <view class="intro_cell name">单间·天河区·上社</view>
                        <view class="intro_cell price">¥1000/月</view>
                        <view class="intro_cell addr">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                            <text>上社乐泰路大街9号</text>
                        </view>
                    </view>
                </view>
                <view class="fd m_flex_right">
                    <button class="m_button plain" @tap.stop="edit">编辑</button>
                    <button class="m_button plain" @tap.stop="rented">已租</button>
                    <button class="m_button primary" @tap.stop="">生产海报</button>
                </view>
            </view>
        </view>
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal">
                    <radio-group>
                        <view class="link m_flex_justify">
                            <label>
                                <radio checked="true" />村长带给您的人</label>
                        </view>
                        <view class="link m_flex_justify">
                            <label>
                                <radio />您自己租的</label>
                        </view>
                    </radio-group>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapActions } from "vuex";
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    methods: {
        ...mapActions(["goPage"]),
        edit() {
            this.goPage(`/pages/publish/house`);
        },
        rented() {
            this.$refs.modal.show({
                title: "联系方式",
                confirmText: "确定",
                success() {}
            });
        }
    }
};
</script>

<style lang="scss" scoped>
.item {
    margin-bottom: 18upx;
    padding: 34upx 30upx;
    background-color: #fff;
}
.bd {
    .img {
        position: relative;
        width: 277upx;
        height: 180upx;
    }
    .rent {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 41upx;
        padding-left: 40upx;
        line-height: 41upx;
        background-color: rgba(0, 0, 0, 0.3);
        color: $primary-color;
    }
    .intro {
        margin-top: 12upx;
        margin-left: 30upx;
        color: $text-color-inverse;

        &_cell {
            line-height: 1.2;
            padding: 6upx 0;
        }
    }
    .name {
        font-size: 33upx;
        color: $text-color;
    }
    .price {
        color: $primary-color;
    }
    .addr {
        image {
            width: 21upx;
            height: 31upx;
            padding-right: 6upx;
        }
    }
}
.fd {
    margin-top: 30upx;
    .m_button {
        min-width: 97upx;
        margin-left: 20upx;
        &::after {
            border: 1px solid $text-color-inverse;
        }

        &.primary::after {
            border: 1px solid $primary-color;
        }
    }
}
.modal {
    radio {
        margin-right: 10upx;
        vertical-align: top;
    }
}
</style>
