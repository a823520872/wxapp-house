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
        <view class="cvs_wrap">
            <canvas class="cvs_avatar" canvas-id="myAvatar"></canvas>
            <canvas class="cvs" canvas-id="myCanvas"></canvas>
        </view>
        <image v-if="img.list.length" class="none" :src="img.list[img.index].url" @load="getImageInfo"></image>
    </view>
</template>

<script>
import { mapState } from "vuex";
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
            img: {
                list: [],
                index: 0
            },
            qrcode: ""
        };
    },
    onLoad(res) {
        if (res.id) {
            this.id = res.id;
        }
    },
    onReady() {
        this.$request.login().then(code => {
            if (code) {
                this.$request.getUserInfo().then(res => {
                    this.getQRCode();
                });
                this.getDetail();
            }
        });
    },
    methods: {
        getDetail() {
            this.$request.getHouse({ id: this.id }).then(res => {
                if (res && res.data) {
                    this.img.list = res.data.image_urls
                        ? res.data.image_urls
                              .split(",")
                              .map(item => ({ url: item }))
                        : [];
                }
            });
        },
        getQRCode() {
            this.$request
                .getQRCode({
                    scene: encodeURIComponent(`houseresource_id=${this.id}`),
                    page: `/pages/index/house?id=${this.id}&rid=${
                        this.userInfo.id
                    }`,
                    width: "350"
                })
                .then(res => {
                    console.log(res);
                    this.qrcode = res.data;
                });
        },
        getAvatar() {
            const cvs = new Canvas("myAvatar");
            cvs.arc(40, 40, 40);
            cvs.drawImage(this.userInfo.avatar, 0, 0, 80, 80);
            return cvs.toFile(true);
        },
        createCanvas() {
            const self = this;
            this.img.list = getPosition(this.img.list);
            return this.getAvatar().then(tempFile => {
                const cvs = new Canvas("myCanvas");
                const max = Math.min(this.img.list.length, 5);
                cvs.ctx.setFillStyle("#e9f9f9");
                cvs.ctx.fillRect(0, 0, 534, 949);
                cvs.drawImage(
                    "/static/image/publish/poster.png",
                    0,
                    0,
                    534,
                    173
                );
                cvs.drawImage(tempFile, 40, 16, 80, 80);
                cvs.drawImage(this.qrcode, 220, 790, 95, 95);
                cvs.ctx.setFillStyle("#2b2b2b");
                cvs.ctx.setFontSize(25);
                cvs.ctx.setTextBaseline("top");
                cvs.ctx.fillText(this.userInfo.nickname, 135, 50);
                cvs.ctx.setTextAlign("center");
                cvs.ctx.fillText("识别二维码查看详细房源信息", 267, 893);

                for (let index = 0; index < max; index++) {
                    const item = this.img.list[index];
                    cvs.drawImage(
                        item.url,
                        item.sx,
                        item.sy,
                        item.sWidth,
                        item.sHeight,
                        item.dx,
                        item.dy,
                        item.dWidth,
                        item.dHeight
                    );
                }
                return cvs.toFile(true);
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
                const max = this.img.list.length - 1;
                if (this.img.list.length) {
                    if (this.img.list[max].width) {
                        this.createCanvas().then(path => {
                            this.uri = path;
                            uni.hideLoading();
                            this.showPoster();
                        });
                    }
                } else {
                    this.createCanvas().then(path => {
                        this.uri = path;
                        uni.hideLoading();
                        this.showPoster();
                    });
                }
            }
        },
        getImageInfo(e) {
            const max = this.img.list.length - 1;
            if (this.img.index < max + 1) {
                this.img.list[this.img.index].width = e.detail.width;
                this.img.list[this.img.index].height = e.detail.height;
                this.img.index < max && this.img.index++;
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

.cvs_wrap {
    position: absolute;
    top: 0;
    right: 0;
    bottom: 0;
    left: 0;
    overflow: hidden;
    z-index: -1;
}

.cvs {
    position: absolute;
    top: 0;
    left: 0;
    width: 534px;
    height: 948px;
}
.cvs_avatar {
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
}

.none {
    display: none;
}
</style>
