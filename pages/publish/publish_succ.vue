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
        <poster ref="poster"></poster>
        <canvas class="cvs_avatar" canvas-id="myAvatar"></canvas>
        <canvas class="cvs" canvas-id="myCanvas"></canvas>
    </view>
</template>

<script>
import { mapState } from 'vuex';
import poster from '../components/poster.vue'
export default {
    computed: {
        ...mapState(["userInfo"])
    },
    components: {
        poster
    },
    onReady() {
        this.createCanvas()
    },
    methods: {
        getAvatar() {
            return new Promise((resolve, reject) => {
                const ctx = uni.createCanvasContext('myAvatar')
                ctx.arc(40, 40, 40, 0, Math.PI * 2, false)
                ctx.clip()
                ctx.drawImage(this.userInfo.avatarUrl, 0, 0, 80, 80)
                ctx.draw(true, () => {
                    uni.canvasToTempFilePath({
                        canvasId: 'myAvatar',
                        success(res) {
                            resolve(res.tempFilePath)
                        },
                        fail: reject
                    })
                })
            })
        },
        async createCanvas() {
            const tempFile = await this.getAvatar()
            console.log(tempFile);
            const ctx = uni.createCanvasContext('myCanvas')
            ctx.drawImage('/static/image/publish/poster.png', 0, 0, 534, 948)
            ctx.drawImage(tempFile, 40, 16, 80, 80)
            ctx.draw(true, () => {

            })
        },
        showPoster() {
            this.$refs.poster.show()
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

.cvs {
    position: absolute;
    top: 0;
    left: 0;
    width: 534px;
    height: 948px;
}
.cvs_avatar {
    position: absolute;
    position: absolute;
    top: 0;
    left: 0;
    width: 80px;
    height: 80px;
}
</style>
