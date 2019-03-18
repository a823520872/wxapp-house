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
                        <!-- <picker :range="[]" @change="">
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
                        </picker> -->
                        <picker :range="address_street" @change="pickerChange" mode="multiSelector">
                            <view class="addr_picker last m_flex_middle">
                                <view class="addr_item m_textover">{{params.address_street}}</view>
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
            <view class="cells_fd">
                <scroll-view class="scroll_view" :scroll-x="true">
                    <view class="m_flex">
                        <template v-if="house_type_active">
                            <view class="house_type" v-for="(li, i) in house_type_active" :key="i">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn" @tap="li.active=false">
                                    <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="price_active">
                            <view class="house_type" v-for="(li, i) in price_active" :key="i">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn" @tap="li.active=false">
                                    <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="config_base_active">
                            <view class="house_type" v-for="(li, i) in config_base_active" :key="i">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn" @tap="li.active=false">
                                    <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                        <template v-if="config_lightspot_active">
                            <view class="house_type" v-for="(li, i) in config_lightspot_active" :key="i">
                                <view class="btn active">{{li.value}}</view>
                                <view class="del_btn" @tap="li.active=false">
                                    <image src="/static/image/index/del.png" mode="aspectFit"></image>
                                </view>
                            </view>
                        </template>
                    </view>
                </scroll-view>
            </view>
        </view>
        <view class="list">
            <house-list :list.sync="list"></house-list>
            <v-page ref="page" :list.sync="list"></v-page>
            <view class="official-account"></view>
            <official-account></official-account>
        </view>
        <v-auth ref="auth"></v-auth>
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal" v-if="modalList && modalList.length">
                    <view class="modal_list m_flex_wrap" v-for="(lis, i) in modalList" :key="i">
                        <view class="modal_item" v-for="(li, j) in lis" :key="j">
                            <view :class="['m_button', 'main', {'plain': !li.active}]" @tap="toggleList(i, j)">{{ li.value || li }}</view>
                        </view>
                    </view>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import HouseList from "../components/house-list";
export default {
    components: {
        HouseList
    },
    computed: {
        address_street() {
            return (
                this.config &&
                this.config.address_street &&
                this.config.address_street.map(lis => {
                    return lis.map(li => li.name);
                })
            );
        },
        house_type() {
            return (
                this.config &&
                this.config.house_type &&
                this.config.house_type.map(li => li.value)
            );
        },
        price() {
            return (
                this.config &&
                this.config.price &&
                this.config.price.map(li => li.value)
            );
        },
        house_type_active() {
            return (
                this.config &&
                this.config.house_type &&
                this.config.house_type.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li);
                    }
                    return arr;
                }, [])
            );
        },
        price_active() {
            return (
                this.config &&
                this.config.price &&
                this.config.price.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li);
                    }
                    return arr;
                }, [])
            );
        },
        config_base_active() {
            return (
                this.config &&
                this.config.config_base &&
                this.config.config_base.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li);
                    }
                    return arr;
                }, [])
            );
        },
        config_lightspot_active() {
            return (
                this.config &&
                this.config.config_lightspot &&
                this.config.config_lightspot.reduce((arr, li) => {
                    if (li.active) {
                        arr.push(li);
                    }
                    return arr;
                }, [])
            );
        }
    },
    data() {
        return {
            params: {
                address_street_id: "",
                address_street: "",
                // config_base_ids: "",
                config_base: "",
                // config_lightspot_ids: "",
                config_lightspot: "",
                rental_begin: "",
                rental_end: "",
                house_type: ""
            },
            list: [],
            config: {
                house_type: null,
                floor: null,
                price: [
                    {
                        rental_begin: 0,
                        rental_end: 500,
                        value: "500以下",
                        active: false
                    },
                    {
                        rental_begin: 500,
                        rental_end: 700,
                        value: "500-700",
                        active: false
                    },
                    {
                        rental_begin: 700,
                        rental_end: 900,
                        value: "700-900",
                        active: false
                    },
                    {
                        rental_begin: 900,
                        rental_end: 1200,
                        value: "900-1200",
                        active: false
                    },
                    {
                        rental_begin: 1500,
                        rental_end: "",
                        value: "1500以上",
                        active: false
                    }
                ],
                address_street: null,
                address_flag: null,
                config_base: null,
                config_lightspot: null
            },
            modalType: null,
            modalList: null
        };
    },
    onLoad(res) {},
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
    onShareAppMessage() {
        return {
            title: "村里租房",
            desc: "村里租房",
            path: "/pages/index/index"
        };
    },
    methods: {
        ...mapActions(["login", "getInfo"]),
        init() {
            const self = this;
            // address_street_id: "",
            // address_street: "上社",
            // config_base_ids: "",
            // config_base: "",
            // rental_begin: "",
            // rental_end: "",
            // house_type: ""
            const house_type = this.config.house_type
                ? this.config.house_type.filter(item => item.active)
                : [];
            this.params.house_type = house_type
                .map(item => item.value)
                .join(",");
            const config_base = this.config.config_base
                ? this.config.config_base.filter(item => item.active)
                : [];
            this.params.config_base = config_base
                .map(item => item.value)
                .join(",");
            this.params.config_base_ids = config_base
                .map(item => item.id)
                .join(",");
            const config_lightspot = this.config.config_lightspot
                ? this.config.config_lightspot.filter(item => item.active)
                : [];
            this.params.config_lightspot = config_lightspot
                .map(item => item.value)
                .join(",");
            this.params.config_lightspot_id = config_lightspot
                .map(item => item.id)
                .join(",");
            this.$refs.page.init({
                url: "getHouseList",
                params: self.params,
                fn(data) {
                    return data.map(
                        item => (
                            (item.config_base =
                                item.config_base &&
                                item.config_base.split(",")),
                            (item.config_lightspot =
                                item.config_lightspot &&
                                item.config_lightspot.split(",")),
                            (item.image_urls =
                                item.image_urls && item.image_urls.split(",")),
                            item
                        )
                    );
                }
            });
            const tk = uni.getStorageSync("tk");
            if (tk) {
                if (!this.userInfo) {
                    this.getInfo();
                }
            } else {
                this.login();
                this.$refs.auth.getUserInfo();
            }
        },
        getData() {
            this.$request.getConfig().then(res => {
                if (res.data) {
                    const config = res.data.reduce((obj, item) => {
                        if (!obj[item.type]) {
                            obj[item.type] = [];
                        }
                        item.active = false;
                        obj[item.type].push(item);
                        return obj;
                    }, {});
                    this.config = { ...this.config, ...config };
                }
            });
            this.$request.getAddrList().then(res => {
                if (res.data) {
                    const address_street = res.data || [];
                    this.config = {
                        ...this.config,
                        address_street
                    };
                }
            });
        },
        pickerChange(e) {
            this.params.address_street = this.config.address_street[2][
                e.detail.value[2]
            ].name;
            this.params.address_street_id = this.config.address_street[2][
                e.detail.value[2]
            ].id;
            this.init();
        },
        showModal(type, title) {
            const self = this;
            this.modalType = type;
            if (type === 1) {
                this.modalList = [this.config.house_type];
            } else if (type === 2) {
                this.modalList = [this.config.price];
            } else if (type === 3) {
                this.modalList = [
                    this.config.config_base,
                    this.config.config_lightspot
                ];
            }
            this.$refs.modal.show({
                title,
                confirmText: "确定",
                success() {
                    self.init();
                }
            });
        },
        toggleList(i, j) {
            let key = "";
            if (this.modalType === 1) {
                key = "house_type";
            } else if (this.modalType === 2) {
                key = "price";
            } else if (this.modalType === 3) {
                key = i === 0 ? "config_base" : "config_lightspot";
            }
            this.config[key][j].active = !this.config[key][j].active;
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
    .house_type {
        position: relative;
        width: 200upx;
        height: 56upx;
        margin-right: 8upx;
        padding: 22upx 22upx 0 0;
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
.list {
    margin-top: 22upx;
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
