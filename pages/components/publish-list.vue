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
                            <!-- <view class="intro_cell price m_textover">{{ li.rental }}元/月</view> -->
                        </view>
                        <view class="intro_cell price">{{ li.rental }}/月</view>
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
                        <button class="m_button plain btn" @tap.stop="refrs(li)">刷新</button>
                    </block>
                    <button class="m_button plain btn" @tap.stop="edit(li)">编辑</button>
                    <block v-if="li.is_rented === 2">
                        <button class="m_button plain btn" @tap.stop="rented(li)">下架</button>
                        <button class="m_button primary btn" @tap.stop="getQRCode(li)">生成海报</button>
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
        ...mapActions(['checkAuth']),
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
        handleReload() {
            this.$emit('reload')
            uni.showToast({
                title: '操作成功',
                icon: 'success',
            })
            let reloadPage = [...this.$store.state.reloadPage]
            reloadPage.push(...['/pages/index/index', '/pages/me/publish'])
            this.$store.commit('setVal', { key: 'reloadPage', val: reloadPage })
        },
        rented(li) {
            this.$refs.modal.show({
                confirmText: '确定',
                success: () => {
                    if (this.rent_type) {
                        this.$request
                            .rent({
                                id: li.id,
                                rent_type: this.rent_type,
                            })
                            .then(res => {
                                this.handleReload()
                            })
                    }
                },
            })
        },
        refrs(li) {
            if (!li.id) return
            this.checkAuth(true).then(res => {
                if (!res) return 
                this.$request
                    .public({
                        id: li.id,
                        is_public: 1,
                        is_rented: 2,
                        type: 'refresh',
                    })
                    .then(res => {
                        this.handleReload()
                    })
            }, e => {
                uni.showToast({
                    title: '服务结束，请联系客服续约',
                    icon: 'none',
                })
            })
        },
        pblc(li) {
            this.checkAuth(true).then(res => {
                if (!res) return 
                this.$request
                    .public({
                        id: li.id,
                        is_public: 1,
                        is_rented: 2,
                    })
                    .then(res => {
                        this.handleReload()
                    })
            }, e => {
                uni.showToast({
                    title: '服务结束，请联系客服续约',
                    icon: 'none',
                })
            })
        },
        del(li) {
            this.$request
                .del({
                    id: li.id,
                })
                .then(res => {
                    this.handleReload()
                })
        },
    },
}
</script>

<style lang="scss" scoped>
.item {
    position: relative;
    margin-bottom: 18rpx;
    padding: 30rpx 30rpx 0;
    background-color: #fff;
    overflow: hidden;
}
.bd {
    padding-bottom: 20rpx;
    border-bottom: 1rpx solid $border-color;
    .img {
        position: relative;
        width: 277rpx;
        height: 180rpx;
    }
    .has_video::before {
        content: '有视频';
        position: absolute;
        top: 0;
        left: 0;
        padding: 6rpx 12rpx;
        background-color: $primary-color;
        border-radius: 4rpx 0 8rpx 0;
        line-height: 24rpx;
        font-size: 22rpx;
        color: #fff;
        z-index: 1;
    }
    .rent {
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        height: 41rpx;
        padding-left: 40rpx;
        line-height: 41rpx;
        background-color: rgba(0, 0, 0, 0.3);
        color: $primary-color;
    }
    .intro {
        margin-left: 30rpx;
        line-height: 34rpx;
        font-size: 26rpx;
        color: #666;

        // &_cell {
        //     line-height: 1.2;
        //     padding: 6rpx 0;
        // }
    }
    .name {
        // max-width: 160rpx;
        line-height: 40rpx;
        font-weight: bold;
        font-size: 32rpx;
        color: #333;
    }
    .price {
        // max-width: 160rpx;
        margin-top: 10rpx;
        line-height: 38rpx;
        font-size: 30rpx;
        color: $primary-color;
    }
    .addr {
        display: -webkit-box;
        height: 68rpx;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
        word-break: break-all;
        overflow: hidden;
        margin-top: 10rpx;
        margin-bottom: 14rpx;
        // image {
        //     width: 21rpx;
        //     height: 31rpx;
        //     padding-right: 6rpx;
        // }
    }
}
.fd {
    padding: 20rpx 0 30rpx;
    .btn {
        min-width: 97rpx;
        margin-left: 20rpx;
        border-radius: 4rpx;
        &.plain::after {
            border: 1px solid $text-color-inverse;
        }
    }
}
.modal {
    padding: 0 1.6em 0.8em;
    font-size: 30rpx;
    radio {
        margin-right: 10rpx;
        vertical-align: top;
    }
}
</style>
