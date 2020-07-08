<template>
    <view class="content">
        <view class="tips" v-if="!l_user_id">
            <template v-if="tab === 1">
                <view>温馨提示：已经租掉的房源请及时下架，以免住户看到房源后来电骚扰</view>
            </template>
            <template v-else-if="tab === 2">
                <view>编辑：点击编辑可重新修改房源信息；</view>
                <view>发布：点击发布，房源再次发布；</view>
            </template>
        </view>
        <view class="hd" v-if="!l_user_id && userInfo">
            <view class="avatar">
                <image class="img_avatar" :src="userInfo.avatar" mode="aspectFit"></image>
                <view class="avatar_auth" v-if="userInfo.is_auth && userInfo.is_auth === 1">
                    <image class="img_auth" src="/static/image/index/auth.png"></image>
                </view>
            </view>
            <view class="name">{{ userInfo.nickname }}</view>
        </view>
        <view class="hd" v-else-if="user_info">
            <view class="avatar">
                <image class="img_avatar" :src="user_info.avatar" mode="aspectFit"></image>
                <view class="avatar_auth" v-if="user_info.is_auth && user_info.is_auth === 1">
                    <image class="img_auth" src="/static/image/index/auth.png"></image>
                </view>
            </view>
            <view class="name">{{ user_info.nickname }}</view>
        </view>
        <view class="tabs m_flex" v-if="!l_user_id && user_info">
            <view class="m_flex_item">
                <view :class="{ tab: true, active: tab === 1 }" @tap="chooseTab(1)">发布中({{ user_info.public_num || 0 }})</view>
            </view>
            <view class="m_flex_item">
                <view :class="{ tab: true, active: tab === 2 }" @tap="chooseTab(2)">未发布({{ user_info.rented_num || 0 }})</view>
            </view>
        </view>
        <publish-list :list.sync="list" @reload="getData"></publish-list>
        <v-page ref="page" :list.sync="list"></v-page>
        <v-auth ref="auth"></v-auth>
    </view>
</template>

<script>
import { mapState, mapMutations } from 'vuex'
import authImg from '../components/auth-img'
import publishList from '../components/publish-list.vue'
import Defer from '../../common/defer.js'
export default {
    onShareAppMessage() {
        return {
            title: '房源列表',
            path: `/pages/index/index?p=` + encodeURIComponent(`/pages/me/publish/?user_id=${this.l_user_id}`),
        }
    },
    components: {
        authImg,
        publishList,
    },
    computed: {
        ...mapState(['userInfo']),
    },
    data() {
        return {
            tab: 1,
            list: [],
            user_id: '',
            user_info: null,
            l_user_id: '',
            // defer: new Defer(),
        }
    },
    onLoad(res) {
        console.log(res)
        if (res.scene) {
            const scene = decodeURIComponent(res.scene)
            if (scene && scene.indexOf('user_id=') > -1) {
                this.l_user_id = scene.replace('user_id=', '')
                console.log(this.l_user_id)
                uni.setNavigationBarTitle({
                    title: '房源列表',
                })
            }
        } else if (res.user_id) {
            this.l_user_id = res.user_id
            uni.setNavigationBarTitle({
                title: '房源列表',
            })
        }
    },
    onShow() {
        let reloadPage = [...this.$store.state.reloadPage]
        if (reloadPage.length) {
            let i = reloadPage.findIndex(v => v === '/pages/me/publish')
            if (i === -1) return
            reloadPage.splice(i, 1)
            this.$store.commit('setVal', { key: 'reloadPage', val: reloadPage })
            this.getId().then(() => {
                this.getData()
            })
        }
    },
    onReady() {
        this.getId().then(() => {
            this.getData()
        })
    },
    onPullDownRefresh() {
        this.$refs.page.getData(1)
    },
    onReachBottom() {
        this.$refs.page.next()
    },
    methods: {
        getId() {
            return new Promise((resolve, reject) => {
                if (this.l_user_id) return resolve()
                this.$store.dispatch('getInfo', true).finally(() => {
                    if (this.userInfo && this.userInfo.is_landlord && this.userInfo.is_landlord === 1) {
                        this.user_id = this.userInfo.user_id
                        resolve()
                    } else {
                        uni.showToast({
                            title: '页面错误',
                            icon: 'none',
                        })
                        reject()
                    }
                })
            })
        },
        getData(n) {
            const self = this
            const params = {
                user_id: this.l_user_id || this.user_id,
            }
            console.log(params);
            if (this.tab === 1) {
                params.is_public = 1
            } else if (this.tab === 2) {
                params.is_rented = 1
            }
            this.$refs.page &&
                this.$refs.page
                    .init({
                        url: 'getUserHouse',
                        params,
                        n,
                        fn(data) {
                            return (data || []).map(item => ((item.images = item.image_urls && item.image_urls.split(',')), item))
                        },
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
        },
    },
}
</script>

<style lang="scss" scoped>
.tips {
    padding: 10upx 30upx;
    background-color: #f0fffc;
    line-height: 34upx;
    font-size: 26upx;
    color: #0e868f;
}
.hd {
    // height: 358upx;
    padding: 60upx 0 30upx;
    background-color: $main-color;
    text-align: center;
    overflow: hidden;
    .avatar {
        position: relative;
        width: 130upx;
        height: 130upx;
        margin: 0 auto;
    }
    .img_avatar {
        position: relative;
        width: 126upx;
        height: 126upx;
        border-radius: 50%;
        // background-color: $uni-bg-color;
        overflow: hidden;
        border: 2upx solid #fff;
    }
    .avatar_auth {
        position: absolute;
        bottom: 0;
        right: 0;
        padding: 3upx;
        background-color: $primary-color;
        line-height: 1;
        border-radius: 50%;
        overflow: hidden;
    }

    .img_auth {
        width: 26upx;
        height: 26upx;
    }

    .name {
        margin-top: 38upx;
        font-size: 34upx;
        color: #033a42;
    }
    // .tips {
    //     margin-top: 6upx;
    //     color: $primary-color;
    // }
}
.tabs {
    position: relative;
    background-color: #fff;
    text-align: center;
    border-bottom: 1upx solid $border-color;

    // &::after {
    //     content: ' ';
    //     position: absolute;
    //     right: 0;
    //     bottom: 0;
    //     left: 0;
    //     width: 100%;
    //     height: 0;
    //     z-index: 1;
    // }
    .tab {
        position: relative;
        padding: 30upx 0;
        line-height: 40upx;
        font-size: 34upx;
        color: #666;
    }
    .active {
        color: $text-color;
        &::after {
            content: ' ';
            position: absolute;
            // right: 0;
            bottom: 0;
            left: 50%;
            width: 100upx;
            height: 0;
            border-bottom: 8upx solid $main-color;
            z-index: 10;
            transform: translateX(-50%);
            border-radius: 4upx;
        }
    }
}
</style>
