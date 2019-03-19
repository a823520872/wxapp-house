<template>
    <view>
        <view class="list">
            <view class="item" v-for="(li, i) in list" :key="i" @tap="goPage(`/pages/index/house?id=${li.id}`)">
                <view class="bd m_flex">
                    <view class="img">
                        <image src="/static/image/index/banner.jpg" mode="aspectFill"></image>
                        <view v-if="li.is_rented === 1" class="rent m_textover">租金：¥{{li.rental}}/月</view>
                    </view>
                    <view class="intro m_flex_item">
                        <view class="intro_cell name">{{li.house_type}}</view>
                        <view v-if="li.is_public === 1" class="intro_cell price">¥{{li.rental}}/月</view>
                        <view class="intro_cell addr">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                            <text>{{li.address_street + li.address_flag + li.address_detail + li.road_distance}}</text>
                        </view>
                        <view v-if="li.is_rented === 1" class="intro_cell addr">
                            <image src="/static/image/index/addr.png" mode="aspectFit"></image>
                            <text>{{li.floor_number}}楼</text>
                        </view>
                    </view>
                </view>
                <view class="fd m_flex_right">
                    <button class="m_button plain" @tap.stop="edit(li)">编辑</button>
                    <block v-if="li.is_rented === 2">
                        <button class="m_button plain" @tap.stop="rented(li)">已租</button>
                        <button class="m_button primary" @tap.stop="getQRCode(li)">生产海报</button>
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
                                <radio :checked="rent_type === 1" />村长带给您的人</label>
                        </view>
                        <view class="link m_flex_justify">
                            <label @tap="rent_type = 2">
                                <radio :checked="rent_type === 2" />您自己租的</label>
                        </view>
                    </radio-group>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapActions } from "vuex";
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
        edit(li) {
            this.goPage(`/pages/publish/house?id=${li.id}`);
        },
        getQRCode(li) {
            const self = this;
            this.$request
                .getQRCode({
                    house_id: li.id
                })
                .then(res => {
                    if (res && res.data) {
                        this.uri = res.data;
                        uni.downloadFile({
                            url: self.uri,
                            success(res) {
                                if (res.statusCode === 200) {
                                    uni.saveImageToPhotosAlbum({
                                        filePath: res.tempFilePath,
                                        success(r) {
                                            if (
                                                r.errMsg ===
                                                "saveImageToPhotosAlbum:ok"
                                            ) {
                                                uni.showToast({
                                                    title: "保存成功",
                                                    icon: "success"
                                                });
                                            }
                                        }
                                    });
                                }
                            }
                        });
                    }
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
                                    uni.showToast({
                                        title: "操作成功",
                                        icon: "success"
                                    });
                                    self.$emit("reload");
                                }
                            });
                    }
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
                        uni.showToast({
                            title: "操作成功",
                            icon: "success"
                        });
                        this.$emit("reload");
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
