<template>
    <view class="content content_bg_ff">
        <view class="hd">
            <view class="icon">
                <image src="/static/image/publish/success.png" mode="aspectFit"></image>
            </view>
            <view>发布成功</view>
        </view>
        <view class="bd">
            生成定制海报，分享到朋友圈， 可大大增加租房率哦~
        </view>
        <view class="fd">
            <button class="m_button primary" @tap="showPoster">生成定制海报</button>
            <button class="m_button plain primary" @tap="goPage('/pages/me/publish')">查看我的发布</button>
        </view>
        <poster ref="poster" :uri="uri"></poster>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from "vuex";
import poster from "../components/poster.vue";
import Canvas from "../../common/canvas.js";
import getPosition from "../../common/position.js";
export default {
    computed: {
        ...mapState(["userInfo", "houseImg"])
    },
    components: {
        poster
    },
    data() {
        return {
            id: "",
            uri: "",
            show: false
        };
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id;
        }
    },
    onReady() {
        this.login().then(code => {
            this.getDetail();
            this.getInfo();
        });
    },
    methods: {
        ...mapActions(["login", "getInfo"]),
        getDetail() {
            this.$request
                .getQRCode({
                    house_id: this.id
                })
                .then(res => {
                    uni.hideLoading();
                    if (res && res.data) {
                        this.uri = res.data;
                        this.show && this.showPoster();
                    }
                });
        },
        showPoster() {
            if (this.uri) {
                this.$refs.poster.show();
                this.show = false;
            } else {
                this.show = true;
                // this.getDetail();
                uni.showLoading({
                    title: "图片正在生成",
                    mask: true
                });
            }
        }
    }
};
</script>

<style lang="scss" scoped>
.hd {
    text-align: center;
    font-size: 33rpx;
    .icon {
        width: 198rpx;
        height: 198rpx;
        margin: 132rpx auto 26rpx;
    }
}
.bd {
    position: relative;
    width: 450rpx;
    margin: 140rpx auto 0;
    line-height: 40rpx;
    font-size: 30rpx;
    &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 16rpx;
        margin-left: -25rpx;
        width: 13rpx;
        height: 13rpx;
        border-radius: 50%;
        background-color: $text-color-inverse;
    }
}
.fd {
    margin: 107rpx 30rpx;
    text-align: center;
    // border-radius: 8rpx;
    // color: #fff;

    .m_button {
        display: block;
        // height: 100rpx;
        margin-bottom: 30rpx;
        border-radius: 8rpx;
        line-height: 80rpx;
        font-size: 30rpx;
    }
}
.none {
    display: none;
}
</style>
