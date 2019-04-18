<template>
    <view>
        <view class="list">
            <view class="item" v-for="(li, i) in list" :key="i" @tap="goPage(`/pages/index/house?id=${li.id}`)">
                <view class="bd m_flex">
                    <view class="img">
                        <image :src="li.images && li.images[0]" :mode="config.house_mode"></image>
                        <!-- <view v-if="li.is_rented === 1" class="rent m_textover">租金：¥{{li.rental}}/月</view> -->
                    </view>
                    <view class="intro m_flex_item">
                        <view class="intro_cell name">{{li.address_street}} · {{li.house_type}}</view>
                        <view class="intro_cell price">¥{{li.rental}}/月</view>
                        <!-- <view v-if="li.is_public === 1" class="intro_cell price">¥{{li.rental}}/月</view> -->
                        <view class="intro_cell addr m_textover">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                            <text v-if="li.address_street">{{li.address_street}}</text>
                            <text v-if="li.address_flag">{{li.address_flag}}</text>
                            <text v-if="li.address_detail">{{li.address_detail}}</text>
                            <text v-if="li.road_distance">{{li.road_distance}}</text>
                        </view>
                        <view class="intro_cell addr">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                            <text>{{li.floor_number}}楼</text>
                        </view>
                    </view>
                </view>
                <view class="fd m_flex_right" v-if="userInfo && userInfo.user_id === li.user_id">
                    <button class="m_button plain" @tap.stop="edit(li)">编辑</button>
                    <block v-if="li.is_rented === 2">
                        <button class="m_button primary" @tap.stop="rented(li)">已租</button>
                        <button class="m_button plain" @tap.stop="refresh(li)">刷新</button>
                        <button class="m_button primary" @tap.stop="getQRCode(li)">生成海报</button>
                    </block>
                    <block v-if="li.is_public === 2">
                        <button class="m_button primary" @tap.stop="public(li)">发布</button>
                    </block>
                </view>
            </view>
        </view>
        <poster ref="poster" :uri="uri"></poster>
        <v-modal ref="modal">
            <view slot="content">
                <view class="modal">
                    <radio-group>
                        <view class="link m_flex_justify">
                            <label @tap="rent_type = 1">
                                <radio :checked="rent_type === 1" />住户来自平台</label>
                        </view>
                        <view class="link m_flex_justify">
                            <label @tap="rent_type = 2">
                                <radio :checked="rent_type === 2" />住户来自您</label>
                        </view>
                    </radio-group>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import poster from "../components/poster.vue";
export default {
    props: {
        list: {
            type: Array,
            default() {
                return [];
            }
        }
    },
    computed: {
        ...mapState(["userInfo"])
    },
    components: {
        poster
    },
    data() {
        return {
            uri: "",
            rent_type: ""
        };
    },
    methods: {
        ...mapMutations(["setHomeReload"]),
        edit(li) {
            this.goPage(`/pages/publish/house?id=${li.id}`);
        },
        getQRCode(li) {
            const self = this;
            uni.showLoading({
                title: "图片正在生成",
                mask: true
            });
            this.$request
                .getQRCode({
                    house_id: li.id
                })
                .then(res => {
                    uni.hideLoading();
                    if (res && res.data) {
                        this.uri = res.data;
                        this.$refs.poster.show();
                    }
                })
                .catch(e => {
                    uni.hideLoading();
                });
        },
        rented(li) {
            const self = this;
            this.$refs.modal.show({
                confirmText: "确定",
                success() {
                    if (self.rent_type) {
                        self.$request
                            .rent({
                                id: li.id,
                                rent_type: self.rent_type
                            })
                            .then(res => {
                                if (res && res.data) {
                                    self.$emit("reload");
                                    self.setHomeReload(true);
                                    uni.showToast({
                                        title: "操作成功",
                                        icon: "success"
                                    });
                                }
                            });
                    }
                }
            });
        },
        refresh(li) {
            this.$request
                .public({
                    id: li.id,
                    is_public: 1,
                    is_rented: 2,
                    type: "refresh"
                })
                .then(res => {
                    if (res && res.data) {
                        this.$emit("reload");
                        this.setHomeReload(true);
                        uni.showToast({
                            title: "操作成功",
                            icon: "success"
                        });
                    }
                });
        },
        public(li) {
            this.$request
                .public({
                    id: li.id,
                    is_public: 1,
                    is_rented: 2
                })
                .then(res => {
                    if (res && res.data) {
                        this.$emit("reload");
                        this.setHomeReload(true);
                        uni.showToast({
                            title: "操作成功",
                            icon: "success"
                        });
                    }
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
        // margin-top: 12upx;
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
