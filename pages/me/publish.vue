<template>
    <view class="content">
        <view class="hd" v-if="user_info">
            <view class="avatar">
                <image :src="user_info.avatar" mode="aspectFit"></image>
            </view>
            <view class="name">{{user_info.nickname}}</view>
            <view class="tips" v-if="(user_info.public_num || user_info.rented_num) && !landlord_id">发布中:{{user_info.public_num}}套&nbsp;&nbsp;&nbsp;&nbsp;未发布:{{user_info.rented_num}}套</view>
        </view>
        <view class="tabs m_flex" v-if="!landlord_id">
            <view class="m_flex_item">
                <view :class="{'tab': true, 'active' : tab === 2}" @tap="chooseTab(2)">发布中</view>
            </view>
            <view class="m_flex_item">
                <view :class="{'tab': true, 'active' : tab === 1}" @tap="chooseTab(1)">未发布</view>
            </view>
        </view>
        <!-- <view v-else class="fix_right_icon" @tap="goPage(`/pages/index/webview?src=${config.gss}`)">
            <image src="/static/image/me/gss.png" mode="aspectFill"></image>
        </view> -->
        <publish-list :list.sync="list" @reload="getData"></publish-list>
        <v-page ref="page" :list.sync="list"></v-page>
    </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import publishList from '../components/publish-list.vue'
export default {
    components: {
        publishList
    },
    computed: {
        ...mapState(['userInfo', 'collectReload'])
    },
    data() {
        return {
            tab: 2,
            list: [],
            user_id: '',
            user_info: null,
            landlord_id: ''
        }
    },
    onLoad(res) {
        if (res.user_id) {
            this.landlord_id = res.user_id
            uni.setNavigationBarTitle({
                title: '房源列表'
            })
        } else if (this.userInfo && this.userInfo.is_landlord === 1) {
            this.user_id = this.userInfo.user_id
        } else {
            uni.showToast({
                title: '页面错误',
                icon: 'none'
            })
        }
    },
    onShow() {
        if (this.collectReload) {
            this.setCollectReload(false)
            this.getData()
        }
    },
    onReady() {
        this.getData()
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    methods: {
        ...mapMutations(['setCollectReload']),
        getData() {
            const self = this
            const params = {
                user_id: this.landlord_id || this.user_id
            }
            if (this.tab === 2) {
                params.is_public = 1
            } else if (this.tab === 1) {
                params.is_rented = 1
            }
            this.$refs.page &&
                this.$refs.page
                    .init({
                        url: 'getUserHouse',
                        params,
                        fn(data) {
                            return (data || []).map(
                                item => (
                                    (item.images =
                                        item.image_urls &&
                                        item.image_urls.split(',')),
                                    item
                                )
                            )
                        }
                    })
                    .then(res => {
                        if (res && res.data) {
                            this.user_info = res.data.user_info
                        }
                    })
        },
        chooseTab(v) {
            this.tab = v
            this.getData()
        }
    }
}
</script>

<style lang="scss" scoped>
.hd {
    height: 347upx;
    background-color: $main-color;
    text-align: center;
    overflow: hidden;
    .avatar {
        position: relative;
        width: 131upx;
        height: 131upx;
        margin: 82upx auto 0;
        border-radius: 50%;
        background-color: $uni-bg-color;
        overflow: hidden;
        border: 2upx solid #fff;
    }
    .name {
        margin-top: 16upx;
        font-size: 33upx;
    }
    .tips {
        margin-top: 6upx;
        color: $primary-color;
    }
}
.tabs {
    position: relative;
    padding: 0 30upx;
    background-color: #fff;
    line-height: 100upx;
    text-align: center;
    font-size: 33upx;

    &::after {
        content: ' ';
        position: absolute;
        right: 0;
        bottom: 0;
        left: 0;
        width: 100%;
        height: 0;
        border-bottom: 1upx solid $border-color;
        z-index: 1;
    }
    .tab {
        position: relative;
        color: $text-color-inverse;
    }
    .active {
        color: $text-color;
        &::after {
            content: ' ';
            position: absolute;
            right: 0;
            bottom: 0;
            left: 0;
            width: 100%;
            height: 0;
            border-bottom: 2upx solid $main-color;
            z-index: 10;
        }
    }
}
.fix_right_icon {
    position: fixed;
    right: 40upx;
    bottom: 200upx;
    width: 160upx;
    height: 160upx;
    border-radius: 50%;
    overflow: hidden;
}
</style>
