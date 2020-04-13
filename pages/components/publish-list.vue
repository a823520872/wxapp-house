<template>
    <view>
        <view class="list">
            <view class="item" v-for="(li, i) in list" :key="i" @tap="goPage(`/pages/index/house?id=${li.id}`)">
                <view class="bd m_flex">
                    <view class="img" :class="{ has_video: li.video_urls }">
                        <image :src="li.images && li.images[0]" :mode="CONFIG.house_mode"></image>
                        <!-- <view v-if="li.is_rented === 1" class="rent m_textover">租金：¥{{li.rental}}/月</view> -->
                    </view>
                    <view class="intro m_flex_item">
                        <view class="m_flex_middle m_flex_justify">
                            <view class="intro_cell name m_textover">{{ li.address_street }} · {{ li.house_type }}</view>
                            <view class="intro_cell price m_textover">{{ li.rental }}元/月</view>
                        </view>
                        <!-- <view v-if="li.is_public === 1" class="intro_cell price">¥{{li.rental}}/月</view> -->
                        <view class="intro_cell addr">
                            <!-- <image src="/static/image/index/addr.png" mode="aspectFit"></image> -->
                            <text>地址：</text>
                            <text v-if="li.address_street">{{ li.address_street }}</text>
                            <text v-if="li.address_flag">{{ li.address_flag }}</text>
                            <text v-if="li.address_detail">{{ li.address_detail }}</text>
                            <text v-if="li.road_distance">{{ li.road_distance }}</text>
                        </view>
                        <view class="intro_cell">
                            <!-- <image src="/static/image/index/addr.png" mode="aspectFit"></image> -->
                            <text>楼层：</text>
                            <text>{{ li.floor_number }}楼</text>
                        </view>
                    </view>
                </view>
                <view class="fd m_flex_right" v-if="userInfo && userInfo.user_id === li.user_id">
                    <block v-if="li.is_public === 2">
                        <button class="m_button plain btn" @tap.stop="del(li)">删除</button>
                    </block>
                    <block v-if="li.is_rented === 2">
                        <button class="m_button plain btn" @tap.stop="refresh(li)">刷新</button>
                    </block>
                    <button class="m_button plain btn" @tap.stop="edit(li)">编辑</button>
                    <block v-if="li.is_rented === 2">
                        <button class="m_button plain btn" @tap.stop="rented(li)">下架</button>
                    </block>
                    <block v-if="li.is_public === 2">
                        <button class="m_button main btn" @tap.stop="pblc(li)">发布</button>
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
                            <label @tap="rent_type = 1"> <radio :checked="rent_type === 1" />住户来自平台</label>
                        </view>
                        <view class="link m_flex_justify">
                            <label @tap="rent_type = 2"> <radio :checked="rent_type === 2" />住户来自您</label>
                        </view>
                    </radio-group>
                </view>
            </view>
        </v-modal>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
import poster from '../components/poster.vue'
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
    },
    components: {
        poster,
    },
    data() {
        return {
            uri: '',
            rent_type: '',
        }
    },
    methods: {
        ...mapMutations(['setHomeReload']),
        edit(li) {
            this.goPage(`/pages/publish/house?id=${li.id}`)
        },
        getQRCode(li) {
            const self = this
            uni.showLoading({
                title: '图片正在生成',
                mask: true,
            })
            this.$request
                .getQRCode({
                    house_id: li.id,
                })
                .then(res => {
                    uni.hideLoading()
                    if (res && res.data) {
                        this.uri = res.data
                        this.$refs.poster.show()
                    }
                })
                .catch(e => {
                    uni.hideLoading()
                })
        },
        rented(li) {
            const self = this
            this.$refs.modal.show({
                confirmText: '确定',
                success() {
                    if (self.rent_type) {
                        self.$request
                            .rent({
                                id: li.id,
                                rent_type: self.rent_type,
                            })
                            .then(res => {
                                // if (res && res.data) {
                                self.$emit('reload')
                                self.setHomeReload(true)
                                uni.showToast({
                                    title: '操作成功',
                                    icon: 'success',
                                })
                                // }
                            })
                    }
                },
            })
        },
        refresh(li) {
            this.$request
                .public({
                    id: li.id,
                    is_public: 1,
                    is_rented: 2,
                    type: 'refresh',
                })
                .then(res => {
                    // if (res && res.data) {
                    this.$emit('reload')
                    this.setHomeReload(true)
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                    })
                    // }
                })
        },
        pblc(li) {
            this.$request
                .public({
                    id: li.id,
                    is_public: 1,
                    is_rented: 2,
                })
                .then(res => {
                    // if (res && res.data) {
                    this.$emit('reload')
                    this.setHomeReload(true)
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                    })
                    // }
                })
        },
        del(li) {
            this.$request
                .del({
                    id: li.id,
                })
                .then(res => {
                    this.$emit('reload')
                    this.setHomeReload(true)
                    uni.showToast({
                        title: '操作成功',
                        icon: 'success',
                    })
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.item {
    position: relative;
    margin-bottom: 18upx;
    padding: 30upx 30upx 0;
    background-color: #fff;
    overflow: hidden;
}
.bd {
    padding-bottom: 20upx;
    border-bottom: 1upx solid $border-color;
    .img {
        position: relative;
        width: 277upx;
        height: 180upx;
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
        margin-left: 30upx;
        line-height: 34upx;
        font-size: 26upx;
        color: #666;

        // &_cell {
        //     line-height: 1.2;
        //     padding: 6upx 0;
        // }
    }
    .name {
        max-width: 160upx;
        line-height: 40upx;
        font-weight: bold;
        font-size: 32upx;
        color: #333;
    }
    .price {
        max-width: 160upx;
        line-height: 38upx;
        font-size: 30upx;
        color: $primary-color;
    }
    .addr {
        display: -webkit-box;
        height: 68upx;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        margin-top: 10upx;
        margin-bottom: 14upx;
        // image {
        //     width: 21upx;
        //     height: 31upx;
        //     padding-right: 6upx;
        // }
    }
}
.fd {
    padding: 20upx 0 30upx;
    .btn {
        min-width: 97upx;
        margin-left: 20upx;
        border-radius: 4upx;
        &.plain::after {
            border: 1px solid $text-color-inverse;
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
