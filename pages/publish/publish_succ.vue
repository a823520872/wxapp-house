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
    font-size: 33upx;
    .icon {
        width: 198upx;
        height: 198upx;
        margin: 132upx auto 26upx;
    }
}
.bd {
    position: relative;
    width: 450upx;
    margin: 140upx auto 0;
    line-height: 40upx;
    font-size: 30upx;
    &::before {
        content: " ";
        position: absolute;
        top: 0;
        left: 0;
        margin-top: 16upx;
        margin-left: -25upx;
        width: 13upx;
        height: 13upx;
        border-radius: 50%;
        background-color: $text-color-inverse;
    }
}
.fd {
    margin: 107upx 30upx;
    text-align: center;
    // border-radius: 8upx;
    // color: #fff;

    .m_button {
        display: block;
        // height: 100upx;
        margin-bottom: 30upx;
        border-radius: 8upx;
        line-height: 80upx;
        font-size: 30upx;
    }
}
.none {
    display: none;
}
</style>
