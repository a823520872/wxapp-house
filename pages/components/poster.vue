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
        padding: 30upx 99upx 30upx;

        .btn_save {
            display: block;
            height: 95upx;
            margin-top: 30upx;
            padding: 0;
            line-height: 93upx;
            text-align: center;
            font-size: 33upx;
            border-radius: 0;
        }
    }
    &_box {
        box-shadow: 10upx 10upx 20upx rgba(148, 148, 148, 0.2),
            -10upx -10upx 20upx rgba(148, 148, 148, 0.2),
            10upx -10upx 20upx rgba(148, 148, 148, 0.2),
            -10upx 10upx 20upx rgba(148, 148, 148, 0.2);
    }
}
// .poster {
//     &_wrap {
//         position: fixed;
//         top: 0;
//         right: 0;
//         bottom: 0;
//         left: 0;
//         font-size: 30upx;
//         line-height: 42upx;
//         z-index: 999;
//         color: #fff;
//         overflow-y: auto;

//         .tips {
//             width: 374upx;
//             margin: 0 auto;
//             padding-top: 125upx;
//             text-align: center;
//         }

//         .strong {
//             padding-right: 14upx;
//             color: $primary-color;
//         }

//         .btn_save {
//             display: block;
//             width: 40%;
//             margin: 20upx auto 0;
//             padding: 16upx 0;
//             text-align: center;
//         }
//     }
//     &_contain {
//         position: relative;
//         padding: 45upx 108upx;
//         .icon_close {
//             position: absolute;
//             top: 0;
//             right: 0;
//             width: 44upx;
//             height: 44upx;
//             margin-top: -20upx;
//             margin-right: 50upx;
//             padding: 20upx;
//         }
//     }
//     &_box {
//         width: 534upx;
//         // height: 948upx;
//     }
// }
</style>
