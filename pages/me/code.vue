<template>
    <view class="content">
        <view class="cells" v-if="userInfo">
            <view class="cell">
                <view class="cell_hd m_flex_middle">
                    <image class="avatar" :src="userInfo.avatar" mode="aspectFit"></image>
                    <text>{{ userInfo.nickname }}</text>
                </view>
                <view class="cell_bd">
                    <image class="qrcode" :src="qrcode" mode="aspectFit"></image>
                </view>
                <view class="cell_fd m_text_center">扫码可识别我的全部房源</view>
            </view>
        </view>
        <view class="btns">
            <button class="m_button main long btn" @tap="saveImg">保存我的二维码图片</button>
        </view>
    </view>
</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex'
export default {
    computed: {
        ...mapState(['userInfo', 'urlPrefix']),
        qrcode() {
            // return `${this.urlPrefix}/api/qrcode/build?text=/pages/me/publish`
            return `${this.urlPrefix}/api/qrcode/build?text=${encodeURIComponent('/pages/me/publish')}`
        },
    },
    methods: {
        saveImg() {
            this.getImageInfo(this.qrcode).then(
                path => {
                    uni.saveImageToPhotosAlbum({
                        filePath: path,
                        success: res => {
                            console.log(res)
                        },
                    })
                },
                e => {
                    uni.showToast({
                        icon: 'none',
                        title: '获取图片失败',
                    })
                }
            )
        },
        getImageInfo(uri) {
            return new Promise((resolve, reject) => {
                uni.getImageInfo({
                    src: uri,
                    success: res => {
                        console.log(res)
                        resolve(res.path)
                    },
                    fail: reject,
                })
            })
        },
    },
}
</script>

<style lang="scss" scoped>
.cells {
    .cell {
        margin: 60upx 30upx 0;
        background-color: #fff;
        border-radius: 10upx;
        line-height: 40upx;
        font-weight: bold;
        font-size: 32upx;
        color: #333;
    }
    .cell_hd {
        padding: 50upx;
    }
    .avatar {
        width: 120upx;
        height: 120upx;
        margin-right: 30upx;
        border-radius: 50%;
    }
    .cell_bd {
        padding: 0 50upx;
    }
    .qrcode {
        width: 590upx;
        height: 590upx;
    }
    .cell_fd {
        padding: 50upx;
    }
}
.btns {
    margin: 60upx 30upx;
    .btn {
        padding: 25upx 0;
        line-height: 40upx;
        border-radius: 45upx;
        font-size: 32upx;
    }
}
</style>
