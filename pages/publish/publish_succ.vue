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
        <view class="fd" @tap="showPoster">生成定制海报</view>
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
            uri: ""
        };
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id;
        }
    },
    onReady() {
        this.login().then(code => {
            if (code) {
                this.getInfo().then(res => {
                    this.getDetail();
                });
            }
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
                    }
                });
        },
        showPoster() {
            if (this.uri) {
                this.$refs.poster.show();
            } else {
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
    height: 100upx;
    margin: 107upx 30upx;
    line-height: 100upx;
    background-color: $primary-color;
    text-align: center;
    font-size: 33upx;
    border-radius: 8upx;
    color: #fff;
}
.none {
    display: none;
}
</style>
