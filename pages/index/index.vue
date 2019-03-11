<template>
    <view class="content">
        <swiper class="swiper" :indicator-dots="true" indicator-color="#6d7271" indicator-active-color="#4ce6e8" :autoplay="true" :interval="3000" :duration="1000">
            <swiper-item>
                <view class="swiper-item">
                    <image src="/static/image/index/banner.jpg" mode="aspectFit"></image>
                </view>
            </swiper-item>
        </swiper>
        <view class="cells">
            <view class="cells_hd m_flex_middle m_flex_justify">
                <view class="title">房东直租</view>
                <view class="m_flex_middle">
                    <view class="addr_icon">
                        <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                    </view>
                    <view class="addr_box m_flex">
                        <picker :range="[]" @change="">
                            <view class="addr_picker m_flex_middle">
                                <view class="addr_item m_textover">广州市</view>
                                <view class="addr_pull">
                                    <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </picker>
                        <picker :range="[]" @change="">
                            <view class="addr_picker m_flex_middle">
                                <view class="addr_item m_textover">天河区</view>
                                <view class="addr_pull">
                                    <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </picker>
                        <picker :range="[]" @change="">
                            <view class="addr_picker last m_flex_middle">
                                <view class="addr_item m_textover">上社</view>
                                <view class="addr_pull">
                                    <image src="/static/image/index/pull.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </picker>
                    </view>
                </view>
            </view>
            <view class="cells_bd m_flex_justify">
                <view class="filter_title" @tap="showModal(1, '户型')">
                    <text class="title">户型</text>
                    <text class="bottom_icon"></text>
                </view>
                <view class="filter_title" @tap="showModal(2, '价格')">
                    <text class="title">价格</text>
                    <text class="bottom_icon"></text>
                </view>
                <view class="filter_title" @tap="showModal(3, '更多')">
                    <text class="title">更多</text>
                    <text class="bottom_icon"></text>
                </view>
            </view>
            <!-- <view class="cells_fd">
                <scroll-view class="scroll_view" :scroll-x="true">
                    <view class="m_flex">
                        <view class="category">
                            <view class="btn active">单间</view>
                            <view class="del_btn">
                                <image src="/static/image/index/del.png" mode="aspectFit"></image>
                            </view>
                        </view>
                    </view>
                </scroll-view>
            </view> -->
        </view>
        <house-list :list.sync="list"></house-list>
        <v-page ref="page" :list.sync="list"></v-page>
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal" v-if="modalList && modalList.length">
                    <view class="modal_list m_flex_wrap" v-for="(lis, i) in modalList" :key="i">
                        <view class="modal_item" v-for="(li, j) in lis" :key="j">
                            <view class="m_button main plain">{{ li.value || li }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import HouseList from "../components/house-list";
export default {
    components: {
        HouseList
    },
    data() {
        return {
            params: {},
            list: [],
            category: ["单间", "一房一厅", "两房一厅", "三房一厅"],
            price: [
                "500以下",
                "500-700",
                "700-900",
                "900-1200",
                "1200-1500",
                "1500以上"
            ],
            moreList: null,
            modalList: null
        };
    },
    onLoad(res) {
        console.log("onLoad");
    },
    onShow() {},
    onPullDownRefresh() {
        this.$refs.page.getData(1);
    },
    onReachBottom() {
        this.$refs.page.next();
    },
    onReady() {
        this.init();
        this.getData();
    },
    methods: {
        init() {
            const self = this;
            this.$refs.page.init({
                url: "getHouseList",
                params: self.params,
                fn: null
            });
        },
        getData() {
            this.$request.getConfig().then(res => {
                if (res.data) {
                    this.moreList = [];
                    this.moreList[0] = res.data.filter(
                        item => item.type === "config_lightspot"
                    );
                    this.moreList[1] = res.data.filter(
                        item => item.type === "config_base"
                    );
                }
            });
        },
        showModal(type, title) {
            const self = this;
            if (type === 1) {
                this.modalList = [this.category];
            } else if (type === 2) {
                this.modalList = [this.price];
            } else if (type === 3) {
                this.modalList = this.moreList;
            }
            this.$refs.modal.show({
                title,
                confirmText: "确定",
                success() {
                    self.init();
                }
            });
        }
    }
};
</script>

<style lang="scss">
.swiper {
    height: 398upx;
    padding: 0 30upx;
    &-item {
        image {
            width: 690upx;
            height: 398upx;
        }
    }
}
.cells {
    &_hd {
        height: 80upx;
        line-height: 80upx;
        padding: 0 30upx;
        background-color: #fff;
        font-size: 25upx;
        color: $text-color-inverse;
        .title {
            font-size: 33upx;
            color: $main-color;
        }
        .addr {
            &_icon {
                width: 24upx;
                height: 31upx;
            }
            &_box {
                margin-left: 10upx;
            }
            &_picker {
                position: relative;
                padding: 0 20upx;
                &.last {
                    padding-right: 0;
                    &::after {
                        border-right: none;
                    }
                }
                &::after {
                    content: " ";
                    position: absolute;
                    top: 50%;
                    right: 0;
                    width: 0;
                    height: 12upx;
                    border-right: 2upx solid $border-color;
                    transform: translateY(-50%);
                }
            }
            &_item {
                width: 80upx;
                min-width: 40upx;
            }
            &_pull {
                width: 16upx;
                height: 10upx;
            }
        }
    }
    &_bd {
        height: 80upx;
        margin-top: 18upx;
        padding: 0 30upx;
        line-height: 80upx;
        background-color: #fff;

        .filter_title {
            padding: 0 16upx;
        }

        .title {
            padding: 0 12upx;
        }
    }
}
.scroll_view {
    padding: 0 30upx;
    line-height: 1;
    .category {
        position: relative;
        width: 200upx;
        height: 56upx;
        margin-right: 8upx;
        padding: 22upx 22upx 22upx 0;
    }
    .btn {
        width: 200upx;
        height: 56upx;
        line-height: 56upx;
        border-radius: 4upx;
        background-color: #fff;
        text-align: center;
        font-size: 25upx;
        color: $main-color;
    }
    .active {
        background-color: $main-color;
        color: #fff;
    }
    .del_btn {
        position: absolute;
        top: 0;
        right: 0;
        width: 24upx;
        height: 24upx;
        padding: 10upx;
    }
}
.modal {
    &_item {
        margin-top: 15upx;
        margin-right: 30upx;
        margin-bottom: 15upx;
    }
    .m_button {
        min-width: 120upx;
        height: 56upx;
        line-height: 54upx;
        padding: 0 14upx;
        border-radius: 4upx;
    }
}
</style>
