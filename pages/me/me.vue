<template>
    <view class="content">
        <view class="hd">
            <view class="m_flex_middle" @tap="getAuth">
                <view class="avatar"><image v-if="userInfo" :src="userInfo.avatarUrl" mode="aspectFit"></image></view>
                <block>
                    <view v-if="userInfo" class="name">{{ userInfo.nickName }}</view>
                    <view v-else>
                        <button class="no_auth" type="primary" plain open-type="getUserInfo" @getuserinfo="getUserInfo">
                            点击授权
                        </button>
                    </view>
                </block>
            </view>
        </view>
        <view class="bd">
            <view class="cell m_flex" @tap="goPage('/pages/me/collection')"><view class="title">我的收藏</view></view>
            <view class="cell m_flex" @tap="goPage('/pages/me/publish')"><view class="title">我的发布</view></view>
            <view class="cell m_flex" @tap="goPage('/pages/me/invitation')"><view class="title">推荐好友</view></view>
        </view>
        <v-auth ref="auth"></v-auth>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import VAuth from '../../components/auth.vue';
export default {
    components: {
        VAuth
    },
    computed: {
        ...mapState(['userInfo'])
    },
    data() {
        return {};
    },
    onReady() {
        if (!this.userInfo) {
            this.getUserInfo();
        }
    },
    methods: {
        ...mapActions(['goPage']),
        getUserInfo(e) {
            this.$refs.auth.getUserInfo(e);
        }
    }
};
</script>

<style lang="scss" scoped>
.hd {
    padding: 30upx 24upx;
    background-color: $uni-color-success;
    font-size: 28upx;
    color: $uni-text-color-inverse;

    .avatar {
        position: relative;
        width: 160upx;
        height: 160upx;
        margin-right: 24upx;
        border-radius: $uni-border-radius-circle;
        background-color: $uni-bg-color;
        overflow: hidden;
        box-shadow: 4upx 4upx 10upx $uni-border-color, -4upx -4upx 10upx $uni-border-color;

        image {
            width: 100%;
            height: 100%;
        }
    }

    .no_auth {
        border: none;
        font-size: 32upx;
        color: $uni-text-color-inverse;
    }
}

.bd {
    margin-top: 20upx;
    background-color: $uni-bg-color;

    .cell {
        height: 88upx;
        padding: 0 24upx;
        line-height: 88upx;
        font-size: 32upx;
        border-bottom: 1upx solid $uni-border-color;
        color: $uni-text-color;
    }
}
</style>
