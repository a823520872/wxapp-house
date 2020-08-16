<template>
    <view v-if="isShow">
        <!-- <v-mask @click="hide"></v-mask>
        <view class="poster_wrap">
            <view class="tips">
                <text class="strong">点击保存图片</text>
                <text>分享到朋友圈 提高您的租房成功率</text>
            </view>
            <view class="poster_contain">
                <view class="icon_close" @tap="hide">
                    <image src="/static/image/publish/close.png" mode="aspectFit"></image>
                </view>
                <view class="poster_box">
                    <image @tap="showPoster" :src="uri" mode="widthFix"></image>
                </view>
                <button class="m_button main btn_save" plain @tap="savePoster">保存</button>
            </view>
        </view> -->
        <view class="poster_wrap">
            <view class="poster_contain" v-if="uri">
                <view class="poster_box">
                    <image @tap="showPoster" :src="uri" mode="widthFix"></image>
                </view>
                <button class="m_button primary btn_save" plain @tap="savePoster">保存图片分享到朋友圈</button>
            </view>
        </view>
    </view>
</template>

<script>
export default {
    props: {
        uri: {
            type: String
        }
    },
    data() {
        return {
            isShow: false
        };
    },
    methods: {
        show() {
            this.isShow = true;
        },
        hide() {
            this.isShow = false;
        },
        showPoster() {
            const self = this;
            uni.previewImage({
                urls: [self.uri]
            });
        },
        savePoster() {
            uni.downloadFile({
                url: this.uri,
                success(res) {
                    if (res.statusCode === 200) {
                        uni.saveImageToPhotosAlbum({
                            filePath: res.tempFilePath,
                            success(r) {
                                if (r.errMsg === "saveImageToPhotosAlbum:ok") {
                                    uni.showToast({
                                        title: "保存成功",
                                        icon: "success"
                                    });
                                }
                            }
                        });
                    }
                }
            });
        }
    }
};
</script>

<style lang="scss">
.poster {
    &_wrap {
        position: fixed;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        z-index: 999;
        background-color: #fff;
        overflow-y: auto;
    }
    &_contain {
        padding: 30rpx 99rpx 30rpx;

        .btn_save {
            display: block;
            height: 95rpx;
            margin-top: 30rpx;
            padding: 0;
            line-height: 93rpx;
            text-align: center;
            font-size: 33rpx;
            border-radius: 0;
        }
    }
    &_box {
        box-shadow: 10rpx 10rpx 20rpx rgba(148, 148, 148, 0.2),
            -10rpx -10rpx 20rpx rgba(148, 148, 148, 0.2),
            10rpx -10rpx 20rpx rgba(148, 148, 148, 0.2),
            -10rpx 10rpx 20rpx rgba(148, 148, 148, 0.2);
    }
}
// .poster {
//     &_wrap {
//         position: fixed;
//         top: 0;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         font-size: 30rpx;
//         line-height: 42rpx;
//         z-index: 999;
//         color: #fff;
//         overflow-y: auto;

//         .tips {
//             width: 374rpx;
//             margin: 0 auto;
//             padding-top: 125rpx;
//             text-align: center;
//         }

//         .strong {
//             padding-right: 14rpx;
//             color: $primary-color;
//         }

//         .btn_save {
//             display: block;
//             width: 40%;
//             margin: 20rpx auto 0;
//             padding: 16rpx 0;
//             text-align: center;
//         }
//     }
//     &_contain {
//         position: relative;
//         padding: 45rpx 108rpx;
//         .icon_close {
//             position: absolute;
//             top: 0;
//             right: 0;
//             width: 44rpx;
//             height: 44rpx;
//             margin-top: -20rpx;
//             margin-right: 50rpx;
//             padding: 20rpx;
//         }
//     }
//     &_box {
//         width: 534rpx;
//         // height: 948rpx;
//     }
// }
</style>
